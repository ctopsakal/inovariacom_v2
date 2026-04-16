# Railway PostgreSQL Kurulum Rehberi

## 1. Railway'de PostgreSQL Servisi Oluştur
1. railway.app → New Project → Add PostgreSQL
2. PostgreSQL servisine tıkla → Variables sekmesi
3. `DATABASE_URL` değerini kopyala (postgres://... formatında)

## 2. Projeye Environment Variable Ekle
Railway'deki web servisine git → Variables:
```
DATABASE_URL=postgres://...  (railway'den kopyaladığın değer)
ADMIN_PASSWORD=güçlü_bir_şifre_belirle
NODE_ENV=production
```

## 3. Tabloları Oluştur (İlk Deploy Öncesi)
Projeyi local'de ya da Railway shell üzerinden çalıştır:
```bash
npm run db:push
```
Bu komut `shared/schema.ts` içindeki tabloları (`contact_messages`, `users`) Railway PostgreSQL'e otomatik oluşturur.

## 4. Deploy
```bash
npm run build
npm start
```

## İletişim Formunun Nasıl Çalıştığı
- Kullanıcı formu doldurup gönderir → `POST /api/contact`
- Veriler Railway PostgreSQL'deki `contact_messages` tablosuna kaydedilir
- Admin paneli: `yoursite.com/admin` → şifreyle giriş → tüm mesajları gör

## Mevcut Tablo Yapısı (contact_messages)
| Kolon | Tip | Açıklama |
|-------|-----|----------|
| id | UUID | Otomatik oluşturulur |
| name | text | Ad Soyad |
| email | text | E-posta |
| phone | text | Telefon (opsiyonel) |
| company | text | Şirket/Proje adı (opsiyonel) |
| subject | text | Seçilen hizmet |
| message | text | Mesaj içeriği |
| created_at | timestamp | Gönderim tarihi |
