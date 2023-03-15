-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2023 at 05:29 PM
-- Server version: 10.3.36-MariaDB-0+deb10u2
-- PHP Version: 7.3.31-1~deb10u2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spirtbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `server`
--

CREATE TABLE `server` (
  `guild` varchar(255) NOT NULL,
  `antiraid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `server`
--

INSERT INTO `server` (`guild`, `antiraid`) VALUES
('973254257505632266', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `warns`
--

CREATE TABLE `warns` (
  `guild` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `warn` varchar(255) NOT NULL,
  `reason` varchar(2000) NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `xp`
--

CREATE TABLE `xp` (
  `user` varchar(255) NOT NULL,
  `guild` varchar(255) NOT NULL,
  `xp` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `xp`
--

INSERT INTO `xp` (`user`, `guild`, `xp`, `level`) VALUES
('1073375010296696882', '1028387882899099678', '0', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `server`
--
ALTER TABLE `server`
  ADD PRIMARY KEY (`guild`);

--
-- Indexes for table `warns`
--
ALTER TABLE `warns`
  ADD PRIMARY KEY (`warn`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
