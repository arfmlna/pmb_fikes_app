-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Bulan Mei 2025 pada 01.47
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
(45, 'FKS000004', '2025-04-30 20:34:14');

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
(2, 'D3', 'Keperawatan', 5),
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
  `id_seleksi` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `seleksi`
--

CREATE TABLE `seleksi` (
  `id_seleksi` int(11) NOT NULL,
  `nama_seleksi` varchar(255) NOT NULL,
  `tahun` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('FKS000001', 'K000001', 'admin', 'admin@gmail.com', '$2b$10$00p04Vf1m0YIjvHLLxfAdezoOai0WqGbrUna7pCHcKRGx91e2.HOa', 'admin', 1, 1, '2025-04-14 08:01:24', '2025-04-14 08:24:33'),
('FKS000002', 'K000002', 'test', 'test@gmail.com', '$2b$10$RjalrWQiBYKCbmhdlUkkk.0TFbCYlDmHQGVvHIimMFCi8O3Tyzuf6', 'users', 5, 5, '2025-04-30 04:42:41', '2025-04-30 04:42:41'),
('FKS000003', 'K000003', 'hitlers', 'hitler@gmail.com', '$2b$10$LVcsYobkH7L0yo.sgAcpaeKswpPzfJGoVzMSQ8oqaxyddsXa04ADW', 'users', 6, 5, '2025-04-30 13:18:57', '2025-04-30 13:18:57'),
('FKS000004', 'K000004', 'Jinshi', 'jinshi@gmail.com', '$2b$10$Y2RfLn9T46u90jK3lib2MOG62cnGuoJTuhUNkvEiSt.7d2JXg006G', 'users', 1, 5, '2025-04-30 13:19:27', '2025-04-30 13:19:27'),
('FKS000005', 'K000005', 'popura', 'popura@gmail.com', '$2b$10$sNSDPDx3RLanmmx0bVFhYuZBYp1op0znhMxXoDL21tWmL4DQecqu.', 'users', 4, 1, '2025-04-29 19:49:44', '2025-04-29 19:49:44'),
('FKS000006', 'K000008', 'vivian', 'vivian@gmail.com', '$2b$10$hfdoZ/xosOgR0dhK43mpguaJntahkuNWVFLVJAbCGSb9LEmbaQOVO', 'users', 2, 2, '2025-04-29 21:08:20', '2025-04-29 21:08:20'),
('FKS000007', 'K000009', 'tartarus', 'tartarus@gmail.com', '$2b$10$NdGdfl8lx.Pz6bK4rlLn.eyQ9TIRywpXcdt7IqaKjBBg3m35AQY0W', 'users', 3, 3, '2025-04-29 21:19:56', '2025-04-29 21:19:56'),
('FKS000008', 'K000011', 'omni-man', 'omniman@gmail.com', '$2b$10$ef48Ns7rJH0OnV5sPP9CYuUIOVx.R8ZlQqd6RFMlrTp4ZqNDz5w7S', 'users', 4, 4, '2025-04-29 21:20:43', '2025-04-29 21:20:43'),
('FKS000009', 'K000010', 'pom-pom', 'pom2@gmail.com', '$2b$10$VWYREO44wLQdO5Lspz.HBuYn9ebl/cGC13EUxOzPAmK.1iiRKyZDy', 'users', 6, 4, '2025-04-29 21:29:39', '2025-04-29 21:29:39'),
('FKS000010', NULL, 'dontol', 'pen!s@gmail.com', '$2b$10$kdCkGMdfpoZQtyhm9aWA6OIb.r/qoQZVgKowirfjxBPTqoa1zyRKK', 'users', NULL, NULL, '2025-04-29 21:31:08', '2025-04-29 21:31:08'),
('FKS000011', NULL, 'Husni Firdaus', 'husni@gmail.com', '$2b$10$i7OTqosD1.CP.X.5a55JVOi0tGMl3cQZXdS9ZC.3PUkxF9fZXoYBC', 'users', NULL, NULL, '2025-04-29 21:37:02', '2025-04-29 21:37:02'),
('FKS000012', NULL, 'inertia', 'inertia@gmail.com', '$2b$10$WeInPLUsAoO17iii9zNky.Nlx0RrhDdIB4sYYxIQ/gaO8h4EPtUYW', 'users', NULL, NULL, '2025-04-29 21:40:31', '2025-04-29 21:40:31');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `angkatan`
--
ALTER TABLE `angkatan`
  ADD PRIMARY KEY (`id_angkatan`);

--
-- Indeks untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`) USING BTREE;

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
-- AUTO_INCREMENT untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT untuk tabel `prodi_seleksi`
--
ALTER TABLE `prodi_seleksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `seleksi`
--
ALTER TABLE `seleksi`
  MODIFY `id_seleksi` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  ADD CONSTRAINT `login_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
