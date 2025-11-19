'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [navActive, setNavActive] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    // hide mobile nav on resize > md
    const onResize = () => {
      if (window.innerWidth >= 768) setNavActive(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className="ns-header">
      <div className="container ns-header-content">
        <div className="logo">
          <div className="logo-text">
            <h1 className="logo-main">Nona</h1>
            <p className="logo-sub">BEAUTY</p>
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          aria-label="فتح القائمة"
          onClick={() => setNavActive(prev => !prev)}
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav className={`main-nav ${navActive ? 'active' : ''}`}>
          <ul>
            <li><a href="#" className="nav-link active" data-page="home">الرئيسية</a></li>
            <li><a href="#" className="nav-link" data-page="categories">الفئات</a></li>
            <li><a href="#" className="nav-link" data-page="products">المنتجات</a></li>
            <li><a href="#" className="nav-link" data-page="offers">العروض</a></li>
            <li><a href="#" className="nav-link" data-page="blog">المدونة</a></li>
            <li><a href="#" className="nav-link" data-page="contact">اتصل بنا</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="user-actions">
            <a href="#" className="auth-btn login-btn" id="loginBtn">تسجيل الدخول</a>
            <a href="#" className="auth-btn register-btn" id="registerBtn">إنشاء حساب</a>
            <a href="#" className="auth-btn" id="adminBtn" style={{display: 'none'}}><i className="fas fa-cog"></i></a>
          </div>

          <div className="header-icons">
            <div className="search-icon" id="searchIcon" onClick={() => setShowSearch(s => !s)}>
              <i className="fas fa-search"></i>
            </div>

            <div className="wishlist-icon" id="wishlistIcon">
              <i className="far fa-heart"></i>
              <span className="wishlist-count">0</span>
            </div>

            <div className="cart-icon" id="cartIcon">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar (toggle) */}
      <div className={`search-container ${showSearch ? 'open' : ''}`} id="searchBar">
        <div className="container search-inner">
          <input type="text" className="search-input" placeholder="ابحث عن منتج..." id="searchInput" />
          <button className="search-btn"><i className="fas fa-search"></i></button>
        </div>
      </div>
    </header>
  )
}
