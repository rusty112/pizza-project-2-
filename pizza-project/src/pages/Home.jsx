import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Menu Data
const MENU_DATA = {
  kore: [
    { id: 1, name: 'Ramen Burger', description: 'Uzak doğu lezzeti', price: 120 },
    { id: 2, name: 'Kimchi Pizza', description: 'Acı severlere', price: 140 },
  ],
  pizza: [
    { id: 3, name: 'Position Absolute Acı Pizza', description: 'Backendciler ağlatan lezzet', price: 85.50 },
    { id: 4, name: 'Terminal Pizza', description: 'Console log(lezzet)', price: 95.00 },
    { id: 5, name: '5 Kişilik Hackathlon Pizza', description: 'Kod yazarken aç kalma', price: 250.00 },
    { id: 6, name: 'useEffect Tavuklu Pizza', description: 'Her renderda lezzetli', price: 110.00 },
  ],
  burger: [
    { id: 7, name: 'Hackathlon Burger', description: 'Kod arası molası', price: 120 },
    { id: 8, name: 'Testler Geçti Mutlu Burger', description: 'Yeşil tık tadında', price: 130 },
    { id: 9, name: 'Position Relative Burger', description: 'Diğerlerine göre daha iyi', price: 115 },
  ],
  kizartmalar: [
    { id: 10, name: 'Çıtır Patates', description: 'Altın sarısı', price: 40 },
    { id: 11, name: 'Soğan Halkası', description: 'Göz yaşartmayan lezzet', price: 45 },
    { id: 12, name: 'Elma Dilim', description: 'Baharatlı', price: 50 },
  ],
  fastfood: [
    { id: 13, name: 'Sosisli', description: 'Klasik lezzet', price: 60 },
    { id: 14, name: 'Nugget', description: '6 parça çıtır tavuk', price: 70 },
  ],
  icecek: [
    { id: 15, name: 'Kola', description: 'Soğuk içiniz', price: 25 },
    { id: 16, name: 'Fanta', description: 'Portakallı', price: 25 },
    { id: 17, name: 'Gazoz', description: 'Nostaljik', price: 20 },
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
            onClick={() => handleOrderClick()}
            data-cy="hero-order-button"
          >
            ACIKTIM
          </button>
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
                      <h3>{product.name}</h3>
                      <p className="small-desc">{product.description}</p>
                      <div className="price-tag-small">{product.price}₺</div>
                      <button onClick={() => handleOrderClick({ ...product, type: activeCategory })}>SİPARİŞ VER</button>
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
