# Teknolojik Yemekler - Pizza Sipariş SPA

React ile geliştirilmiş tek sayfalı pizza sipariş uygulaması.

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repo-url>
cd fsweb-s8-challenge-pizza
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 🧪 Testler

Cypress testlerini çalıştırmak için:

```bash
# Test arayüzünü açmak için
npm run cypress:open

# Testleri terminal'de çalıştırmak için
npm test
```

## 📁 Proje Yapısı

```
src/
├── App.jsx           # Ana uygulama komponenti ve routing
├── App.css           # Global stiller
├── main.jsx          # React entry point
├── index.css         # Base reset stiller
└── pages/
    ├── Home.jsx      # Anasayfa komponenti
    ├── Home.css      # Anasayfa stilleri
    ├── OrderForm.jsx # Sipariş formu komponenti
    ├── OrderForm.css # Form stilleri
    ├── Success.jsx   # Sipariş onay sayfası
    └── Success.css   # Onay sayfası stilleri
```

## ✅ Özellikler

### IT1 - Temel Özellikler
- ✅ React Router ile sayfa yönlendirmesi
- ✅ Form validasyonu (isim min 3 karakter)
- ✅ Malzeme seçimi (min 4, max 10)
- ✅ Pizza boyutu seçimi (zorunlu)
- ✅ Hamur tipi seçimi
- ✅ Adet kontrolü
- ✅ Dinamik fiyat hesaplama
- ✅ Axios ile API çağrısı
- ✅ Sipariş onay sayfası
- ✅ Responsive tasarım

### Form Validasyonları
- İsim: Minimum 3 karakter
- Boyut: Zorunlu seçim
- Malzemeler: En az 4, en fazla 10
- Form geçerli değilse submit butonu disabled

### Cypress Testleri
1. **Navigation Test**: Anasayfadan form sayfasına yönlendirme
2. **Form Validation**: Form validasyon kuralları
3. **Complete Order Flow**: Tam sipariş akışı (E2E)
4. **Price Calculation**: Fiyat hesaplama doğruluğu
5. **Responsive Design**: Mobile ve tablet uyumluluğu

## 🎨 Kullanılan Renkler

- Sarı: `#FDC913`
- Açık Gri: `#5F5F5F`
- Koyu Gri: `#292929`
- Kırmızı: `#CE2829`
- Bej: `#FAF7F2`

## 🔧 Teknolojiler

- React 18
- React Router v6
- Axios
- Cypress
- Vite
- CSS3

## 📝 API Endpoint

Sipariş verileri `https://reqres.in/api/pizza` adresine POST request olarak gönderilir.

## 💡 Geliştirme İpuçları

1. Form state yönetimi için `useState` kullanılmıştır
2. Form validasyonu `useEffect` ile dinamik olarak kontrol edilir
3. Prop-lifting ile sayfalar arası veri aktarımı yapılmıştır
4. Tüm form elemanları controlled component olarak implement edilmiştir
5. CSS modüler yapıda organize edilmiştir

## 🚨 Önemli Notlar

- Tasarımda belirtilen renk kodlarına ve yerleşime sadık kalınmıştır
- Form elemanları semantic HTML kullanılarak oluşturulmuştur
- Accessibility için label-input ilişkilendirmesi yapılmıştır
- Data-cy attributeları ile Cypress test seçicileri eklenmiştir
