# ProjectFlow OS

Sebuah platform operasi terpadu (*all-in-one*) untuk agensi digital dan *software house* modern, yang mengintegrasikan manajemen proyek, portal kolaborasi klien, dan administrasi bisnis.

## ✨ Fitur Utama (MVP)

- **Manajemen Proyek:** Papan Kanban interaktif untuk melacak progres tugas.
- **Portal Klien:** Portal khusus bagi klien untuk melihat progres dan memberikan feedback.
- **Manajemen Invoice:** Membuat dan melacak status invoice dalam format PDF.
- **Otentikasi & Hak Akses:** Sistem peran untuk Tim dan Klien.

## 🚀 Tumpukan Teknologi (Tech Stack)

- **Frontend:** React, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express.js, PostgreSQL, Prisma
- **Real-time:** Socket.IO
- **Otentikasi:** JSON Web Tokens (JWT)

---

## 🛠️ Cara Menjalankan Secara Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda.

Prasyarat
Node.js (disarankan versi 18 atau lebih baru)

Git
PostgreSQL server yang sedang berjalan

1. Clone Repositori
# Ganti dengan URL repositori Anda
git clone https://github.com/username/projectflow-os.git
cd projectflow-os

2. Setup Backend
   ```bash
   cd backend
   npm install
   # Buat file .env berdasarkan .env.example dan isi variabel yang dibutuhkan
   npx prisma migrate dev
   npx prisma db seed  # Jika tersedia, untuk membuat data awal (admin, roles, dll)
   npm run dev
3. SetUp Front END
   ```bash
   # Kembali ke root, lalu masuk ke direktori frontend
    cd ../client
    
    # Instal semua dependensi
    npm install
    
    # Jalankan server frontend
    npm run dev
   Aplikasi frontend dapat diakses di http://localhost:5173.

5. Verifikasi Login Admin
  Untuk mengakses fitur sebagai administrator, gunakan kredensial default berikut yang dibuat oleh proses seeding:
    Email: admin@example.com
    Password: admin123
