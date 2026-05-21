# 🏥 Aplikasi Layanan Kesehatan Online

Aplikasi web modern untuk manajemen layanan kesehatan dengan fitur login admin dan user, serta pembuatan akun yang lengkap.

## 📋 Fitur Utama

### Untuk Admin:
- ✅ Login admin dengan lisensi medis
- ✅ Dashboard admin dengan statistik
- ✅ Manajemen janji temu pasien
- ✅ Lihat data pasien terdaftar
- ✅ Memberikan resep obat kepada pasien
- ✅ Profil admin
- ✅ Logout

### Untuk User (Pasien):
- ✅ Registrasi akun pasien
- ✅ Login ke dashboard
- ✅ Pesan janji temu kesehatan
- ✅ Lihat riwayat janji temu
- ✅ Lihat riwayat medis
- ✅ Lihat resep obat yang diberikan
- ✅ Profil kesehatan
- ✅ Logout

## 📁 Struktur File

```
tugas arkan/
├── index.html                 # Halaman beranda
├── admin_login.html          # Login admin
├── admin_register.html       # Registrasi admin
├── admin_dashboard.html      # Dashboard admin
├── user_login.html           # Login user
├── user_register.html        # Registrasi user
├── user_dashboard.html       # Dashboard user
├── css/
│   └── style.css            # Stylesheet utama
├── js/
│   ├── auth.js              # Fungsi autentikasi & penyimpanan data
│   ├── admin-dashboard.js   # Logika dashboard admin
│   └── user-dashboard.js    # Logika dashboard user
└── README.md                # File dokumentasi ini
```

## 🚀 Cara Menjalankan

### Persyaratan:
- Browser modern (Chrome, Firefox, Safari, Edge)
- Web server (XAMPP, WAMP, atau sekadar membuka file HTML)

### Langkah 1: Setup
1. Letakkan folder `tugas arkan` di dalam `htdocs` (jika menggunakan XAMPP)
2. Jalankan XAMPP dan aktifkan Apache
3. Akses aplikasi melalui `http://localhost/tugas%20arkan/` atau `http://localhost/tugas%20arkan/index.html`

### Langkah 2: Pertama Kali Login
Aplikasi sudah dilengkapi dengan data demo berikut:

**Admin:**
- Email: `budi@healthcare.com`
- Password: `admin123`

**User (Pasien):**
- Email: `andi@gmail.com`
- Password: `user123`

Atau Anda bisa membuat akun baru dengan fitur registrasi.

## 📝 Cara Menggunakan

### Untuk Admin:

1. **Login Admin**
   - Buka halaman login admin
   - Masukkan email: `budi@healthcare.com`
   - Masukkan password: `admin123`
   - Klik tombol "Login"

2. **Dashboard Admin**
   - Lihat statistik pasien, janji temu, dan resep
   - Kelola janji temu pasien
   - Lihat data semua pasien terdaftar
   - Berikan resep obat kepada pasien
   - Lihat dan edit profil

3. **Tambah Janji Temu**
   - Pergi ke menu "Janji Temu"
   - Masukkan email pasien
   - Pilih tanggal dan jam
   - Masukkan diagnosis
   - Klik "Simpan Janji Temu"

4. **Berikan Resep Obat**
   - Pergi ke menu "Resep Obat"
   - Masukkan email pasien
   - Masukkan nama obat, jumlah, dosis
   - Klik "Simpan Resep"

### Untuk User (Pasien):

1. **Registrasi User**
   - Buka halaman registrasi user
   - Isi semua data yang diperlukan:
     - Nama lengkap
     - Email
     - Nomor telepon
     - Usia
     - Alamat
     - Password
   - Konfirmasi password
   - Klik "Daftar"

2. **Login User**
   - Masukkan email yang terdaftar
   - Masukkan password
   - Klik "Login"

3. **Dashboard User**
   - Lihat statistik kesehatan Anda
   - Pesan janji temu baru
   - Lihat riwayat janji temu
   - Lihat riwayat medis
   - Lihat resep obat dari dokter
   - Lihat profil kesehatan

4. **Pesan Janji Temu**
   - Pergi ke menu "Janji Temu"
   - Pilih tanggal dan jam yang diinginkan
   - Jelaskan alasan/keluhan
   - Klik "Pesan Janji Temu"

## 🔐 Keamanan

⚠️ **CATATAN PENTING:**
- Aplikasi ini menggunakan localStorage untuk menyimpan data
- **JANGAN digunakan di production** tanpa implementasi backend server yang aman
- Password disimpan dalam plain text (hanya untuk demo)
- Data akan dihapus jika cache/cookies dihapus

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan responsive design
- **JavaScript (ES6+)** - Logika aplikasi
- **LocalStorage API** - Penyimpanan data sementara (untuk demo)

## 📱 Responsif

Aplikasi ini dirancang responsif dan dapat diakses dari:
- 💻 Desktop
- 📱 Tablet
- 📲 Mobile

## 🎨 Fitur UI/UX

- ✨ Interface yang modern dan user-friendly
- 🌈 Warna yang menarik dan konsisten
- 📊 Dashboard dengan statistik visual
- 📋 Tabel data yang terorganisir
- 🔔 Notifikasi dan validasi form
- ⚡ Animasi smooth dan responsif

## 📞 Kontak & Support

Jika memiliki pertanyaan atau saran, silakan hubungi:
- **Email:** info@healthcareonline.com
- **Telepon:** 0800-1234-5678
- **Alamat:** Jl. Kesehatan No. 123, Jakarta

## 📄 Lisensi

Proyek ini bebas digunakan untuk keperluan pendidikan dan pembelajaran.

---

**Dibuat dengan ❤️ untuk Layanan Kesehatan Online yang Lebih Baik**

Versi: 1.0.0
Tanggal: 2024
