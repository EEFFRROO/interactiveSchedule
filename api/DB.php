<?php

class DB {
    function __construct() {
        $host = 'localhost';
        $user = 'root';
        $password = '';
        $db = 'schedule';
        $this->conn = new mysqli($host, $user, $password, $db);
        if ($this->conn->connect_errno) {
            printf("Не удалось подключиться: %s\n", $conn->connect_error);
            exit();
        }
    }

    function __destruct() {
        $this->conn->close();
    }

    // public function getStudentByLoginPassword($login, $password) {
    //     $query = 'SELECT ID, FULL_NAME, GROUP_ID FROM STUDENTS WHERE LOGIN = "' . $login . '" AND PASSWORD_STUD = "' . $password . '"';
    //     $result = $this->conn->query($query);
    //     return $result->fetch_object();
    // }

    // public function getLecturerByLoginPassword($login, $password) {
    //     $query = 'SELECT ID, FULL_NAME FROM LECTURERS WHERE LOGIN = "' . $login . '" AND PASSWORD_LECT = "' . $password . '"';
    //     $result = $this->conn->query($query);
    //     return $result->fetch_object();
    // }

    // Получить пользователя по логину паролю
    public function getUserByLoginPassword($login, $password) {
        $query = 'SELECT ID, ROLE FROM USERS WHERE LOGIN = "' . $login . '" AND PASSWORD = "' . $password . '"';
        $result = $this->conn->query($query);
        return $result->fetch_object();
    }
    // Получить имя пользователя
    public function getUserName($id, $table) {
        $query = 'SELECT FULL_NAME FROM ' . $table . ' WHERE ID = "' . $id . '"';
        $result = $this->conn->query($query);
        return $result->fetch_all()[0];
    }
    // Получить список всех пар
    public function getAllLessons() {
        $query = 'SELECT SUBJECTS.NAME, LECTURERS.FULL_NAME, STUDY_GROUPS.NAME, LESSONS.LESSON_TIME, LESSONS.DAY_OF_WEEK, LESSONS.CABINET FROM `lessons`
            JOIN SUBJECTS ON (SUBJECTS.ID = SUBJECT_ID)
            JOIN LECTURERS ON (LECTURERS.ID = SUBJECTS.LECTURER_ID)
            JOIN STUDY_GROUPS ON (STUDY_GROUPS.ID = GROUP_ID)
            ORDER BY FIELD(LESSONS.DAY_OF_WEEK, "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"), LESSONS.LESSON_TIME';
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }
    // Список пар студента
    public function getStudentLessons($stud_id) {
        $query = 'SELECT SUBJECTS.NAME, LECTURERS.FULL_NAME, STUDY_GROUPS.NAME, LESSONS.LESSON_TIME, LESSONS.DAY_OF_WEEK, LESSONS.CABINET FROM `lessons`
            JOIN SUBJECTS ON (SUBJECTS.ID = SUBJECT_ID)
            JOIN LECTURERS ON (LECTURERS.ID = SUBJECTS.LECTURER_ID)
            JOIN STUDY_GROUPS ON (STUDY_GROUPS.ID = GROUP_ID)
            JOIN STUDENTS ON (STUDENTS.GROUP_ID = LESSONS.GROUP_ID)
            WHERE STUDENTS.ID = "' . $stud_id . '" 
            ORDER BY FIELD(LESSONS.DAY_OF_WEEK, "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"), LESSONS.LESSON_TIME';
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }
    // Список пар преподавателя
    public function getLecturerLessons($lect_id) {
        $query = 'SELECT SUBJECTS.NAME, STUDY_GROUPS.NAME, LESSONS.LESSON_TIME, LESSONS.DAY_OF_WEEK, LESSONS.CABINET FROM `lessons` 
            JOIN SUBJECTS ON (SUBJECTS.ID = SUBJECT_ID)
            JOIN LECTURERS ON (LECTURERS.ID = SUBJECTS.LECTURER_ID)
            JOIN STUDY_GROUPS ON (STUDY_GROUPS.ID = GROUP_ID)
            WHERE LECTURERS.ID = "' . $lect_id . '" 
            ORDER BY FIELD(LESSONS.DAY_OF_WEEK, "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"), LESSONS.LESSON_TIME';
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }
    // Добавить пару
    public function addLesson($name, $group, $time, $dayOfWeek, $cabinet, $lect) {
        $lectIdQuery = 'SELECT ID FROM LECTURERS WHERE FULL_NAME = "' . $lect . '"';
        $lectId = $this->conn->query($lectIdQuery)->fetch_all()[0][0];
        $insertSubjQuery = 'INSERT INTO SUBJECTS (NAME, LECTURER_ID) VALUES ("' . $name . '", ' . $lectId . ')';
        $this->conn->query($insertSubjQuery);
        $subjIdQuery = 'SELECT ID FROM SUBJECTS WHERE NAME = "' . $name . '" AND LECTURER_ID = ' . $lectId;
        $subjId = $this->conn->query($subjIdQuery)->fetch_all()[0][0]; // subject_id
        $groupIdQuery = 'SELECT ID FROM STUDY_GROUPS WHERE NAME = "' . $group . '"';
        $groupId = $this->conn->query($groupIdQuery)->fetch_all()[0][0];
        $insertLessonsQuery = 'INSERT INTO LESSONS (SUBJECT_ID, GROUP_ID, LESSON_TIME, DAY_OF_WEEK, CABINET) VALUES (' . $subjId . ', ' . $groupId . ', "' . $time . '", "' . $dayOfWeek . '", ' . $cabinet . ')';
        $result = $this->conn->query($insertLessonsQuery);
        return $result;
    }
    // Удалить пару
    public function deleteLesson($time, $dayOfWeek, $cabinet) {
        $query = 'DELETE FROM lessons WHERE LESSON_TIME = "' . $time . '" AND DAY_OF_WEEK = "' . $dayOfWeek . '" AND CABINET = "' . $cabinet . '"';
        $result = $this->conn->query($query);
        return $result;
    }
    // Получить список всех преподавателей
    public function getAllLecturers() {
        $query = 'SELECT FULL_NAME FROM LECTURERS';
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }
    // Получить список всех групп
    public function getAllGroups() {
        $query = 'SELECT NAME FROM STUDY_GROUPS';
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }

}