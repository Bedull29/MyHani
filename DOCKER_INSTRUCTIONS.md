# Cara Menjalankan Aplikasi dengan Docker

Berikut adalah langkah-langkah untuk membangun dan menjalankan aplikasi ini menggunakan Docker.

## Prasyarat
- Pastikan Anda memiliki **API Key** dari TMDB (The Movie Database).

## Langkah-langkah

### 1. Build Docker Image
Anda perlu menyertakan API Key saat melakukan build. Jalankan perintah berikut di terminal (ganti `API_KEY_ANDA_DISINI` dengan key asli Anda):

```bash
docker build -t netflix-clone --build-arg TMDB_V3_API_KEY=API_KEY_ANDA_DISINI .
```

### 2. Jalankan Container
Setelah proses build selesai, jalankan container dengan perintah ini:

```bash
docker run -d -p 8080:80 netflix-clone
```

### 3. Akses Aplikasi
Buka browser dan kunjungi:
[http://localhost:8080](http://localhost:8080)

---

## Catatan
- Jika Anda ingin menghentikan container, gunakan `docker ps` untuk melihat ID container, lalu `docker stop <CONTAINER_ID>`.
