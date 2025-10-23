// cypress/e2e/pizza.cy.js

describe('Teknolojik Yemekler Pizza Order Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173'); // Vite default port
  });

  // Test 1: Anasayfadan sipariş formuna navigasyon testi
  describe('Navigation Test', () => {
    it('should navigate from home to order form when clicking order button', () => {
      // Ana sayfada olduğumuzu kontrol et
      cy.url().should('eq', 'http://localhost:5173/');
      
      // Hero bölümündeki sipariş butonunu bul ve tıkla
      cy.get('[data-cy="hero-order-button"]').should('be.visible').click();
      
      // Sipariş formuna yönlendirildiğimizi kontrol et
      cy.url().should('include', '/order');
      
      // Form sayfasının yüklendiğini kontrol et
      cy.get('[data-cy="pizza-form"]').should('be.visible');
    });
  });

  // Test 2: Form validasyon testleri
  describe('Form Validation Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/order');
    });

    it('should show validation errors for invalid inputs', () => {
      // Submit butonu başlangıçta disabled olmalı
      cy.get('[data-cy="submit-button"]').should('be.disabled');
      
      // İsim alanına 2 karakter gir (minimum 3 olmalı)
      cy.get('[data-cy="name-input"]').type('Ab');
      
      // Hata mesajı görünmeli
      cy.get('[data-cy="name-error"]').should('be.visible')
        .and('contain', 'İsim en az 3 karakter olmalıdır');
      
      // Boyut seçmeden hata kontrolü
      cy.get('[data-cy="submit-button"]').should('be.disabled');
      
      // Malzemeleri minimum sayıdan az seç (4'ten az)
      cy.get('[data-cy="topping-pepperoni"]').check();
      cy.get('[data-cy="topping-sosis"]').check();
      cy.get('[data-cy="topping-jambon"]').check();
      
      // Hata mesajı görünmeli
      cy.get('[data-cy="toppings-error"]').should('be.visible')
        .and('contain', 'En az 4 malzeme seçmelisiniz');
      
      // Submit butonu hala disabled olmalı
      cy.get('[data-cy="submit-button"]').should('be.disabled');
    });

    it('should enable submit button when form is valid', () => {
      // Geçerli isim gir
      cy.get('[data-cy="name-input"]').type('John Doe');
      
      // Boyut seç
      cy.get('[data-cy="size-medium"]').check();
      
      // En az 4 malzeme seç
      cy.get('[data-cy="topping-pepperoni"]').check();
      cy.get('[data-cy="topping-sosis"]').check();
      cy.get('[data-cy="topping-jambon"]').check();
      cy.get('[data-cy="topping-tavuk"]').check();
      
      // Hamur tipi seç
      cy.get('[data-cy="dough-select"]').select('thin');
      
      // Not ekle (opsiyonel)
      cy.get('[data-cy="notes-input"]').type('Lütfen sıcak gelsin');
      
      // Submit butonu aktif olmalı
      cy.get('[data-cy="submit-button"]').should('not.be.disabled');
    });

    it('should not allow more than 10 toppings', () => {
      // 10 malzeme seç
      const toppings = [
        'pepperoni', 'sosis', 'jambon', 'tavuk', 'soğan',
        'domates', 'mısır', 'sucuk', 'jalepeno', 'sarımsak'
      ];
      
      toppings.forEach(topping => {
        cy.get(`[data-cy="topping-${topping}"]`).check();
      });
      
      // 11. malzeme disabled olmalı
      cy.get('[data-cy="topping-biber"]').should('be.disabled');
      cy.get('[data-cy="topping-mantar"]').should('be.disabled');
      
      // Bir malzemeyi kaldır
      cy.get('[data-cy="topping-pepperoni"]').uncheck();
      
      // Artık diğer malzemeler seçilebilir olmalı
      cy.get('[data-cy="topping-biber"]').should('not.be.disabled');
    });
  });

  // Test 3: Tam sipariş akışı testi (E2E)
  describe('Complete Order Flow Test', () => {
    it('should complete a full pizza order from home to success page', () => {
      // Ana sayfadan başla
      cy.visit('http://localhost:5173/');
      
      // Sipariş ver butonuna tıkla
      cy.get('[data-cy="hero-order-button"]').click();
      
      // Form sayfasında olduğumuzu kontrol et
      cy.url().should('include', '/order');
      
      // Formu doldur
      cy.get('[data-cy="name-input"]').type('Ahmet Yılmaz');
      cy.get('[data-cy="size-large"]').check();
      cy.get('[data-cy="dough-select"]').select('thick');
      
      // Malzemeleri seç
      cy.get('[data-cy="topping-pepperoni"]').check();
      cy.get('[data-cy="topping-sucuk"]').check();
      cy.get('[data-cy="topping-mantar"]').check();
      cy.get('[data-cy="topping-soğan"]').check();
      cy.get('[data-cy="topping-mısır"]').check();
      
      // Not ekle
      cy.get('[data-cy="notes-input"]').type('Kapıda ödeme yapacağım');
      
      // Adet artır
      cy.get('[data-cy="quantity-increase"]').click();
      cy.get('[data-cy="quantity-display"]').should('contain', '2');
      
      // Toplam fiyatı kontrol et (yaklaşık değer)
      cy.get('[data-cy="total-price"]').should('be.visible');
      
      // Siparişi gönder
      cy.get('[data-cy="submit-button"]').click();
      
      // API çağrısının tamamlanmasını bekle
      cy.intercept('POST', 'https://reqres.in/api/pizza', {
        statusCode: 200,
        body: { success: true }
      }).as('pizzaOrder');
      
      // Success sayfasına yönlendirildiğimizi kontrol et
      cy.wait('@pizzaOrder');
      cy.url().should('include', '/success');
      
      // Sipariş onay mesajını kontrol et
      cy.contains('SİPARİŞ ALINDI').should('be.visible');
      
      // Yeni sipariş ver butonunu kontrol et
      cy.get('[data-cy="new-order-button"]').should('be.visible');
      
      // Yeni sipariş butonuna tıkla ve ana sayfaya dön
      cy.get('[data-cy="new-order-button"]').click();
      cy.url().should('eq', 'http://localhost:5173/');
    });
  });

  // Test 4: Fiyat hesaplama testi
  describe('Price Calculation Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/order');
    });

    it('should calculate price correctly based on selections', () => {
      // Temel form doldur
      cy.get('[data-cy="name-input"]').type('Test User');
      cy.get('[data-cy="size-small"]').check();
      
      // 4 malzeme seç (4 * 5 = 20₺)
      cy.get('[data-cy="topping-pepperoni"]').check();
      cy.get('[data-cy="topping-sosis"]').check();
      cy.get('[data-cy="topping-jambon"]').check();
      cy.get('[data-cy="topping-tavuk"]').check();
      
      // Toplam: 85.50 (base) + 20 (toppings) = 105.50₺
      cy.get('[data-cy="total-price"]').should('contain', '105.50');
      
      // Adet artır (2x)
      cy.get('[data-cy="quantity-increase"]').click();
      
      // Toplam: 105.50 * 2 = 211.00₺
      cy.get('[data-cy="total-price"]').should('contain', '211.00');
      
      // Boyut değiştir (medium = 1.25x)
      cy.get('[data-cy="size-medium"]').check();
      
      // Toplam: (85.50 * 1.25 + 20) * 2 = 253.75₺
      cy.get('[data-cy="total-price"]').should('contain', '253.75');
    });
  });

  // Test 5: Responsiveness testi
  describe('Responsive Design Test', () => {
    it('should display correctly on mobile devices', () => {
      // Mobile viewport
      cy.viewport('iphone-x');
      
      cy.visit('http://localhost:5173/');
      
      // Hero buton görünür olmalı
      cy.get('[data-cy="hero-order-button"]').should('be.visible');
      
      // Sipariş formuna git
      cy.get('[data-cy="hero-order-button"]').click();
      
      // Form elemanları mobilde görünür olmalı
      cy.get('[data-cy="pizza-form"]').should('be.visible');
      cy.get('[data-cy="name-input"]').should('be.visible');
      cy.get('[data-cy="submit-button"]').should('be.visible');
    });

    it('should display correctly on tablet devices', () => {
      // Tablet viewport
      cy.viewport('ipad-2');
      
      cy.visit('http://localhost:5173/');
      
      // Tüm ana elemanlar görünür olmalı
      cy.get('[data-cy="hero-order-button"]').should('be.visible');
      cy.get('.menu-nav').should('be.visible');
      cy.get('.menu-cards').should('be.visible');
    });
  });
});
