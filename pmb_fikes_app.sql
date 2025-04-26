-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Apr 2025 pada 13.24
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
  `id_prodi` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(15, 'FKS000003', '2025-04-23 11:34:07'),
(16, 'FKS000001', '2025-04-23 11:37:16'),
(17, 'FKS000003', '2025-04-23 11:39:57'),
(18, 'FKS000001', '2025-04-23 11:44:04'),
(19, 'FKS000002', '2025-04-23 12:10:31'),
(20, 'FKS000001', '2025-04-23 12:22:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `prodi`
--

CREATE TABLE `prodi` (
  `id_prodi` bigint(20) NOT NULL,
  `nama_prodi` varchar(100) NOT NULL
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
('FKS000001', NULL, 'admin', 'admin@gmail.com', '$2b$10$00p04Vf1m0YIjvHLLxfAdezoOai0WqGbrUna7pCHcKRGx91e2.HOa', 'admin', NULL, NULL, '2025-04-14 08:01:24', '2025-04-14 08:24:33'),
('FKS000002', NULL, 'test1', 'test1@gmail.com', '$2b$10$RjalrWQiBYKCbmhdlUkkk.0TFbCYlDmHQGVvHIimMFCi8O3Tyzuf6', 'users', NULL, NULL, '2025-04-13 18:39:14', '2025-04-13 18:39:14'),
('FKS000003', NULL, 'taufik nur', 'taufik@gmail.com', '$2b$10$9jixBdpUi7k/alvV3IF2iO6eu3fPCPRaM6RT5HNVqKkKTsyEBZ6kO', 'users', NULL, NULL, '2025-04-23 04:33:47', '2025-04-23 04:33:47');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `angkatan`
--
ALTER TABLE `angkatan`
  ADD PRIMARY KEY (`id_angkatan`),
  ADD KEY `id_prodi` (`id_prodi`) USING BTREE;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `angkatan`
--
ALTER TABLE `angkatan`
  ADD CONSTRAINT `angkatan_ibfk_1` FOREIGN KEY (`id_prodi`) REFERENCES `prodi` (`id_prodi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `login_logs`
--
ALTER TABLE `login_logs`
  ADD CONSTRAINT `login_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
