import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

function Success({ orderData }) {
  const navigate = useNavigate();

  // Redirect to home if no order data
  if (!orderData) {
    navigate('/');
    return null;
  }

  return (
    <div className="success-container">
      <header className="success-header">
        <h1>Teknolojik Yemekler</h1>
      </header>

      <div className="success-content">
        <div className="success-message">
          <p className="congrats">lezzetin yolda</p>
          <h2>SİPARİŞ ALINDI!</h2>
          <div className="divider"></div>
        </div>

        <div className="order-details">
          <h3>Position Absolute Acı Pizza</h3>
          
          <div className="order-info">
            <div className="info-row">
              <span className="label">Müşteri:</span>
              <span className="value">{orderData.name}</span>
            </div>
            
            <div className="info-row">
              <span className="label">Boyut:</span>
              <span className="value">
                {orderData.size === 'small' ? 'Küçük' : 
                 orderData.size === 'medium' ? 'Orta' : 'Büyük'}
              </span>
            </div>
            
            <div className="info-row">
              <span className="label">Hamur:</span>
              <span className="value">
                {orderData.dough === 'normal' ? 'Normal' :
                 orderData.dough === 'thin' ? 'İnce' : 'Kalın'}
              </span>
            </div>
            
            {orderData.toppings.length > 0 && (
              <div className="info-row">
                <span className="label">Ek Malzemeler:</span>
                <span className="value">{orderData.toppings.join(', ')}</span>
              </div>
            )}
            
            {orderData.notes && (
              <div className="info-row">
                <span className="label">Sipariş Notu:</span>
                <span className="value">{orderData.notes}</span>
              </div>
            )}
            
            <div className="info-row">
              <span className="label">Adet:</span>
              <span className="value">{orderData.quantity}</span>
            </div>
          </div>

          <div className="price-summary">
            <div className="summary-box">
              <h4>Sipariş Toplamı</h4>
              <div className="price-details">
                <div className="price-row">
                  <span>Seçimler:</span>
                  <span>{(orderData.toppings.length * 5).toFixed(2)}₺</span>
                </div>
                <div className="price-row total">
                  <span>Toplam:</span>
                  <span>{orderData.total}₺</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="new-order-btn"
          onClick={() => navigate('/')}
          data-cy="new-order-button"
        >
          YENİ SİPARİŞ VER
        </button>
      </div>
    </div>
  );
}

export default Success;
