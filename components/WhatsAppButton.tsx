'use client'
import React, { useContext, useState } from 'react'
import { CartContext } from './CartContext'

export default function WhatsAppButton({adminNumber = process.env.NEXT_PUBLIC_WA_NUMBER || '201094004720'}){
  const { items, subtotal } = useContext(CartContext)
  const [customer, setCustomer] = useState({name:'', phone:'', governorate:'', address:''})
  const [shippingCost, setShippingCost] = useState(0)

  // shippingCost should be fetched from Supabase in real implementation based on governorate.
  // For the patch we assume admin sets values in Supabase and frontend queries them.

  function buildMessage(){
    let lines = ['Order Summary:','---------------------']
    items.forEach(i=> lines.push('• ' + i.title + ' × ' + i.qty + ' — ' + i.price + ' EGP'))
    lines.push('')
    lines.push('Subtotal: ' + subtotal + ' EGP')
    lines.push('Shipping: ' + shippingCost + ' EGP')
    lines.push('Total: ' + (Number(subtotal) + Number(shippingCost)) + ' EGP')
    lines.push('')
    lines.push('Customer info:')
    lines.push('الاسم: ' + customer.name)
    lines.push('المحافظة: ' + customer.governorate)
    lines.push('العنوان: ' + customer.address)
    lines.push('الموبايل: ' + customer.phone)
    return lines.join('\n')
  }

  function openWhatsApp(){
    const msg = encodeURIComponent(buildMessage())
    const waUrl = 'https://wa.me/' + adminNumber + '?text=' + encodeURIComponent(buildMessage())
    window.open(waUrl, '_blank')
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2">
        <input placeholder="الاسم" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})} />
        <input placeholder="الموبايل" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})} />
        <select value={customer.governorate} onChange={e=>setCustomer({...customer, governorate:e.target.value})}>
          <option value="">اختر المحافظة</option>
          {/* Governorates will be loaded dynamically from Supabase */}
        </select>
        <input placeholder="العنوان" value={customer.address} onChange={e=>setCustomer({...customer, address:e.target.value})} />
      </div>
      <button onClick={openWhatsApp} className="px-4 py-2 rounded bg-green-600 text-white">اطلب عبر واتساب</button>
    </div>
  )
}
