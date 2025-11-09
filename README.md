# WargaBersih – Landing Page RT/RW Digital

WargaBersih adalah landing page sederhana untuk memudahkan warga dan pengurus RT/RW menjaga kebersihan lingkungan.  
Proyek ini masih berbentuk **front-end statis** dan berfokus pada tampilan serta alur fitur dasar.

## Fitur Utama

- **Bagian utama (Hero section)**  
  Menampilkan tujuan WargaBersih, tombol “Mulai Sekarang” dan “Pelajari Lebih Lanjut”, serta mockup card untuk laporan, jadwal, dan notifikasi.

- **Navigasi responsif dengan menu hamburger**  
  Menu tampil horizontal di desktop dan berubah menjadi hamburger di tampilan mobile.  
  Klik ikon akan membuka atau menutup menu, dan akan tertutup otomatis setelah pengguna memilih menu atau klik di luar area navigasi.

- **Scroll halus antar bagian**  
  Tautan seperti `#fitur`, `#cara-kerja`, `#demo`, dan `#faq` berpindah dengan efek scroll halus.

- **Bagian fitur dinamis**  
  Card fitur seperti “Jadwal Pengambilan Sampah”, “Pengumuman RT/RW”, “Laporan Warga”, dan “Notifikasi Real-time” dimuat otomatis dari file `data.json` menggunakan `fetch`.  
  Kontennya bisa diubah tanpa menyentuh HTML.

- **Statistik singkat**  
  Menampilkan jumlah RT/RW terdaftar, tingkat kepuasan warga, dan waktu penyelesaian laporan.

- **Langkah kerja sederhana**  
  Tiga tahap utama: Laporkan → Tindaklanjuti → Selesai.

- **Demo form dan jadwal**  
  Formulir laporan masih bersifat simulasi (tidak tersambung ke backend) dan hanya menampilkan alert saat dikirim.

- **Program, testimoni, dan FAQ**  
  Berisi contoh program lingkungan, testimoni warga, dan pertanyaan umum yang bisa dibuka-tutup.

- **Banner CTA dan footer**  
  Bagian ajakan untuk berkolaborasi dan footer dengan kontak serta tautan sosial media.

## Teknologi yang Digunakan

- **HTML5** untuk struktur halaman  
- **CSS murni** untuk tata letak, warna, dan responsif  
  - Menggunakan variabel warna (`--green`, `--yellow`, dll)  
  - Grid layout untuk bagian fitur, statistik, dan langkah  
  - Media query untuk tampilan tablet dan mobile  
- **JavaScript vanilla** untuk interaksi  
  - Toggle menu hamburger  
  - Smooth scroll  
  - Menutup menu otomatis  
  - Memuat data dari `data.json`  
- **JSON** untuk menyimpan data fitur agar mudah diperbarui

## Cara Menjalankan Secara Lokal

1. Clone atau download repository ini.  
2. Pastikan file `index.html`, `style.css`, `script.js`, dan `data.json` ada di folder yang sama.  
3. Buka proyek di editor seperti VS Code.  
4. Jalankan menggunakan:
   - Ekstensi **Live Server** di VS Code, atau  
   - Command `npx serve` / `python -m http.server`  
5. Akses di browser melalui `http://localhost:XXXX` (port menyesuaikan).  

Browser memerlukan server lokal karena `fetch` tidak dapat memuat `data.json` langsung dari sistem file.

## Cara Mengubah Isi dan Tampilan

- **Ubah teks dan struktur** di `index.html`  
- **Ubah warna dan layout** di `style.css`  
- **Ubah fitur** dengan menambah atau menghapus objek di `data.json`  
- **Tambahkan logika baru** seperti validasi form di `script.js`

## Tujuan Proyek

- Latihan membuat landing page yang rapi dan responsif  
- Belajar dasar HTML, CSS, dan JavaScript tanpa framework  
- Mengenal pemisahan data melalui file JSON  
- Menjadi dasar untuk versi lanjutan aplikasi RT/RW digital

