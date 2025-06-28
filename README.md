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

## 🛠️ Cara Menjalankan Secara Lokal

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/username/projectflow-os.git](https://github.com/username/projectflow-os.git)
    cd projectflow-os
    ```

2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Buat file .env berdasarkan .env.example dan isi variabelnya
    npx prisma migrate dev
    npm run dev
    ```

3.  **Setup Frontend:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

4.  Buka `http://localhost:5173` di browser Anda.
