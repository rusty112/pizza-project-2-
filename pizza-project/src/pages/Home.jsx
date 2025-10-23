import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Teknolojik Yemekler</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-tagline">KOD ACIKTIRIR</p>
            <h2 className="hero-title">PİZZA, DOYURUR</h2>
          </div>
          <button 
            className="hero-button"
            onClick={handleOrderClick}
            data-cy="hero-order-button"
          >
            ACIKTIM
          </button>
        </div>
      </section>

      {/* Menu Navigation */}
      <nav className="menu-nav">
        <div className="menu-nav-content">
          <button className="menu-item active">
            <span className="menu-icon">🍕</span>
            <span>YENİ! Kore</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">🍕</span>
            <span>Pizza</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">🍔</span>
            <span>Burger</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">🍟</span>
            <span>Kızartmalar</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">🍗</span>
            <span>Fast food</span>
          </button>
          <button className="menu-item">
            <span className="menu-icon">🥤</span>
            <span>Gazlı İçecek</span>
          </button>
        </div>
      </nav>

      {/* Menu Cards */}
      <section className="menu-cards">
        <div className="menu-cards-content">
          <div className="card-large">
            <h3>Özel Lezzetus</h3>
            <p>Position: Absolute Acı Burger</p>
            <button onClick={handleOrderClick}>SİPARİŞ VER</button>
          </div>
          <div className="card-small-container">
            <div className="card-small">
              <h3>Hackathlon Burger Menü</h3>
              <button onClick={handleOrderClick}>SİPARİŞ VER</button>
            </div>
            <div className="card-small">
              <h3>Çoooook hızlı npm gibi kurye</h3>
              <button onClick={handleOrderClick}>SİPARİŞ VER</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Teknolojik Yemekler</h3>
            <ul>
              <li>341 Londonderry Road, Istanbul Türkiye</li>
              <li>aciktim@teknolojikyemekler.com</li>
              <li>+90 216 123 45 67</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Hot Menu</h4>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Testler Geçti Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
