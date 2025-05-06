-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Bulan Mei 2025 pada 09.23
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pmb_fikes_app`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `angkatan`
--

CREATE TABLE `angkatan` (
  `id_angkatan` int(20) NOT NULL,
  `tahun_angkatan` int(11) NOT NULL,
  `status_pendaftaran` enum('buka','tutup') DEFAULT 'tutup'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `angkatan`
--

INSERT INTO `angkatan` (`id_angkatan`, `tahun_angkatan`, `status_pendaftaran`) VALUES
(1, 2022, 'tutup'),
(2, 2023, 'tutup'),
(3, 2024, 'tutup'),
(4, 2025, 'tutup'),
(5, 2026, 'buka');

-- --------------------------------------------------------

--
-- Struktur dari tabel `dokumen_pendaftaran`
--

CREATE TABLE `dokumen_pendaftaran` (
  `id` int(11) NOT NULL,
  `user_id` char(9) NOT NULL,
  `ijazah` varchar(255) NOT NULL,
  `skhu` varchar(255) NOT NULL,
  `nilai_rapot` varchar(255) NOT NULL,
  `sertifikat` varchar(255) NOT NULL,
  `ktp` varchar(255) NOT NULL,
  `kk` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `dokumen_lain` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `dokumen_pendaftaran`
--

INSERT INTO `dokumen_pendaftaran` (`id`, `user_id`, `ijazah`, `skhu`, `nilai_rapot`, `sertifikat`, `ktp`, `kk`, `foto`, `dokumen_lain`) VALUES
(1, 'FKS000006', '/api/filename/1746249761386-SRS_WebFikes_Arif Maulana_C2283207029.pdf', '/api/filename/1746249761389-1. PENGANTAR SI.pdf', '/api/filename/1746249761392-2. PRINSIP DASAR ANALISIS SI.pdf', '/api/filename/1746249761395-3. IDENTIFIKASI MASALAH SI.pdf', '/api/filename/1746249761399-4. PENGOLAHAN ANALISIS SI.pdf', '/api/filename/1746249761402-5. ANALISIS KELEMAHAN SI.pdf', '/api/filename/1746249761407-6. ANALISIS SWOT SI.pdf', '/api/filename/1746249761409-7. ANALISIS PIECES.pdf');

-- --------------------------------------------------------

--
-- Struktur dari tabel `login_logs`
--

CREATE TABLE `login_logs` (
  `id` int(11) NOT NULL,
  `user_id` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `login_logs`
--

INSERT INTO `login_logs` (`id`, `user_id`, `login_time`) VALUES
(1, 'FKS000001', '2025-04-14 15:01:57'),
(2, 'FKS000001', '2025-04-14 15:24:47'),
(3, 'FKS000001', '2025-04-14 15:40:49'),
(4, 'FKS000001', '2025-04-14 15:43:43'),
(5, 'FKS000001', '2025-04-14 15:56:30'),
(6, 'FKS000001', '2025-04-15 01:05:06'),
(7, 'FKS000001', '2025-04-15 01:08:02'),
(8, 'FKS000002', '2025-04-15 01:21:17'),
(9, 'FKS000001', '2025-04-20 23:06:13'),
(10, 'FKS000002', '2025-04-21 18:22:18'),
(11, 'FKS000001', '2025-04-21 18:33:04'),
(12, 'FKS000002', '2025-04-21 18:40:27'),
(13, 'FKS000001', '2025-04-23 09:01:39'),
(14, 'FKS000002', '2025-04-23 09:03:05'),
(16, 'FKS000001', '2025-04-23 11:37:16'),
(18, 'FKS000001', '2025-04-23 11:44:04'),
(19, 'FKS000002', '2025-04-23 12:10:31'),
(20, 'FKS000001', '2025-04-23 12:22:45'),
(21, 'FKS000001', '2025-04-27 06:35:17'),
(22, 'FKS000001', '2025-04-28 17:42:37'),
(23, 'FKS000002', '2025-04-28 18:05:25'),
(24, 'FKS000001', '2025-04-29 01:48:00'),
(25, 'FKS000002', '2025-04-29 01:55:56'),
(26, 'FKS000001', '2025-04-29 06:17:17'),
(27, 'FKS000001', '2025-04-29 09:43:45'),
(28, 'FKS000002', '2025-04-29 15:36:32'),
(29, 'FKS000001', '2025-04-30 06:19:53'),
(30, 'FKS000002', '2025-04-30 09:48:35'),
(31, 'FKS000002', '2025-04-30 09:49:49'),
(32, 'FKS000001', '2025-04-30 10:15:55'),
(33, 'FKS000002', '2025-04-30 10:25:50'),
(34, 'FKS000001', '2025-04-30 10:29:51'),
(35, 'FKS000001', '2025-04-30 11:16:59'),
(36, 'FKS000001', '2025-04-30 11:19:49'),
(37, 'FKS000002', '2025-04-30 11:24:08'),
(38, 'FKS000002', '2025-04-30 12:19:11'),
(39, 'FKS000002', '2025-04-30 14:29:49'),
(40, 'FKS000001', '2025-04-30 17:46:14'),
(41, 'FKS000001', '2025-04-30 17:48:44'),
(42, 'FKS000003', '2025-04-30 20:11:27'),
(43, 'FKS000004', '2025-04-30 20:19:40'),
(44, 'FKS000001', '2025-04-30 20:20:35'),
(45, 'FKS000004', '2025-04-30 20:34:14'),
(47, 'FKS000001', '2025-05-01 06:49:27'),
(48, 'FKS000002', '2025-05-01 16:13:41'),
(50, 'FKS000002', '2025-05-01 16:24:09'),
(51, 'FKS000001', '2025-05-01 17:18:58'),
(52, 'FKS000006', '2025-05-02 14:48:52'),
(53, 'FKS000006', '2025-05-02 19:42:32'),
(54, 'FKS000001', '2025-05-03 10:51:05'),
(55, 'FKS000006', '2025-05-03 11:44:13'),
(56, 'FKS000006', '2025-05-04 10:54:55'),
(57, 'FKS000006', '2025-05-04 12:16:08'),
(59, 'FKS000001', '2025-05-05 02:17:10'),
(61, 'FKS000001', '2025-05-05 15:50:41'),
(62, 'FKS000006', '2025-05-06 07:50:07');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id` int(11) NOT NULL,
  `user_id` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  `bukti_pembayaran` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`id`, `user_id`, `total`, `bukti_pembayaran`) VALUES
(1, 'FKS000006', 104000, '1746508380282-Screenshot_20241015-114330.jpg');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `id_pendaftaran` bigint(20) NOT NULL,
  `id_user` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_seleksi` int(11) NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `no_hp` char(50) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `kewarganegaraan` varchar(255) NOT NULL,
  `nama_ortu` varchar(255) NOT NULL,
  `jenis_kelamin` enum('laki-laki','perempuan') NOT NULL,
  `email` varchar(255) NOT NULL,
  `tmpt_lahir` varchar(255) NOT NULL,
  `nik_ktp` varchar(16) NOT NULL,
  `no_hp_ortu` char(50) NOT NULL,
  `provinsi` varchar(255) NOT NULL,
  `jenis_sekolah` varchar(255) NOT NULL,
  `jurusan_sekolah` varchar(255) NOT NULL,
  `alamat_sekolah` varchar(255) NOT NULL,
  `nama_sekolah` varchar(255) NOT NULL,
  `tahun_lulus` year(4) NOT NULL,
  `prodi1` varchar(255) NOT NULL,
  `prodi2` varchar(255) NOT NULL,
  `konfirmasi` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pendaftaran`
--

INSERT INTO `pendaftaran` (`id_pendaftaran`, `id_user`, `id_seleksi`, `nama_lengkap`, `no_hp`, `tgl_lahir`, `kewarganegaraan`, `nama_ortu`, `jenis_kelamin`, `email`, `tmpt_lahir`, `nik_ktp`, `no_hp_ortu`, `provinsi`, `jenis_sekolah`, `jurusan_sekolah`, `alamat_sekolah`, `nama_sekolah`, `tahun_lulus`, `prodi1`, `prodi2`, `konfirmasi`) VALUES
(1, 'FKS000006', 2, 'Andi', '085798805385', '2003-04-28', 'Indonesia', 'Andi mama', 'laki-laki', 'andi@gmail.com', 'Tasikmalaya', '35-76-01-44-03-9', '081563901981', 'Jawa Barat', 'SMK', 'RPL', 'Kota Tasikmalaya', 'SMKN 4 TSM', '2022', '1', '2', 1),
(9, 'FKS000002', 1, 'test1', '081563901981', '2025-04-28', 'Indonesia', 'test1', 'perempuan', 'test1@gmail.com', 'Tasikmalaya', 'KHKLGIGVKG', '081563901981', 'Jawa Barat', 'SMA', 'RPL', 'Kota Tasikmalaya', 'SMKN 4 Tasikmalaya', '2025', '5', '6', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `prodi`
--

CREATE TABLE `prodi` (
  `id_prodi` bigint(20) NOT NULL,
  `jenjang` char(4) NOT NULL,
  `nama_prodi` varchar(100) NOT NULL,
  `banyak_jalur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `prodi`
--

INSERT INTO `prodi` (`id_prodi`, `jenjang`, `nama_prodi`, `banyak_jalur`) VALUES
(1, 'S1', 'Ilmu Keperawatan', 2),
(2, 'D3', 'keperawatan', 2),
(3, 'S1', 'Kebidanan', 3),
(4, 'D3', 'Kebidanan', 4),
(5, 'Prof', 'Profesi Ners', 2),
(6, 'Prof', 'Pendidikan Profesi Kebinanan', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `prodi_seleksi`
--

CREATE TABLE `prodi_seleksi` (
  `id` int(11) NOT NULL,
  `id_prodi` bigint(20) NOT NULL,
  `id_seleksi` int(11) NOT NULL,
  `mulai` date NOT NULL DEFAULT current_timestamp(),
  `selesai` date NOT NULL DEFAULT current_timestamp(),
  `harga` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `prodi_seleksi`
--

INSERT INTO `prodi_seleksi` (`id`, `id_prodi`, `id_seleksi`, `mulai`, `selesai`, `harga`) VALUES
(1, 1, 1, '2025-05-05', '2025-05-05', 300000),
(2, 4, 4, '2025-05-05', '2025-05-31', 400000),
(4, 2, 2, '2025-12-30', '2025-05-31', 300000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `seleksi`
--

CREATE TABLE `seleksi` (
  `id_seleksi` int(11) NOT NULL,
  `nama_seleksi` varchar(255) NOT NULL,
  `tahun` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `seleksi`
--

INSERT INTO `seleksi` (`id_seleksi`, `nama_seleksi`, `tahun`) VALUES
(1, 'Tes Mandiri Seleksi', '2025'),
(2, 'Beasiswa Seleksi', '2025'),
(4, 'Non Tes PMDK', '2025');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` char(9) NOT NULL,
  `user_id` char(9) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','users','petugas') NOT NULL DEFAULT 'users',
  `id_prodi` bigint(20) DEFAULT NULL,
  `id_angkatan` int(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `user_id`, `name`, `email`, `password`, `role`, `id_prodi`, `id_angkatan`, `created_at`, `updated_at`) VALUES
('FKS000001', NULL, 'admin', 'admin@gmail.com', '$2b$10$00p04Vf1m0YIjvHLLxfAdezoOai0WqGbrUna7pCHcKRGx91e2.HOa', 'admin', NULL, NULL, '2025-04-14 08:01:24', '2025-04-14 08:24:33'),
('FKS000002', 'K000002', 'test', 'test@gmail.com', '$2b$10$RjalrWQiBYKCbmhdlUkkk.0TFbCYlDmHQGVvHIimMFCi8O3Tyzuf6', 'users', 1, 5, '2025-05-01 05:57:07', '2025-05-01 05:57:07'),
('FKS000003', 'K000003', 'hitlers', 'hitler@gmail.com', '$2b$10$LVcsYobkH7L0yo.sgAcpaeKswpPzfJGoVzMSQ8oqaxyddsXa04ADW', 'users', 6, 5, '2025-04-30 13:18:57', '2025-04-30 13:18:57'),
('FKS000004', 'K000004', 'Jinshi', 'jinshi@gmail.com', '$2b$10$Y2RfLn9T46u90jK3lib2MOG62cnGuoJTuhUNkvEiSt.7d2JXg006G', 'users', 1, 5, '2025-04-30 13:19:27', '2025-04-30 13:19:27'),
('FKS000005', 'K000005', 'popura', 'popura@gmail.com', '$2b$10$sNSDPDx3RLanmmx0bVFhYuZBYp1op0znhMxXoDL21tWmL4DQecqu.', 'users', 4, 1, '2025-04-29 19:49:44', '2025-04-29 19:49:44'),
('FKS000006', NULL, 'inertia', 'inertia@gmail.com', '$2b$10$WeInPLUsAoO17iii9zNky.Nlx0RrhDdIB4sYYxIQ/gaO8h4EPtUYW', 'users', NULL, NULL, '2025-04-29 21:40:31', '2025-04-29 21:40:31'),
('FKS000007', NULL, 'adminx', 'adminx@gmail.com', '$2b$10$uPML5.0Yod362.xItuLYQuoZWivwqGU0P.1u2rBBysM1g8tO64Cx6', 'admin', NULL, NULL, '2025-05-01 08:35:56', '2025-05-01 08:35:56'),
('FKS000008', NULL, 'myadmin', 'myadm@gmail.com', '$2b$10$fac9YcOa5ej58pVCtGuZkuF1fNQ7LjqPYGi1HwKeZNNFxdhOE1c7.', 'admin', NULL, NULL, '2025-05-01 08:39:11', '2025-05-01 08:39:11');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `angkatan`
--
ALTER TABLE `angkatan`
  ADD PRIMARY KEY (`id_angkatan`);

--
-- Indeks untuk tabel `dokumen_pendaftaran`
--
ALTER TABLE `dokumen_pendaftaran`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`) USING BTREE;

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`id_pendaftaran`),
  ADD UNIQUE KEY `id_user` (`id_user`) USING BTREE,
  ADD KEY `id_seleksi` (`id_seleksi`);

--
-- Indeks untuk tabel `prodi`
--
ALTER TABLE `prodi`
  ADD PRIMARY KEY (`id_prodi`);

--
-- Indeks untuk tabel `prodi_seleksi`
--
ALTER TABLE `prodi_seleksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prodi` (`id_prodi`),
  ADD KEY `id_seleksi` (`id_seleksi`);

--
-- Indeks untuk tabel `seleksi`
--
ALTER TABLE `seleksi`
  ADD PRIMARY KEY (`id_seleksi`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `id_angkatan` (`id_angkatan`),
  ADD KEY `id_prodi` (`id_prodi`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `dokumen_pendaftaran`
--
ALTER TABLE `dokumen_pendaftaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  MODIFY `id_pendaftaran` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `prodi_seleksi`
--
ALTER TABLE `prodi_seleksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `seleksi`
--
ALTER TABLE `seleksi`
  MODIFY `id_seleksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `dokumen_pendaftaran`
--
ALTER TABLE `dokumen_pendaftaran`
  ADD CONSTRAINT `dokumen_pendaftaran_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  ADD CONSTRAINT `login_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD CONSTRAINT `pendaftaran_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `prodi_seleksi`
--
ALTER TABLE `prodi_seleksi`
  ADD CONSTRAINT `prodi_seleksi_ibfk_2` FOREIGN KEY (`id_seleksi`) REFERENCES `seleksi` (`id_seleksi`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prodi_seleksi_ibfk_3` FOREIGN KEY (`id_prodi`) REFERENCES `prodi` (`id_prodi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_angkatan`) REFERENCES `angkatan` (`id_angkatan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id_prodi`) REFERENCES `prodi` (`id_prodi`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
