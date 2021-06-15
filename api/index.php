<?php

error_reporting(-1);

require_once('DB.php');
$db = new DB();

// function loginStud($params) {
//     global $db;
//     if ($params['login'] && $params['password'])
//         return $db->getStudentByLoginPassword($params['login'], $params['password']);
//     return false;
// }

// function loginLect($params) {
//     global $db;
//     if ($params['login'] && $params['password'])
//         return $db->getLecturerByLoginPassword($params['login'], $params['password']);
//     return false;
// }

// Авторизация
function login($params) {
    global $db;
    if ($params['login'] && $params['password'])
        return $db->getUserByLoginPassword($params['login'], $params['password']);
    return false;
}
// Получение пар студента
function getStudLessons($params) {
    global $db;
    if ($params['id'])
        return $db->getStudentLessons($params['id']);
    return false;
}
// Получение пар преподавателя
function getLectLessons($params) {
    global $db;
    if ($params['id'])
        return $db->getLecturerLessons($params['id']);
    return false;
}
// Добавить пару
function addLesson($params) {
    global $db;
    if ($params['name'] && $params['group'] && $params['time'] && $params['dayOfWeek'] && $params['cabinet'] && $params['lecturer'])
        return $db->addLesson($params['name'], $params['group'], $params['time'], $params['dayOfWeek'], $params['cabinet'], $params['lecturer']);
    return false;
}
// Получить имя пользователя
function getUserName($params) {
    global $db;
    if ($params['id'] && $params['role']) {
        switch ($params['role']) {
            case 'Студент':
                return $db->getUserName($params['id'], 'students');
                break;
            case 'Преподаватель':
                return $db->getUserName($params['id'], 'lecturers');
                break;
            case 'Методист':
                return $db->getUserName($params['id'], 'methodists');
                break;
            default:
                break;
        }
    }
    return false;
}
// Получить все пары
function getAllLessons() {
    global $db;
    return $db->getAllLessons();
}
// Удалить пару
function deleteLesson($params) {
    global $db;
    if ($params['time'] && $params['dayOfWeek'] && $params['cabinet']) {
        return $db->deleteLesson($params['time'], $params['dayOfWeek'], $params['cabinet']);
    }
    return false;
}
// Получить список всех преподавателей
function getAllLecturers() {
    global $db;
    return $db->getAllLecturers();
}
// Получить список всех групп
function getAllGroups() {
    global $db;
    return $db->getAllGroups();
}
// Маршрутизация запросов от пользователя к серверу
function router($params) {
    $method = $params['method'];
    if ($method) {
        switch ($method) {
            // case 'loginStud': return loginStud($params);
            // case 'loginLect': return loginLect($params);
            case 'login': return login($params);
            case 'getAllLessons': return getAllLessons();
            case 'getUserName': return getUserName($params);
            case 'getStudLessons': return getStudLessons($params);
            case 'getLectLessons': return getLectLessons($params);
            case 'addLesson': return addLesson($params);
            case 'deleteLesson': return deleteLesson($params);
            case 'getAllLecturers': return getAllLecturers();
            case 'getAllGroups': return getAllGroups();
            default: return false;
        }
    }
    return false;
}

function answer($data) {
    if ($data) {
        return array(
            'result' => 'ok',
            'data' => $data
        );
    }
    return array(
        'result' => 'error',
        'error' => array(
            'code' => 9000,
            'text' => 'unknown error'
        )
    );
}

echo json_encode(answer(router($_GET)), JSON_UNESCAPED_UNICODE);