-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2024 at 12:02 PM
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
(21, 'hii', 0, 1, '\"1,2\"', '', '', '', '2024-08-14 06:23:42');

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
(87, 10, 1, '<p>gfh</p>', '', '', '', '2024-08-14 07:11:21');

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
(1, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(2, 1, 2, '<p><strong style=\"color: rgb(0, 0, 0);\">orem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu</span></p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(3, 1, 2, '<p><span style=\"color: rgb(86, 156, 214);\">const</span> handleClick = <span style=\"color: rgb(86, 156, 214);\">async</span> () <span style=\"color: rgb(86, 156, 214);\">=&gt;</span> {</p><p>&nbsp; &nbsp; handleChannel();</p><p>&nbsp; &nbsp; handleGetChannel();</p><p>&nbsp; };</p><p>&nbsp; <span style=\"color: rgb(86, 156, 214);\">const</span> handleClear = () <span style=\"color: rgb(86, 156, 214);\">=&gt;</span> {</p><p>&nbsp; &nbsp; setFormData({ ...formData, message: <span style=\"color: rgb(206, 145, 120);\">\"\"</span> });</p><p>&nbsp; };</p><p>&nbsp; useEffect(() <span style=\"color: rgb(86, 156, 214);\">=&gt;</span> {</p><p>&nbsp; &nbsp; handleGetChannel();</p><p>&nbsp; }, []);</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(7, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(8, 1, 2, '<p>sir wah </p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(9, 1, 2, '<p>what</p>', '<p>sir wah </p>', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(10, 1, 2, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h2>Why do we use it?</h2><p class=\"ql-align-justify\">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p><h2>Where does it come from?</h2><p class=\"ql-align-justify\">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.</p><p class=\"ql-align-justify\">The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p><h2>Where can I get some?</h2><p class=\"ql-align-justify\">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p><p>paragraphswordsbyteslistsStart with \'Lorem</p><p>ipsum dolor sit amet...\'</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(11, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(12, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(13, 1, 2, '<p>ir </p><p>h</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(14, 1, 2, '<p>hi sir</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(15, 1, 2, '<p>hi sir</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(16, 1, 2, '<p>hii sir</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(17, 1, 2, '<p>ii</p><p>h</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(18, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(19, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(20, 1, 2, '<p>hii</p>', '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(21, 1, 13, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-23 05:58:58'),
(22, 1, 2, '<p>gu</p>', '', 0, '', '', '', 1, '2024-07-23 12:19:21'),
(28, 1, 2, '', '', 0, '', '669f8751cd8cb_1698604163003.png', '', 1, '2024-07-23 12:19:21'),
(29, 2, 1, '<p>hii</p>', '<p>ff</p>', 0, '', '', '', 1, '2024-07-24 04:09:24'),
(30, 2, 1, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-24 04:09:24'),
(31, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(32, 1, 2, '<p>hii</p>', '<p>ff</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(33, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(34, 1, 2, '<p>good morning sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(35, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(36, 1, 2, '<p>hii</p>', '<p>good morning sir</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(37, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(38, 1, 2, '<p>ii</p><p>h</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(39, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(40, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(41, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(42, 1, 2, '<p>i</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(43, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(44, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(45, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(46, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(47, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(48, 1, 2, '', '', 0, '', '66a0a00adcd44_contact-us.PNG', '', 1, '2024-08-06 09:08:25'),
(51, 1, 2, '', '', 0, '', '66a0a03c7e914_contact-us.PNG', '', 1, '2024-08-06 09:08:25'),
(57, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(60, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(61, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(63, 1, 2, '<p>good morning sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(67, 1, 2, '<p>hi</p>', '<h2 class=\"ql-align-center\">What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(68, 1, 2, '<p>hi</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(69, 1, 2, '<p>sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(70, 1, 2, '<p>sir now i completed the footer section</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(71, 1, 13, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-24 12:31:24'),
(72, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-24 12:31:42'),
(73, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(74, 1, 13, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-24 12:34:10'),
(75, 1, 13, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-26 03:43:52'),
(76, 1, 13, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-26 11:32:29'),
(77, 1, 13, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-26 11:32:37'),
(78, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-07-26 11:32:57'),
(79, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(80, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(81, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(82, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(83, 1, 2, '<p>sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(84, 1, 13, '<p>sir</p>', '', 0, '', '', '', 0, '2024-07-26 11:37:38'),
(85, 1, 13, '<p>sir</p>', '', 0, '', '', '', 0, '2024-07-26 11:37:56'),
(86, 1, 3, '<p>sir</p>', '', 0, '', '', '', 0, '2024-07-26 11:38:07'),
(87, 1, 2, '<p>hii sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(88, 1, 2, '<p>hii sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(89, 1, 2, '<p>how are you</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(90, 1, 2, '<p>we are grow togther</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(91, 1, 13, '<p>Good Morning sir</p>', '', 0, '', '', '', 0, '2024-07-26 11:49:11'),
(92, 1, 13, '<p>Good day</p>', '', 0, '', '', '', 0, '2024-07-26 11:49:50'),
(93, 1, 13, '', '', 0, '', '', '', 0, '2024-07-29 04:32:50'),
(94, 1, 2, '', '', 0, '', '66a72044b32c8_Multi-Location-COS-Install-info.xlsx', '', 1, '2024-08-06 09:08:25'),
(95, 1, 2, '', '', 0, '', '66a7204f3dd65_chatting-app (8).sql', '', 1, '2024-08-06 09:08:25'),
(96, 1, 2, '', '', 0, '', '66a7206737010_thebrand (1).docx', '', 1, '2024-08-06 09:08:25'),
(97, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(98, 1, 2, '<p>hii sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(99, 1, 2, '<p>hii sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(100, 1, 2, '<p>ii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(101, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(102, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(103, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(104, 1, 16, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-31 06:08:02'),
(105, 1, 16, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-31 06:08:02'),
(106, 1, 16, '<p>hii</p>', '', 0, '', '', '', 1, '2024-07-31 06:08:02'),
(107, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(108, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(109, 1, 2, '<p>hii sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(110, 1, 2, '<p>ggg</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(111, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(112, 1, 2, '<p>dvfgvbn</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(113, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(114, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-01 04:13:04'),
(115, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(116, 1, 2, '<p>sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(117, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(118, 1, 16, '<p>siir</p>', '', 0, '', '', '', 0, '2024-08-03 05:26:23'),
(119, 1, 16, '<p><strong style=\"color: rgb(0, 0, 0);\">Donate:</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click&nbsp;</span><a href=\"https://www.lipsum.com/donate\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgb(221, 0, 0);\"><strong>here</strong></a><span style=\"color: rgb(0, 0, 0);\">&nbsp;to donate using PayPal. Thank you for your support. Donate bitcoin: 16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF</span></p>', '', 0, '', '', '', 0, '2024-08-03 05:35:01'),
(120, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(121, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-03 05:54:50'),
(122, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-03 06:46:51'),
(123, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-03 06:55:02'),
(124, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-03 06:55:08'),
(125, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(126, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(127, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(128, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(129, 1, 2, '<p>sirr</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(130, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(131, 1, 2, '', '', 0, '66adf884bba3d_contact.PNG', '', '', 1, '2024-08-06 09:08:25'),
(132, 1, 2, '', '', 0, '66adfa77a74bd_1698604163003.png', '', '', 1, '2024-08-06 09:08:25'),
(133, 1, 3, '<p>dfghj</p>', '', 0, '', '', '', 0, '2024-08-03 10:37:53'),
(134, 1, 16, '<p>gt</p>', '', 0, '', '', '', 0, '2024-08-03 10:37:59'),
(135, 1, 2, '', '', 0, '66ae091217607_1698604163003.png', '', '', 1, '2024-08-06 09:08:25'),
(136, 1, 2, '', '', 0, '', '66ae092257f7e_edit.jpg', '', 1, '2024-08-06 09:08:25'),
(137, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(138, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(139, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(140, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 09:54:14'),
(141, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 09:54:17'),
(142, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 09:54:16'),
(143, 1, 2, '<p>sir</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(144, 1, 3, '<p>sir</p>', '', 0, '', '', '', 0, '2024-08-05 09:54:44'),
(145, 1, 16, '<p>sir</p>', '', 0, '', '', '', 0, '2024-08-05 09:54:50'),
(146, 1, 16, '<p>hii</p>', '<p>sir</p>', 0, '', '', '', 0, '2024-08-05 10:00:24'),
(147, 1, 0, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 10:58:19'),
(148, 1, 0, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 11:11:37'),
(149, 1, 0, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 11:49:42'),
(150, 1, 0, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-05 11:49:50'),
(151, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 04:42:20'),
(152, 1, 16, '<p><strong style=\"color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions&nbsp;</span></p>', '', 0, '', '', '', 0, '2024-08-06 04:57:22'),
(153, 1, 16, '<p>hii</p>', '<p><strong style=\"color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', 0, '', '', '', 0, '2024-08-06 04:57:34'),
(154, 1, 16, '<p><strong style=\"color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions&nbsp;</span></p>', '', 0, '', '', '', 0, '2024-08-06 04:59:28'),
(155, 1, 16, '<p>hii</p>', '<p><strong style=\"color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', 0, '', '', '', 0, '2024-08-06 04:59:36'),
(156, 1, 16, '<p><strong style=\"background-color: rgb(238, 238, 238); color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"background-color: rgb(238, 238, 238); color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an</span></p>', '', 0, '', '', '', 0, '2024-08-06 05:01:53'),
(157, 1, 16, '<p>hii</p>', '<p><strong style=\"background-color: rgb(238, 238, 238); color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"background-color: rgb(238, 238, 238); color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has b', 0, '', '', '', 0, '2024-08-06 05:02:00'),
(158, 1, 16, '<p>hii</p>', '<p><strong style=\"background-color: rgb(238, 238, 238); color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"background-color: rgb(238, 238, 238); color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has b', 0, '', '', '', 0, '2024-08-06 05:06:30'),
(159, 1, 16, '<p>hii</p>', '<p><strong style=\"color: rgb(0, 0, 0);\">rem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown', 0, '', '', '', 0, '2024-08-06 05:06:41'),
(160, 1, 16, '<p>good morning</p>', '', 0, '', '', '', 0, '2024-08-06 05:06:48'),
(161, 1, 16, '<p>hii</p>', '<p>good morning</p>', 0, '', '', '', 0, '2024-08-06 05:06:56'),
(162, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(163, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(164, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(165, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 05:20:12'),
(166, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 05:20:16'),
(167, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 05:20:21'),
(168, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 05:20:45'),
(211, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(212, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(213, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(214, 1, 2, '', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(215, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(216, 1, 2, '<p>ghjgjh</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:25'),
(217, 1, 3, '<p>bbkjjk</p>', '', 0, '', '', '', 0, '2024-08-06 06:22:57'),
(218, 1, 3, '<p>fg</p>', '', 0, '', '', '', 0, '2024-08-06 06:23:45'),
(219, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 09:07:33'),
(220, 2, 1, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:08:36'),
(221, 1, 2, '<p>ki helo</p>', '', 0, '', '', '', 1, '2024-08-06 09:09:10'),
(222, 2, 1, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-06 09:18:31'),
(223, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 09:37:15'),
(224, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-06 09:37:20'),
(225, 1, 16, '<p>sir</p>', '', 0, '', '', '', 0, '2024-08-06 09:37:30'),
(226, 1, 16, '<p>sir</p>', '', 0, '', '', '', 0, '2024-08-06 09:37:33'),
(227, 1, 2, '<h2><span class=\"ql-cursor\">﻿</span>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><h1><br></h1>', '', 0, '', '', '', 1, '2024-08-08 09:55:45'),
(228, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-07 06:33:30'),
(229, 1, 2, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-08 09:55:45'),
(230, 2, 1, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-08 11:49:42'),
(231, 2, 1, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>', '', 0, '', '', '', 1, '2024-08-08 11:49:42'),
(232, 2, 3, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>', '', 0, '', '', '', 0, '2024-08-08 10:22:13'),
(233, 2, 1, '<p>good morning</p>', '', 0, '', '', '', 1, '2024-08-08 11:49:42'),
(234, 1, 2, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-09 05:51:54'),
(235, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-09 05:52:04'),
(236, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-09 05:52:55'),
(237, 1, 3, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', '', 0, '', '', '', 0, '2024-08-09 05:53:17'),
(238, 1, 2, '<pre class=\"ql-syntax\" spellcheck=\"false\">&lt;div class=\"container bootstrap snippets bootdey\"&gt;\r\n    &lt;div class=\"row\"&gt;\r\n        &lt;div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-2\"&gt;\r\n            &lt;div class=\"panel panel-info\"&gt;\r\n                &lt;div class=\"panel-heading\"&gt;\r\n                    &lt;h3 class=\"panel-title\"&gt;\r\n                        &lt;span class=\"glyphicon glyphicon-th\"&gt;&lt;/span&gt;\r\n                        Change password   \r\n                    &lt;/h3&gt;\r\n                &lt;/div&gt;\r\n                &lt;div class=\"panel-body\"&gt;\r\n                    &lt;div class=\"row\"&gt;\r\n                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6 separator social-login-box\"&gt; &lt;br&gt;\r\n                           &lt;img alt=\"\" class=\"img-thumbnail\" src=\"https://bootdey.com/img/Content/avatar/avatar1.png\"&gt;                        \r\n                        &lt;/div&gt;\r\n                        &lt;div style=\"margin-top:80px;\" class=\"col-xs-6 col-sm-6 col-md-6 login-box\"&gt;\r\n                         &lt;div class=\"form-group\"&gt;\r\n                            &lt;div class=\"input-group\"&gt;\r\n                              &lt;div class=\"input-group-addon\"&gt;&lt;span class=\"glyphicon glyphicon-lock\"&gt;&lt;/span&gt;&lt;/div&gt;\r\n                              &lt;input class=\"form-control\" type=\"password\" placeholder=\"Current Password\"&gt;\r\n                            &lt;/div&gt;\r\n                          &lt;/div&gt;\r\n                          &lt;div class=\"form-group\"&gt;\r\n                            &lt;div class=\"input-group\"&gt;\r\n                              &lt;div class=\"input-group-addon\"&gt;&lt;span class=\"glyphicon glyphicon-log-in\"&gt;&lt;/span&gt;&lt;/div&gt;\r\n                              &lt;input class=\"form-control\" type=\"password\" placeholder=\"New Password\"&gt;\r\n                            &lt;/div&gt;\r\n                          &lt;/div&gt;\r\n                        &lt;/div&gt;\r\n                    &lt;/div&gt;\r\n                &lt;/div&gt;\r\n                &lt;div class=\"panel-footer\"&gt;\r\n                    &lt;div class=\"row\"&gt;\r\n                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6\"&gt;&lt;/div&gt;\r\n                        &lt;div class=\"col-xs-6 col-sm-6 col-md-6\"&gt;\r\n                            &lt;button class=\"btn icon-btn-save btn-success\" type=\"submit\"&gt;\r\n                            &lt;span class=\"btn-save-label\"&gt;&lt;i class=\"glyphicon glyphicon-floppy-disk\"&gt;&lt;/i&gt;&lt;/span&gt;save&lt;/button&gt;\r\n                        &lt;/div&gt;\r\n                    &lt;/div&gt;\r\n                &lt;/div&gt;\r\n            &lt;/div&gt;\r\n        &lt;/div&gt;\r\n    &lt;/div&gt;\r\n&lt;/div&gt;\r\n</pre><p>CSS code</p><p>This is the css code used to create this bootstrap snippet, You can copy and paste the following css code inside a page with bootstrap 3.1.1 included, to get the result that you can see in the preview selection</p><pre class=\"ql-syntax\" spellcheck=\"false\">Downloadbody{\r\nbackground:#eee;\r\n}\r\n.separator {\r\n    border-right: 1px solid #dfdfe0; \r\n}\r\n.icon-btn-save {\r\n    padding-top: 0;\r\n    padding-bottom: 0;\r\n}\r\n.input-group {\r\n    margin-bottom:10px; \r\n}\r\n.btn-save-label {\r\n    position: relative;\r\n    left: -12px;\r\n    display: inline-block;\r\n    padding: 6px 12px;\r\n    background: rgba(0,0,0,0.15);\r\n    border-radius: 3px 0 0 3px;\r\n}\r\n</pre><p>Similar snippets</p><p>Find more similar snippets using the following tags:<a href=\"https://www.bootdey.com/snippets/tagged/form\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\">form</a>,<a href=\"https://www.bootdey.com/snippets/tagged/changepassword\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\">changepassword</a></p><p><span style=\"color: rgba(var(--sk_foreground_max_solid,97,96,97),1);\"><img src=\"https://slack-imgs.com/?c=1&amp;o1=wi32.he32.si&amp;url=https%3A%2F%2Fwww.bootdey.com%2Ffavicon.ico\" alt=\"bootdey.com\" height=\"16\" width=\"16\"></span><strong style=\"color: rgba(var(--sk_primary_foreground,29,28,29),1);\">bootdey.com</strong></p><p><a href=\"https://www.bootdey.com/snippets/tagged/form\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\"><strong>Bootstrap form examples</strong></a></p><p>Free bootstrap form example using HTML, Javascript, jQuery, and CSS that can help you build your responsive website&nbsp;(6 kB)</p><p>	<a href=\"https://www.bootdey.com/snippets/tagged/form\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\">https://www.bootdey.com/snippets/tagged/form</a></p><p><span style=\"color: rgba(var(--sk_foreground_max_solid,97,96,97),1);\"><img src=\"https://slack-imgs.com/?c=1&amp;o1=wi32.he32.si&amp;url=https%3A%2F%2Fwww.bootdey.com%2Ffavicon.ico\" alt=\"bootdey.com\" height=\"16\" width=\"16\"></span><strong style=\"color: rgba(var(--sk_primary_foreground,29,28,29),1);\">bootdey.com</strong></p><p><a href=\"https://www.bootdey.com/snippets/tagged/changepassword\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: rgba(var(--sk_highlight,18,100,163),1);\"><strong>Bootstrap changepassword examples</strong></a></p><p>Free bootstrap changepassword example using HTML, Javascript, jQuery, and CSS that can help you build your responsive website&nbsp;(6 kB)</p>', '', 0, '', '', '', 0, '2024-08-09 05:59:21'),
(239, 1, 16, '<p><strong style=\"color: rgb(0, 0, 0);\">Lorem Ipsum</strong><span style=\"color: rgb(0, 0, 0);\">&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lor</span></p>', '', 0, '', '', '', 0, '2024-08-09 12:09:41'),
(240, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-09 12:14:48'),
(241, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-09 12:14:49'),
(242, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-09 12:14:49'),
(243, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-10 04:32:35'),
(244, 1, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-13 09:42:38'),
(245, 1, 2, '<p>hii</p>', '<p>hii</p>', 0, '', '', '', 0, '2024-08-14 06:23:25'),
(246, 1, 16, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-14 07:07:43'),
(247, 23, 1, '<p>hii</p>', '', 0, '', '', '', 1, '2024-08-16 03:48:53'),
(248, 23, 2, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-14 08:31:46'),
(249, 23, 3, '<p>hii</p>', '', 0, '', '', '', 0, '2024-08-14 08:31:50'),
(250, 23, 16, '<p>hiioudyutsyrtjlkusrdfzxhjjilhbjkgcvb nk.hgj,fhsv bn,hjghdxnbfjgb bvghbghbghbghghghghgbnhgjbnhyj</p>', '', 0, '', '', '', 0, '2024-08-14 08:32:01'),
(251, 1, 3, '<h2>What is Lorem Ipsum?</h2><p class=\"ql-align-justify\"><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of </p><p class=\"ql-align-justify\">Lorem Ipsum.</p>', '', 0, '', '', '', 0, '2024-08-14 10:52:52'),
(252, 1, 16, '', '', 0, '66becc6d9cf2b_chatting-app (10).sql', '', '', 0, '2024-08-16 03:50:05'),
(253, 1, 16, '', '', 0, '', '66beea96a81ff_WhatsApp Image 2024-08-10 at 6.25.40 PM.jpeg', '', 0, '2024-08-16 05:58:46'),
(254, 1, 16, '', '', 0, '', '66beeaa553c13_chatting-app (10).sql', '', 0, '2024-08-16 05:59:01'),
(255, 1, 16, '', '', 0, '', '66beeb2125eb8_WhatsApp Image 2024-08-10 at 6.25.40 PM.jpeg', '', 0, '2024-08-16 06:01:05'),
(256, 1, 16, '', '', 0, '', '66beeb2906d90_chatting-app (10).sql', '', 0, '2024-08-16 06:01:13'),
(257, 1, 3, '', '', 0, '', '66beefe9a6a47_dash.PNG', '', 0, '2024-08-16 06:21:29'),
(258, 1, 3, '', '', 0, '', '66beeff5c67e9_Sidebar.js', '', 0, '2024-08-16 06:21:41'),
(259, 1, 3, '', '', 0, '', '66bef003e715b_chatting-app (10).sql', '', 0, '2024-08-16 06:21:55'),
(260, 1, 2, '<p>hii</p>', '<pre class=\"ql-syntax\" spellcheck=\"false\">&lt;div class=\"container bootstrap snippets bootdey\"&gt;\r\n    &lt;div class=\"row\"&gt;\r\n        &lt;div class=\"col-xs-12 col-sm-12 col-md-6 col-md-offset-2\"&gt;\r\n            &lt;div class=\"panel panel-info\"&gt;\r\n  ', 0, '', '', '', 0, '2024-08-17 05:07:48'),
(261, 1, 2, '<p>hello</p>', '<p>hii</p>', 0, '', '', '', 0, '2024-08-17 05:08:05');

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
  `seen` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `phone`, `dob`, `password`, `online`, `status`, `device_notification_id`, `s_seen`, `r_seen`, `seen`) VALUES
(1, 'bunty', 'aszx@gmail.com', '9874561236', '1968-08-20', '$2y$10$valZtmuCr7uCP3PKedSSQ.vMGMFlEJf7assTyv8K6448pcB16aaG2', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 1, 0, 0),
(2, 'Mohit', 'm@gmail.com', '9874561236', '2024-06-21', '$2y$10$fzwMTknzLWsMrs.zt3QjU.A/nliD2pNppTDI0hClbfZaev4JgLnii', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 1, 0),
(3, 'rakesh', 'r@gmail.com', '9874561255', '2024-06-08', '$2y$10$R2wdTzdtkb84wwndjd38..8ajNjylL3WrtsZ/75cV0tR5EiU7piB.', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 1, 0),
(16, 'rohitsir', 'info@gmail.com', '9874563214', '2024-07-17', '$2y$10$2JzrGJrazo.ti4IvtoJSOeI.v.3BsmzfHuddLnJo4AlSIYrTv6kwO', 1, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 1, 0),
(22, 'raj', 'r@gmail.com', '9874563223', '1999-03-19', '$2y$10$B2lMs963BlE.YZJtAoijJu3GM5fFeaP8eEaVE9O.QWEgtT.fIkGFi', 0, 0, '', 0, 0, 0),
(23, 'rt', 'r@gmail.com', '9874563211', '1999-03-19', '$2y$10$c2hCEdcY3c3fmJjsz71tR.TmdlMdjsVZuVhxsIAMIZJ0zogEwBGiW', 0, 0, 'dvSEfdh0bCbKnArJt7QQW7:APA91bGasx5l_E7DWbFI55KzMOMVyLSDAYdlAO6eAlrA6qz7o61X8QUZCJHuNMIF8OGMBR4_lUiHBiuhFMzDNUjsyI6ezB6s7Q3e2BvtwZ7uZ8uZcXFi6zDc3jojqSqu-jgUiM3gYXYL', 0, 0, 0);

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `grp_message`
--
ALTER TABLE `grp_message`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=262;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
