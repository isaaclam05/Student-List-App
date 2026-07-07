-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Database: c237_studentlistapp
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `c237_studentlistapp`
DEFAULT CHARACTER SET latin1
COLLATE latin1_swedish_ci;

USE `c237_studentlistapp`;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `studentId` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `dob` DATE NOT NULL,
  `contact` VARCHAR(10) NOT NULL,
  `image` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`studentId`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Dumping data for table `student`
--

INSERT INTO `students`
(`studentId`, `name`, `dob`, `contact`, `image`)
VALUES
(1, 'John Edward', '2007-05-08', '98765432', 'john_edward.jpg'),
(2, 'Marv Thomson', '2006-02-06', '98765678', 'marv_thomson.jpg'),
(3, 'Benny Teo', '2006-08-18', '98789879', 'benny_teo.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;