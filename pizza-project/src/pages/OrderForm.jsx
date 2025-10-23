import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderForm.css';

// Pizza malzemeleri listesi
const TOPPINGS = [
  'Pepperoni',
  'Sosis',
  'Jambon',
  'Tavuk',
  'Soğan',
  'Domates',
  'Mısır',
  'Sucuk',
  'Jalepeno',
  'Sarımsak',
  'Biber',
  'Mantar',
  'Ananas',
  'Kabak'
];

function OrderForm({ onOrderSubmit }) {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    dough: 'normal',
    toppings: [],
    notes: '',
    quantity: 1
  });

  // Error state
  const [errors, setErrors] = useState({
    name: '',
    size: '',
    toppings: ''
  });

  // Form valid state
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Price calculations
  const basePrice = 85.50;
  const toppingPrice = 5;
  const sizeMultiplier = {
    small: 1,
    medium: 1.25,
    large: 1.5
  };

  // Calculate total price
  const calculateTotal = () => {
    const sizePrice = basePrice * (sizeMultiplier[formData.size] || 1);
    const toppingsPrice = formData.toppings.length * toppingPrice;
    return ((sizePrice + toppingsPrice) * formData.quantity).toFixed(2);
  };

  // Validate form
  useEffect(() => {
    const newErrors = {};
    
    // Name validation (min 3 characters)
    if (formData.name.length < 3) {
      newErrors.name = 'İsim en az 3 karakter olmalıdır';
    }
    
    // Size validation
    if (!formData.size) {
      newErrors.size = 'Pizza boyutu seçmelisiniz';
    }
    
    // Toppings validation (min 4, max 10)
    if (formData.toppings.length < 4) {
      newErrors.toppings = 'En az 4 malzeme seçmelisiniz';
    } else if (formData.toppings.length > 10) {
      newErrors.toppings = 'En fazla 10 malzeme seçebilirsiniz';
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0 && formData.name && formData.size);
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        toppings: checked 
          ? [...prev.toppings, value]
          : prev.toppings.filter(t => t !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle quantity change
  const handleQuantityChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + increment)
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    
    const orderPayload = {
      ...formData,
      total: calculateTotal(),
      timestamp: new Date().toISOString()
    };
    
    try {
      // Simulated API call
      const response = await axios.post('https://reqres.in/api/pizza', orderPayload);
      
      // Pass data to parent and navigate
      onOrderSubmit(orderPayload);
      navigate('/success');
    } catch (error) {
      console.error('Sipariş hatası:', error);
      alert('Sipariş gönderilemedi. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-form-container">
      <header className="order-header">
        <h1>Teknolojik Yemekler</h1>
      </header>

      <div className="order-content">
        <nav className="breadcrumb">
          <a href="/">Anasayfa</a> - <span>Sipariş Oluştur</span>
        </nav>

        <div className="product-info">
          <h2>Position Absolute Acı Pizza</h2>
          <p className="price">{basePrice.toFixed(2)}₺</p>
          <div className="rating">
            <span>4.9</span>
            <span>(200)</span>
          </div>
          <p className="description">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. 
            Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, 
            daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, 
            genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli 
            lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pizza-form" data-cy="pizza-form">
          {/* İsim Input */}
          <div className="form-group">
            <label htmlFor="name">İsim Soyisim *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="İsminizi giriniz"
              data-cy="name-input"
            />
            {errors.name && <span className="error" data-cy="name-error">{errors.name}</span>}
          </div>

          {/* Size Selection */}
          <div className="form-group">
            <h3>Boyut Seç *</h3>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="size"
                  value="small"
                  checked={formData.size === 'small'}
                  onChange={handleInputChange}
                  data-cy="size-small"
                />
                <span>Küçük</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="medium"
                  checked={formData.size === 'medium'}
                  onChange={handleInputChange}
                  data-cy="size-medium"
                />
                <span>Orta</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="large"
                  checked={formData.size === 'large'}
                  onChange={handleInputChange}
                  data-cy="size-large"
                />
                <span>Büyük</span>
              </label>
            </div>
            {errors.size && <span className="error" data-cy="size-error">{errors.size}</span>}
          </div>

          {/* Dough Selection */}
          <div className="form-group">
            <label htmlFor="dough">Hamur Seç</label>
            <select
              id="dough"
              name="dough"
              value={formData.dough}
              onChange={handleInputChange}
              data-cy="dough-select"
            >
              <option value="normal">Normal</option>
              <option value="thin">İnce</option>
              <option value="thick">Kalın</option>
            </select>
          </div>

          {/* Toppings */}
          <div className="form-group">
            <h3>Ek Malzemeler</h3>
            <p className="helper-text">En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺</p>
            <div className="toppings-grid">
              {TOPPINGS.map((topping) => (
                <label key={topping} className="topping-item">
                  <input
                    type="checkbox"
                    name="toppings"
                    value={topping}
                    checked={formData.toppings.includes(topping)}
                    onChange={handleInputChange}
                    disabled={
                      !formData.toppings.includes(topping) && 
                      formData.toppings.length >= 10
                    }
                    data-cy={`topping-${topping.toLowerCase()}`}
                  />
                  <span>{topping}</span>
                </label>
              ))}
            </div>
            {errors.toppings && <span className="error" data-cy="toppings-error">{errors.toppings}</span>}
          </div>

          {/* Notes */}
          <div className="form-group">
            <label htmlFor="notes">Sipariş Notu</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              rows="3"
              data-cy="notes-input"
            />
          </div>

          {/* Quantity and Order Summary */}
          <div className="order-summary">
            <div className="quantity-control">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                disabled={formData.quantity <= 1}
                data-cy="quantity-decrease"
              >
                -
              </button>
              <span data-cy="quantity-display">{formData.quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                data-cy="quantity-increase"
              >
                +
              </button>
            </div>

            <div className="price-summary">
              <h3>Sipariş Toplamı</h3>
              <div className="price-details">
                <div className="price-row">
                  <span>Seçimler:</span>
                  <span>{(formData.toppings.length * toppingPrice).toFixed(2)}₺</span>
                </div>
                <div className="price-row total">
                  <span>Toplam:</span>
                  <span data-cy="total-price">{calculateTotal()}₺</span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid || isSubmitting}
            data-cy="submit-button"
          >
            {isSubmitting ? 'SİPARİŞ GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
