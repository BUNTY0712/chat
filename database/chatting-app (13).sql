-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 29, 2024 at 04:45 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chatting-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `verify` int(255) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `verify`) VALUES
(3, 'rohitsir', '$2y$10$emI3R6lV0iJmZv8Fo9ILxujTtJQmJLPOb9yN6yZDM7f2caQ6zEpL6', 0),
(4, 'rohitsirc', '$2y$10$ByDBGZaHncxxmQpthoSiQunZ.51kNeSLDAOvBQMfx2CGng82npkT.', 0);

-- --------------------------------------------------------

--
-- Table structure for table `channel`
--

CREATE TABLE `channel` (
  `id` int(255) NOT NULL,
  `grp_name` varchar(255) NOT NULL,
  `mem_id` int(255) NOT NULL,
  `sender_id` int(255) NOT NULL,
  `receiver_id` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `pdf` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `channel`
--

INSERT INTO `channel` (`id`, `grp_name`, `mem_id`, `sender_id`, `receiver_id`, `message`, `image`, `pdf`, `created_at`) VALUES
(10, 'voice', 0, 1, '\"1,2,3\"', '', '', '', '2024-08-08 06:00:20'),
(11, 'voicee', 0, 1, '\"3,2,1\"', '', '', '', '2024-08-08 06:13:17'),
(12, 'v', 0, 1, '\"1,2,3\"', '', '', '', '2024-08-08 06:13:33'),
(13, '6', 0, 1, '\"1,2,3,16\"', '', '', '', '2024-08-08 06:17:33'),
(14, 'sd', 0, 1, '\"1,2,3\"', '', '', '', '2024-08-08 06:17:39'),
(15, 'ds', 0, 1, '\"16,3\"', '', '', '', '2024-08-08 06:17:46'),
(16, 'voice', 0, 1, '\"\"', '', '', '', '2024-08-08 09:47:18'),
(17, '', 0, 1, '\"\"', '', '', '', '2024-08-08 09:47:24'),
(18, '', 0, 1, '\"1,2,3\"', '', '', '', '2024-08-14 04:57:25'),
(19, 's', 0, 1, '\"\"', '', '', '', '2024-08-14 05:18:52'),
(20, 'zx', 0, 1, '\"1,2,3\"', '', '', '', '2024-08-14 05:19:55'),
(21, 'hii', 0, 1, '\"1,2\"', '', '', '', '2024-08-14 06:23:42'),
(22, 'sdf', 0, 1, '\"1,2\"', '', '', '', '2024-08-31 09:30:08');

-- --------------------------------------------------------

--
-- Table structure for table `grp_message`
--

CREATE TABLE `grp_message` (
  `id` int(255) NOT NULL,
  `grp_id` int(255) NOT NULL,
  `sender_id` int(255) NOT NULL,
  `message` text NOT NULL,
  `rply_msg` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `pdf` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grp_message`
--

INSERT INTO `grp_message` (`id`, `grp_id`, `sender_id`, `message`, `rply_msg`, `image`, `pdf`, `created_at`) VALUES
(64, 11, 1, '<p>hii</p>', '', '', '', '2024-08-09 04:55:49'),
(65, 10, 1, '<p>$message = $_POST[<span style=\"color: rgb(206, 145, 120);\">\'message\'</span>] ?? <span style=\"color: rgb(206, 145, 120);\">\'\'</span>;</p><p>$message = mysqli_real_escape_string($conn, $message);</p>', '', '', '', '2024-08-09 05:04:07'),
(66, 10, 1, '<h2><br></h2><h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h2>Why do we use it?</h2><p class=\"ql-align-justify\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><h2>Where does it come from?</h2>', '', '', '', '2024-08-09 05:04:41'),
(67, 10, 1, '<p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">&lt;div class=\"container bootstrap snippets bootdey\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">    &lt;div class=\"row\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">        &lt;div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-2\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">            &lt;div class=\"panel panel-info\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                &lt;div class=\"panel-heading\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                    &lt;h3 class=\"panel-title\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                        &lt;span class=\"glyphicon glyphicon-th\"&gt;&lt;/span&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                        Change password   </span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                    &lt;/h3&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                &lt;/div&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                &lt;div class=\"panel-body\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                    &lt;div class=\"row\"&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6 separator social-login-box\"&gt; &lt;br&gt;</span></p><p><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">                           &lt;img alt=\"\" class=\"img-thumbnail\" src=\"</span><a href=\"https://bootdey.com/img/Content/avatar/avatar1.png\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: rgba(29, 28, 29, 0.04); color: inherit;\">https://bootdey.com/img/Content/avatar/avatar1.png</a><span style=\"background-color: rgba(29, 28, 29, 0.04); color: rgb(29, 28, 29);\">\"&gt;                        </span></p><p><span style=\"color: rgb(29, 28, 29);\">                        &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                        &lt;div style=\"margin-top:80px;\" class=\"col-xs-6 col-sm-6 col-md-6 login-box\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                         &lt;div class=\"form-group\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                            &lt;div class=\"input-group\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                              &lt;div class=\"input-group-addon\"&gt;&lt;span class=\"glyphicon glyphicon-lock\"&gt;&lt;/span&gt;&lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                              &lt;input class=\"form-control\" type=\"password\" placeholder=\"Current Password\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                            &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                          &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                          &lt;div class=\"form-group\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                            &lt;div class=\"input-group\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                              &lt;div class=\"input-group-addon\"&gt;&lt;span class=\"glyphicon glyphicon-log-in\"&gt;&lt;/span&gt;&lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                              &lt;input class=\"form-control\" type=\"password\" placeholder=\"New Password\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                            &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                          &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                        &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                    &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                &lt;div class=\"panel-footer\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                    &lt;div class=\"row\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6\"&gt;&lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                            &lt;button class=\"btn icon-btn-save btn-success\" type=\"submit\"&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                            &lt;span class=\"btn-save-label\"&gt;&lt;i class=\"glyphicon glyphicon-floppy-disk\"&gt;&lt;/i&gt;&lt;/span&gt;save&lt;/button&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                        &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                    &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">                &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">            &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">        &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">    &lt;/div&gt;</span></p><p><span style=\"color: rgb(29, 28, 29);\">&lt;/div&gt;</span></p>', '', '', '', '2024-08-09 05:07:34'),
(68, 10, 1, '<pre class=\"ql-syntax\" spellcheck=\"false\">&lt;div class=\"container bootstrap snippets bootdey\"&gt;\r\n    &lt;div class=\"row\"&gt;\r\n        &lt;div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-2\"&gt;\r\n            &lt;div class=\"panel panel-info\"&gt;\r\n                &lt;div class=\"panel-heading\"&gt;\r\n                    &lt;h3 class=\"panel-title\"&gt;\r\n                        &lt;span class=\"glyphicon glyphicon-th\"&gt;&lt;/span&gt;\r\n                        Change password   \r\n                    &lt;/h3&gt;\r\n                &lt;/div&gt;\r\n                &lt;div class=\"panel-body\"&gt;\r\n                    &lt;div class=\"row\"&gt;\r\n                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6 separator social-login-box\"&gt; &lt;br&gt;\r\n                           &lt;img alt=\"\" class=\"img-thumbnail\" src=\"https://bootdey.com/img/Content/avatar/avatar1.png\"&gt;                        \r\n                        &lt;/div&gt;\r\n                        &lt;div style=\"margin-top:80px;\" class=\"col-xs-6 col-sm-6 col-md-6 login-box\"&gt;\r\n                         &lt;div class=\"form-group\"&gt;\r\n                            &lt;div class=\"input-group\"&gt;\r\n                              &lt;div class=\"input-group-addon\"&gt;&lt;span class=\"glyphicon glyphicon-lock\"&gt;&lt;/span&gt;&lt;/div&gt;\r\n                              &lt;input class=\"form-control\" type=\"password\" placeholder=\"Current Password\"&gt;\r\n                            &lt;/div&gt;\r\n                          &lt;/div&gt;\r\n                          &lt;div class=\"form-group\"&gt;\r\n                            &lt;div class=\"input-group\"&gt;\r\n                              &lt;div class=\"input-group-addon\"&gt;&lt;span class=\"glyphicon glyphicon-log-in\"&gt;&lt;/span&gt;&lt;/div&gt;\r\n                              &lt;input class=\"form-control\" type=\"password\" placeholder=\"New Password\"&gt;\r\n                            &lt;/div&gt;\r\n                          &lt;/div&gt;\r\n                        &lt;/div&gt;\r\n                    &lt;/div&gt;\r\n                &lt;/div&gt;\r\n                &lt;div class=\"panel-footer\"&gt;\r\n                    &lt;div class=\"row\"&gt;\r\n                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6\"&gt;&lt;/div&gt;\r\n                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6\"&gt;\r\n                            &lt;button class=\"btn icon-btn-save btn-success\" type=\"submit\"&gt;\r\n                            &lt;span class=\"btn-save-label\"&gt;&lt;i class=\"glyphicon glyphicon-floppy-disk\"&gt;&lt;/i&gt;&lt;/span&gt;save&lt;/button&gt;\r\n                        &lt;/div&gt;\r\n                    &lt;/div&gt;\r\n                &lt;/div&gt;\r\n            &lt;/div&gt;\r\n        &lt;/div&gt;\r\n    &lt;/div&gt;\r\n&lt;/div&gt;\r\n</pre><p>CSS code</p><p>This is the css code used to create this bootstrap snippet, You can copy and paste the following css code inside a page with bootstrap 3.1.1 included, to get the result that you can see in the preview selection</p><pre class=\"ql-syntax\" spellcheck=\"false\">Downloadbody{\r\nbackground:#eee;\r\n}\r\n.separator {\r\n    border-right: 1px solid #dfdfe0; \r\n}\r\n.icon-btn-save {\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n}\r\n.input-group {\r\n    margin-bottom:10px; \r\n}\r\n.btn-save-label {\r\n    position: relative;\r\n    left: -12px;\r\n    display: inline-block;\r\n    padding: 6px 12px;\r\n    background: rgba(0,0,0,0.15);\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n</pre><p>Similar snippets</p><p>Find more similar snippets using the following tags:<a href=\"https://www.bootdey.com/snippets/tagged/form\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\">form</a>,<a href=\"https://www.bootdey.com/snippets/tagged/changepassword\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\">changepassword</a></p><p><span style=\"color: rgba(var(--sk_foreground_max_solid,97,96,97),1);\"><img src=\"https://slack-imgs.com/?c=1&amp;o1=wi32.he32.si&amp;url=https%3A%2F%2Fwww.bootdey.com%2Ffavicon.ico\" alt=\"bootdey.com\" height=\"16\" width=\"16\"></span><strong style=\"color: rgba(var(--sk_primary_foreground,29,28,29),1);\">bootdey.com</strong></p><p><a href=\"https://www.bootdey.com/snippets/tagged/form\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\"><strong>Bootstrap form examples</strong></a></p><p>Free bootstrap form example using HTML, Javascript, jQuery, and CSS that can help you build your responsive website&nbsp;(6 kB)</p><p>	<a href=\"https://www.bootdey.com/snippets/tagged/form\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\">https://www.bootdey.com/snippets/tagged/form</a></p><p><span style=\"color: rgba(var(--sk_foreground_max_solid,97,96,97),1);\"><img src=\"https://slack-imgs.com/?c=1&amp;o1=wi32.he32.si&amp;url=https%3A%2F%2Fwww.bootdey.com%2Ffavicon.ico\" alt=\"bootdey.com\" height=\"16\" width=\"16\"></span><strong style=\"color: rgba(var(--sk_primary_foreground,29,28,29),1);\">bootdey.com</strong></p><p><a href=\"https://www.bootdey.com/snippets/tagged/changepassword\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\"><strong>Bootstrap changepassword examples</strong></a></p><p>Free bootstrap changepassword example using HTML, Javascript, jQuery, and CSS that can help you build your responsive website&nbsp;(6 kB)</p>', '', '', '', '2024-08-09 05:07:54'),
(69, 10, 1, '<p>hii</p>', '', '', '', '2024-08-09 05:36:16'),
(70, 10, 1, '<p>hii</p>', '', '', '', '2024-08-09 05:52:12'),
(71, 10, 1, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', '', '', '', '2024-08-09 05:53:25'),
(72, 10, 1, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', '', '', '', '2024-08-09 06:21:36'),
(73, 10, 1, '<p>hii</p>', '', '', '', '2024-08-13 08:46:44'),
(74, 21, 1, '<p>hii</p>', '', '', '', '2024-08-14 06:23:49'),
(75, 21, 1, '<p>hii</p>', '', '', '', '2024-08-14 06:23:54'),
(76, 21, 1, '<p>gfdf</p>', '', '', '', '2024-08-14 06:23:57'),
(77, 21, 1, '<p>fddfs</p>', '', '', '', '2024-08-14 06:23:58'),
(78, 21, 1, '<p>sfbs</p>', '', '', '', '2024-08-14 06:23:59'),
(79, 21, 1, '<p>sdfb</p>', '', '', '', '2024-08-14 06:24:00'),
(80, 21, 1, '<p>sfdb</p>', '', '', '', '2024-08-14 06:24:00'),
(81, 21, 1, '<p>rgb</p>', '', '', '', '2024-08-14 06:24:01'),
(82, 21, 1, '<p>gb</p>', '', '', '', '2024-08-14 06:24:01'),
(83, 21, 1, '<p>f</p>', '', '', '', '2024-08-14 06:24:01'),
(84, 21, 1, '<p>bdfgb</p>', '', '', '', '2024-08-14 06:24:03'),
(85, 21, 1, '<p>sfbsdfbs</p>', '', '', '', '2024-08-14 06:24:06'),
(86, 21, 1, '<p>bsfb</p>', '', '', '', '2024-08-14 06:24:07'),
(87, 10, 1, '<p>gfh</p>', '', '', '', '2024-08-14 07:11:21'),
(88, 10, 1, '<p>hii</p>', '', '', '', '2024-09-03 05:24:31');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(255) NOT NULL,
  `receiver_id` int(255) NOT NULL,
  `message` text NOT NULL,
  `rply_msg` varchar(255) NOT NULL,
  `rply_id` int(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `pdf` varchar(255) NOT NULL,
  `sqlfile` varchar(255) NOT NULL,
  `seen` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `rply_msg`, `rply_id`, `image`, `pdf`, `sqlfile`, `seen`, `created_at`) VALUES
(274, 1, 22, '<p>hi</p>', '', 0, '', '', '', 0, '2024-09-26 10:36:45'),
(275, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 10:49:16'),
(276, 1, 2, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 10:50:50'),
(277, 1, 22, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 10:50:57'),
(278, 1, 2, '<p>hi</p>', '', 0, '', '', '', 0, '2024-09-26 10:54:46'),
(279, 1, 3, '<p>hi</p>', '', 0, '', '', '', 0, '2024-09-26 11:00:07'),
(280, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 11:02:18'),
(281, 1, 22, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 11:02:23'),
(282, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 11:02:33'),
(283, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 11:04:06'),
(284, 1, 22, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 11:04:11'),
(285, 1, 22, '<p>hii</p>', '', 0, '', '', '', 0, '2024-09-26 11:05:50'),
(286, 1, 2, '<p>hi</p>', '', 0, '', '', '', 0, '2024-09-26 11:08:27');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `online` int(255) NOT NULL,
  `status` int(255) NOT NULL,
  `device_notification_id` text NOT NULL,
  `s_seen` int(255) NOT NULL DEFAULT 0,
  `r_seen` int(255) NOT NULL DEFAULT 0,
  `seen` int(255) NOT NULL,
  `see_notify` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `phone`, `dob`, `password`, `online`, `status`, `device_notification_id`, `s_seen`, `r_seen`, `seen`, `see_notify`) VALUES
(1, 'bunty', 'aszx@gmail.com', '9122668359', '1968-08-20', '$2y$10$valZtmuCr7uCP3PKedSSQ.vMGMFlEJf7assTyv8K6448pcB16aaG2', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bEuV7nngSESxtaddi7SFoiJTSqaLMK10UNpIfsQgwlztPvivthz_pe_JBGEvDQSWh2dwE29dmmlK4KGdQFDI3wjMS6V-Oo8UfzjfPEeXnwhKAfPMzXJKv17o_jbJLBX-tLYm9iW', 1, 0, 0, '[]'),
(2, 'Mohit', 'm@gmail.com', '8809091650', '2024-06-21', '$2y$10$fzwMTknzLWsMrs.zt3QjU.A/nliD2pNppTDI0hClbfZaev4JgLnii', 0, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 1, 0, '[]'),
(3, 'rakesh', 'r@gmail.com', '9874561255', '2024-06-08', '$2y$10$R2wdTzdtkb84wwndjd38..8ajNjylL3WrtsZ/75cV0tR5EiU7piB.', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 1, 0, '[]'),
(16, 'rohitsir', 'info@gmail.com', '9874563214', '2024-07-17', '$2y$10$2JzrGJrazo.ti4IvtoJSOeI.v.3BsmzfHuddLnJo4AlSIYrTv6kwO', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 1, 0, '[]'),
(22, 'raj', 'r@gmail.com', '9874563223', '1999-03-19', '$2y$10$B2lMs963BlE.YZJtAoijJu3GM5fFeaP8eEaVE9O.QWEgtT.fIkGFi', 0, 0, '', 0, 1, 0, '[]'),
(23, 'rt', 'r@gmail.com', '9874563211', '1999-03-19', '$2y$10$c2hCEdcY3c3fmJjsz71tR.TmdlMdjsVZuVhxsIAMIZJ0zogEwBGiW', 0, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 0, 0, '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `channel`
--
ALTER TABLE `channel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grp_message`
--
ALTER TABLE `grp_message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `channel`
--
ALTER TABLE `channel`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `grp_message`
--
ALTER TABLE `grp_message`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=287;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
