import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Helper: SVG placeholder data URI generator
const emojiByCategory = {
  pizza: '🍕',
  burger: '🍔',
  icecek: '🥤',
  kizartmalar: '🍟',
  kore: '🍜',
  fastfood: '🌭',
  other: '🍽️'
};

const svgPlaceholder = (title = '', emoji = '🍽️') => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <rect width='100%' height='100%' fill='%23FFF7EA' />
      <text x='50%' y='40%' dominant-baseline='middle' text-anchor='middle' font-size='96'>${emoji}</text>
      <text x='50%' y='78%' dominant-baseline='middle' text-anchor='middle' font-size='20' fill='%23333' font-family='sans-serif'>${title}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// Local asset imports for menu images
import ramenBurgerImg from '../assets/menu/ramen-burger.svg';
import kimchiPizzaImg from '../assets/menu/kimchi-pizza.svg';
import positionAbsolutePizzaImg from '../assets/menu/position-absolute-pizza.svg';
import terminalPizzaImg from '../assets/menu/terminal-pizza.svg';
import hackathlonPizzaImg from '../assets/menu/hackathlon-pizza.svg';
import useEffectChickenPizzaImg from '../assets/menu/useeffect-chicken-pizza.svg';
import hackathlonBurgerImg from '../assets/menu/hackathlon-burger.svg';
import testlerBurgerImg from '../assets/menu/testler-burger.svg';
import positionRelativeBurgerImg from '../assets/menu/position-relative-burger.svg';
import crispyFriesImg from '../assets/menu/crispy-fries.svg';
import onionRingsImg from '../assets/menu/onion-rings.svg';
import potatoWedgesImg from '../assets/menu/potato-wedges.svg';
import hotdogImg from '../assets/menu/hotdog.svg';
import nuggetsImg from '../assets/menu/nuggets.svg';
import kolaImg from '../assets/menu/kola.svg';
import fantaImg from '../assets/menu/fanta.svg';
import gazozImg from '../assets/menu/gazoz.svg';

// Menu Data
const MENU_DATA = {
  kore: [
    { id: 1, name: 'Ramen Burger', description: 'Uzak doğu lezzeti', price: 120, image: ramenBurgerImg },
    { id: 2, name: 'Kimchi Pizza', description: 'Acı severlere', price: 140, image: kimchiPizzaImg },
  ],
  pizza: [
    { id: 3, name: 'Position Absolute Acı Pizza', description: 'Backendciler ağlatan lezzet', price: 85.50, image: positionAbsolutePizzaImg },
    { id: 4, name: 'Terminal Pizza', description: 'Console log(lezzet)', price: 95.00, image: terminalPizzaImg },
    { id: 5, name: '5 Kişilik Hackathlon Pizza', description: 'Kod yazarken aç kalma', price: 250.00, image: hackathlonPizzaImg },
    { id: 6, name: 'useEffect Tavuklu Pizza', description: 'Her renderda lezzetli', price: 110.00, image: useEffectChickenPizzaImg },
  ],
  burger: [
    { id: 7, name: 'Hackathlon Burger', description: 'Kod arası molası', price: 120, image: hackathlonBurgerImg },
    { id: 8, name: 'Testler Geçti Mutlu Burger', description: 'Yeşil tık tadında', price: 130, image: testlerBurgerImg },
    { id: 9, name: 'Position Relative Burger', description: 'Diğerlerine göre daha iyi', price: 115, image: positionRelativeBurgerImg },
  ],
  kizartmalar: [
    { id: 10, name: 'Çıtır Patates', description: 'Altın sarısı', price: 40, image: crispyFriesImg },
    { id: 11, name: 'Soğan Halkası', description: 'Göz yaşartmayan lezzet', price: 45, image: onionRingsImg },
    { id: 12, name: 'Elma Dilim', description: 'Baharatlı', price: 50, image: potatoWedgesImg },
  ],
  fastfood: [
    { id: 13, name: 'Sosisli', description: 'Klasik lezzet', price: 60, image: hotdogImg },
    { id: 14, name: 'Nugget', description: '6 parça çıtır tavuk', price: 70, image: nuggetsImg },
  ],
  icecek: [
    { id: 15, name: 'Kola', description: 'Soğuk içiniz', price: 25, image: kolaImg },
    { id: 16, name: 'Fanta', description: 'Portakallı', price: 25, image: fantaImg },
    { id: 17, name: 'Gazoz', description: 'Nostaljik', price: 20, image: gazozImg },
  ]
};

function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('pizza');

  const handleOrderClick = (product) => {
    // Default product if none selected (e.g. from Hero button)
    const defaultProduct = {
      name: 'Position Absolute Acı Pizza',
      price: 85.50,
      description: 'Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre.',
      type: 'pizza' // default type
    };

    navigate('/order', { state: { product: product || defaultProduct } });
  };

  const currentProducts = MENU_DATA[activeCategory] || [];

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Teknolojik Yemekler</h1>

          <nav className="nav">
            <button className={`nav-link ${activeCategory === 'pizza' ? 'active' : ''}`} onClick={() => setActiveCategory('pizza')}>Pizza</button>
            <button className={`nav-link ${activeCategory === 'kore' ? 'active' : ''}`} onClick={() => setActiveCategory('kore')}>Kore</button>
            <button className={`nav-link ${activeCategory === 'burger' ? 'active' : ''}`} onClick={() => setActiveCategory('burger')}>Burger</button>
            <button className={`nav-link ${activeCategory === 'kizartmalar' ? 'active' : ''}`} onClick={() => setActiveCategory('kizartmalar')}>Kızartma</button>
          </nav>

          <button className="header-order" onClick={() => handleOrderClick()} aria-label="Order now">ACIKTIM</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-tagline">KOD ACIKTIRIR</p>
            <h2 className="hero-title">PİZZA, DOYURUR</h2>
            <p className="hero-sub">Modern lezzetler, hızlı teslimat. Hemen sipariş ver ve koduna dön!</p>
            <div style={{height: 20}} />
            <button
              className="hero-button"
              onClick={() => handleOrderClick()}
              data-cy="hero-order-button"
            >
              ACIKTIM
            </button>
          </div>

          <div className="hero-visual" aria-hidden>
            <svg width="220" height="220" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="pizza-svg" role="img" focusable="false">
              <circle cx="32" cy="32" r="30" fill="#FFD166"/>
              <path d="M8 56c8-14 20-24 24-24s16 8 24 24H8z" fill="#F97316" opacity="0.9"/>
              <circle cx="28" cy="34" r="3" fill="#CE2829"/>
              <circle cx="38" cy="26" r="2.2" fill="#CE2829"/>
              <circle cx="36" cy="40" r="2.5" fill="#CE2829"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Menu Navigation */}
      <nav className="menu-nav">
        <div className="menu-nav-content">
          <button
            className={`menu-item ${activeCategory === 'kore' ? 'active' : ''}`}
            onClick={() => setActiveCategory('kore')}
          >
            <span className="menu-icon">🍜</span>
            <span>YENİ! Kore</span>
          </button>
          <button
            className={`menu-item ${activeCategory === 'pizza' ? 'active' : ''}`}
            onClick={() => setActiveCategory('pizza')}
          >
            <span className="menu-icon">🍕</span>
            <span>Pizza</span>
          </button>
          <button
            className={`menu-item ${activeCategory === 'burger' ? 'active' : ''}`}
            onClick={() => setActiveCategory('burger')}
          >
            <span className="menu-icon">🍔</span>
            <span>Burger</span>
          </button>
          <button
            className={`menu-item ${activeCategory === 'kizartmalar' ? 'active' : ''}`}
            onClick={() => setActiveCategory('kizartmalar')}
          >
            <span className="menu-icon">🍟</span>
            <span>Kızartmalar</span>
          </button>
          <button
            className={`menu-item ${activeCategory === 'fastfood' ? 'active' : ''}`}
            onClick={() => setActiveCategory('fastfood')}
          >
            <span className="menu-icon">🍗</span>
            <span>Fast food</span>
          </button>
          <button
            className={`menu-item ${activeCategory === 'icecek' ? 'active' : ''}`}
            onClick={() => setActiveCategory('icecek')}
          >
            <span className="menu-icon">🥤</span>
            <span>Gazlı İçecek</span>
          </button>
        </div>
      </nav>

      {/* Menu Cards */}
      <section className="menu-cards">
        <div className="menu-cards-content">
          {currentProducts.length > 0 ? (
            <div className="category-products">
              {/* Featured Item (First item large) */}
              <div className="card-large">
                <div className="card-large-media">
                  <img
                    src={currentProducts[0].image || svgPlaceholder(currentProducts[0].name, emojiByCategory[activeCategory] || '🍕')}
                    alt={currentProducts[0].name}
                    className="card-large-img"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = svgPlaceholder(currentProducts[0].name, emojiByCategory[activeCategory] || '🍕'); }}
                  />
                </div>
                <h3>{currentProducts[0].name}</h3>
                <p>{currentProducts[0].description}</p>
                <div className="price-tag">{currentProducts[0].price}₺</div>
                <button onClick={() => handleOrderClick({ ...currentProducts[0], type: activeCategory })}>SİPARİŞ VER</button>
              </div>

              {/* Other Items */}
              {currentProducts.length > 1 && (
                <div className="card-small-container">
                  {currentProducts.slice(1).map(product => (
                    <div className="card-small" key={product.id}>
                      <img
                      src={product.image || svgPlaceholder(product.name, emojiByCategory[activeCategory] || '🍕')}
                      alt={product.name}
                      className="card-small-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = svgPlaceholder(product.name, emojiByCategory[activeCategory] || '🍕'); }}
                    />
                      <div className="card-small-body">
                        <h3>{product.name}</h3>
                        <p className="small-desc">{product.description}</p>
                        <div className="price-tag-small">{product.price}₺</div>
                        <button onClick={() => handleOrderClick({ ...product, type: activeCategory })}>SİPARİŞ VER</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="no-products">
              <h3>Bu kategoride ürün bulunamadı.</h3>
            </div>
          )}
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
