class Server {

    id = null;
    user;

    constructor() {}

    // Отправка запроса к серверу
    async send(method, data) {
        const arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`); // Отправляемые параметры
        }
        const response = await fetch(`api/?method=${method}&${arr.join('&')}`); // Запрос на сервер
        const answer = await response.json(); // Ответ в формате json
        // Возвращаем ответ
        if (answer && answer.result === 'ok') {
            return answer.data;
        } else if (answer && answer.result === 'error') {
            return false;
        }
    }

    // Получение расписания студента
    async getStudLessons(id) {
        let temp = new Promise(res => { // Временный промис возвращающий значение после ответа сервера
            res(this.send('getStudLessons', { id }));
        });
        return temp;
    }

    // Получение расписания преподавателя
    async getLectLessons(id) {
        let temp = new Promise(res => {
            res(this.send('getLectLessons', { id }));
        });
        return temp;
    }

    // Получение всего расписания
    async getAllLessons() {
        let temp = new Promise(res => {
            res(this.send('getAllLessons', {  }));
        });
        return temp;
    }
    
    // Получение имени пользователя по id и роли
    async getUserName(id, role) {
        let temp = new Promise(res => {
            res(this.send('getUserName', { id, role }));
        });
        return temp;
    }

    // Добавить пару
    addLesson(name, group, time, dayOfWeek, cabinet, lecturer) {
        return this.send('addLesson', { name, group, time, dayOfWeek, cabinet, lecturer });
    }

    // Удалить пару
    deleteLesson(time, dayOfWeek, cabinet) {
        return this.send('deleteLesson', { time, dayOfWeek, cabinet });
    }

    // Получить список всех преподавателей
    getAllLecturers() {
        let temp = new Promise(res => {
            res(this.send('getAllLecturers', {  }));
        });
        return temp;
    }

    // Получения списка всех групп
    getAllGroups() {
        let temp = new Promise(res => {
            res(this.send('getAllGroups', {  }));
        });
        return temp;
    }

    // Авторизация
    async auth(login, password, user) {
        // let log = "login";
        const data = await this.send("login", { login, password });
        this.user = user;
        if (data && data.id) {
            this.id = data.id;
        }
        return data;
    }



}