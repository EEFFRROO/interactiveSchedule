-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 26 2021 г., 19:45
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `schedule`
--

-- --------------------------------------------------------

--
-- Структура таблицы `lecturers`
--

CREATE TABLE `lecturers` (
  `ID` int UNSIGNED NOT NULL,
  `FULL_NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `lecturers`
--

INSERT INTO `lecturers` (`ID`, `FULL_NAME`) VALUES
(22, 'Препод Преподов'),
(23, 'Валерий Валерьевич'),
(24, 'Евгения Евгеньевна'),
(25, 'Александра Александровна');

-- --------------------------------------------------------

--
-- Структура таблицы `lessons`
--

CREATE TABLE `lessons` (
  `ID` int UNSIGNED NOT NULL,
  `SUBJECT_ID` int NOT NULL,
  `GROUP_ID` int NOT NULL,
  `LESSON_TIME` time NOT NULL,
  `DAY_OF_WEEK` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CABINET` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `lessons`
--

INSERT INTO `lessons` (`ID`, `SUBJECT_ID`, `GROUP_ID`, `LESSON_TIME`, `DAY_OF_WEEK`, `CABINET`) VALUES
(1, 7, 10, '11:40:00', 'Понедельник', 777),
(2, 9, 10, '10:20:00', 'Вторник', 100),
(3, 8, 7, '15:00:00', 'Среда', 200),
(4, 10, 10, '17:30:00', 'Пятница', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `methodists`
--

CREATE TABLE `methodists` (
  `ID` int NOT NULL,
  `FULL_NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `methodists`
--

INSERT INTO `methodists` (`ID`, `FULL_NAME`) VALUES
(77, 'Методист Методистов');

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `ID` int UNSIGNED NOT NULL,
  `FULL_NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `GROUP_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`ID`, `FULL_NAME`, `GROUP_ID`) VALUES
(1, 'Никита', 7),
(5, 'Аркадий', 10),
(6, 'Сергей ', 7),
(7, 'Артём', 10);

-- --------------------------------------------------------

--
-- Структура таблицы `study_groups`
--

CREATE TABLE `study_groups` (
  `ID` int UNSIGNED NOT NULL,
  `NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `GROUP_CODE` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `study_groups`
--

INSERT INTO `study_groups` (`ID`, `NAME`, `GROUP_CODE`) VALUES
(7, 'Механики', 'аоаоаоаоа'),
(10, 'Нефтяники', 'ОАОАО');

-- --------------------------------------------------------

--
-- Структура таблицы `subjects`
--

CREATE TABLE `subjects` (
  `ID` int UNSIGNED NOT NULL,
  `NAME` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `LECTURER_ID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `subjects`
--

INSERT INTO `subjects` (`ID`, `NAME`, `LECTURER_ID`) VALUES
(7, 'История', 22),
(8, 'Математика', 23),
(22, 'Матеша', 22),
(9, 'Физика', 24),
(10, 'Физкультура', 25);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `ID` int NOT NULL,
  `LOGIN` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PASSWORD` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ROLE` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`ID`, `LOGIN`, `PASSWORD`, `ROLE`) VALUES
(1, 'niki', '1', 'Студент'),
(5, 'ark', '1', 'Студент'),
(6, 'sergo', '1', 'Студент'),
(7, 'artemon', '1', 'Студент'),
(22, 'prep', '1', 'Преподаватель'),
(23, 'valerka', '1', 'Преподаватель'),
(24, 'evgesha', '1', 'Преподаватель'),
(25, 'alex', '1', 'Преподаватель'),
(77, 'meta', '2', 'Методист');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `LESSON_TIME` (`LESSON_TIME`,`DAY_OF_WEEK`,`CABINET`);

--
-- Индексы таблицы `methodists`
--
ALTER TABLE `methodists`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `study_groups`
--
ALTER TABLE `study_groups`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `NAME` (`NAME`,`LECTURER_ID`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `lessons`
--
ALTER TABLE `lessons`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `methodists`
--
ALTER TABLE `methodists`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT для таблицы `students`
--
ALTER TABLE `students`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `study_groups`
--
ALTER TABLE `study_groups`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `subjects`
--
ALTER TABLE `subjects`
  MODIFY `ID` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
