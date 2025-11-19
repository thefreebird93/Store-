'use client'
import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext(null)

export function CartProvider({ children }){
  const [items, setItems] = useState([]) // {id, title, price, qty, image}
  useEffect(()=>{
    try {
      const raw = localStorage.getItem('cart_v1')
      if(raw) setItems(JSON.parse(raw))
    } catch(e){}
  },[])
  useEffect(()=>{
    localStorage.setItem('cart_v1', JSON.stringify(items))
  },[items])

  function add(item){
    setItems(prev=>{
      const found = prev.find(p=>p.id===item.id)
      if(found){
        return prev.map(p=> p.id===item.id ? {...p, qty: p.qty + (item.qty||1)} : p)
      }
      return [...prev, {...item, qty: item.qty||1}]
    })
  }
  function remove(id){
    setItems(prev=> prev.filter(p=> p.id!==id))
  }
  function updateQty(id, qty){
    setItems(prev=> prev.map(p=> p.id===id ? {...p, qty} : p))
  }
  function clear(){ setItems([]) }

  const subtotal = items.reduce((s, p)=> s + Number(p.price) * Number(p.qty), 0)

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}
