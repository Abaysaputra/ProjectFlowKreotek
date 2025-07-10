-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 10, 2025 at 04:01 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Bayu', '2025-06-30 16:08:59', '2025-07-01 23:16:48');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `task_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projectmember`
--

CREATE TABLE `projectmember` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projectmember`
--

INSERT INTO `projectmember` (`createdAt`, `updatedAt`, `project_id`, `user_id`) VALUES
('2025-07-10 02:59:53', '2025-07-10 02:59:53', 10, 5);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `client_id` int DEFAULT NULL,
  `status` enum('ongoing','done','pending') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pending',
  `deadline` datetime DEFAULT NULL,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `client_id`, `status`, `deadline`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Project Baru', 1, 'done', '2025-07-01 00:00:00', 'Update dari Postman', '2025-06-28 15:30:02', '2025-07-09 08:22:56'),
(10, 'Website Toko', 1, 'ongoing', '2025-07-30 00:00:00', 'Pengembangan website ecommerce', '2025-06-30 10:11:47', '2025-06-30 10:11:47'),
(14, 'UI Project q', 3, 'done', '2026-02-22 00:00:00', 'Masih lama', '2025-07-08 10:41:18', '2025-07-09 09:05:52'),
(16, 'Buat Menu Login', 7, 'ongoing', '2025-12-12 00:00:00', 'Buat menggunakan REACT JS', '2025-07-10 03:50:20', '2025-07-10 03:50:20'),
(17, 'Webiste Company Profile', 3, 'pending', '2026-12-02 00:00:00', 'Membuat website company pak Ardi', '2025-07-10 03:55:19', '2025-07-10 03:55:19');

-- --------------------------------------------------------

--
-- Table structure for table `project_members`
--

CREATE TABLE `project_members` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `project_members`
--

INSERT INTO `project_members` (`id`, `project_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 10, 5, '2025-07-10 09:59:29', '2025-07-10 09:59:29'),
(2, 1, 5, '2025-07-10 03:40:11', '2025-07-10 03:40:11'),
(3, 14, 5, '2025-07-10 03:40:16', '2025-07-10 03:40:16'),
(4, 16, 2, '2025-07-10 03:50:20', '2025-07-10 03:50:20'),
(5, 10, 8, '2025-07-10 03:53:43', '2025-07-10 03:53:43'),
(6, 10, 9, '2025-07-10 03:53:43', '2025-07-10 03:53:43'),
(7, 10, 10, '2025-07-10 03:53:43', '2025-07-10 03:53:43'),
(8, 10, 11, '2025-07-10 03:53:43', '2025-07-10 03:53:43'),
(9, 16, 8, '2025-07-10 03:54:00', '2025-07-10 03:54:00'),
(10, 16, 9, '2025-07-10 03:54:00', '2025-07-10 03:54:00'),
(11, 16, 10, '2025-07-10 03:54:00', '2025-07-10 03:54:00'),
(12, 1, 9, '2025-07-10 03:54:14', '2025-07-10 03:54:14'),
(13, 1, 2, '2025-07-10 03:54:14', '2025-07-10 03:54:14'),
(14, 1, 10, '2025-07-10 03:54:14', '2025-07-10 03:54:14'),
(15, 1, 8, '2025-07-10 03:54:14', '2025-07-10 03:54:14'),
(16, 14, 9, '2025-07-10 03:54:25', '2025-07-10 03:54:25'),
(17, 14, 10, '2025-07-10 03:54:25', '2025-07-10 03:54:25'),
(18, 17, 2, '2025-07-10 03:55:19', '2025-07-10 03:55:19'),
(19, 17, 11, '2025-07-10 03:55:19', '2025-07-10 03:55:19'),
(20, 17, 9, '2025-07-10 03:55:19', '2025-07-10 03:55:19'),
(21, 17, 8, '2025-07-10 03:55:19', '2025-07-10 03:55:19'),
(22, 17, 10, '2025-07-10 03:55:19', '2025-07-10 03:55:19');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `project_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `status` enum('todo','in_progress','done') DEFAULT 'todo',
  `assigned_to` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `createdAt`, `updatedAt`) VALUES
(1, 'abay', 'abay@gmail.com', '123', 'client', '2025-06-30 09:11:09', '2025-07-08 21:28:02', '2025-07-08 21:28:02'),
(2, 'Front End Dev', 'frontend@gmail.com', '123', 'frontend', '2025-07-01 16:43:26', '2025-07-08 21:28:02', '2025-07-10 10:49:35'),
(3, 'Puerdy', 'puerdy@gmail.com', '123', 'client', '2025-07-01 16:50:51', '2025-07-08 21:28:02', '2025-07-08 21:28:02'),
(5, 'Admin', 'admin@example.com', '$2b$10$.CD2vp8P/L.G4jp7QN5qXe3C5o8OgYXHi3EdBIpM.p3P2f/COpryC', 'admin', '2025-07-08 14:34:21', '2025-07-08 14:34:21', '2025-07-08 14:34:21'),
(7, 'Farisa', 'farisa@gmail.com', '123', 'client', '2025-07-09 08:25:45', '2025-07-09 08:25:45', '2025-07-09 08:25:45'),
(8, 'Back End Dev', 'backend@gmail.com', '123', 'backenddev', '2025-07-10 03:51:01', '2025-07-10 10:51:01', '2025-07-10 10:51:01'),
(9, 'UI Designer', 'uidesigner@gmail.com', '123', 'uidesigner', '2025-07-10 03:52:12', '2025-07-10 10:52:12', '2025-07-10 10:52:12'),
(10, 'UX Designer', 'uxdesigner@gmail.com', '123', 'uxdesigner', '2025-07-10 03:52:45', '2025-07-10 10:52:45', '2025-07-10 10:52:45'),
(11, 'Server Administrator', 'serveradmin@gmail.com', '123', 'serveradmin', '2025-07-10 03:53:24', '2025-07-10 10:53:24', '2025-07-10 10:53:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `projectmember`
--
ALTER TABLE `projectmember`
  ADD PRIMARY KEY (`project_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `project_members`
--
ALTER TABLE `project_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_assignment` (`project_id`,`user_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `assigned_to` (`assigned_to`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `project_members`
--
ALTER TABLE `project_members`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projectmember`
--
ALTER TABLE `projectmember`
  ADD CONSTRAINT `projectmember_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projectmember_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `project_members`
--
ALTER TABLE `project_members`
  ADD CONSTRAINT `fk_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
