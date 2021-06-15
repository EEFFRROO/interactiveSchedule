window.onload = () => {
    const server = new Server();
    // Создание таблицы при клике по кнопке
    // document.getElementById('btn').onclick = async () => {
    //     let data = await server.getLessons(); // Запрос расписания к серверу
    //     let columns = ["Название предмета", "Преподаватель", "Группа", "Время", "День недели", "Кабинет"]; // Названия столбцов
    //     createTable(data, columns); // Создание таблицы по данным
    // };

    // const btnStud = document.getElementById('btnStud');
    // const btnLect = document.getElementById('btnLect');
    // btnStud.onclick = () => {
    //     createAuthForm("Stud");
    // };
    // btnLect.onclick = () => {
    //     createAuthForm("Lect");
    // };

    const btnLogin = document.getElementById('btnLogin'); // Кнопка авторизации
    btnLogin.onclick = () => {
        createAuthForm("User");
    };


    // Создание формы авторизации
    function createAuthForm(user) {
        const selectBtns = document.getElementsByClassName('selectBtns')[0];
        selectBtns.style.display = "none";
        const form = document.createElement('div'); 
        form.className = "form";
        form.style.display = "block";
        // Поле ввода логина
        const loginInput = document.createElement('input');
        loginInput.className = "login" + user;
        loginInput.placeholder = "Введите логин";
        form.append(loginInput);
        // Поле ввода пароля
        const passwordInput = document.createElement('input');
        passwordInput.className = "password" + user;
        passwordInput.placeholder = "Введите пароль";
        form.append(passwordInput);
        // Кнопка подтверждения
        const acceptButton = document.createElement('button');
        acceptButton.className = "acceptButton";
        acceptButton.innerText = "Подтвердить";
        acceptButton.onclick = async () => {
            let userInfo = await server.auth(loginInput.value, passwordInput.value, user);
            if (userInfo) {
                form.remove(); // Убираем форму
                // if (user == "Stud")
                //     pageForStudent(userInfo);
                // else
                //     pageForLecturer(userInfo);
                pageForUser(userInfo);
            } else {
                alert('Неверно введены данные');
            }
        }
        form.append(acceptButton);
        // Кнопка перехода назад
        const backButton = document.createElement('button');
        backButton.className = "backButton";
        backButton.innerText = "Назад";
        backButton.onclick = () => {
            form.remove();
            selectBtns.style.display = "block";
        }
        form.append(backButton);
        document.body.append(form);
    }
    
    // Создание таблицы по данным и названиям столбцов
    function createTable(data, columns, deleteFlag = false) {
        let table = document.createElement("table"); // Таблица
        table.style.border = "1px solid"; // Рамка таблицы
    
        // Добавление строки с названиями столбцов
        let tr = document.createElement("tr"); // Строка
        columns.forEach(i => {
            th = document.createElement("th"); // Ячейка названия столбца
            th.innerText = i; // Текст ячейки
            tr.append(th); // Добавление ячейки в строку
        });
    
        table.append(tr); // Добавление строки в таблицу
    
        let deleteButton;

        // Добавление данных в таблицу
        if (data) {
            data.forEach(i => {
                tr = document.createElement("tr"); // Строка таблицы
                i.forEach(j => {
                    td = document.createElement("td"); // Ячейка строки таблицы
                    td.innerText = j; // Текст ячейки
                    tr.append(td); // Добавление ячейки в строку
                }); 
                if (deleteFlag) { // Если есть возможность удалять
                    deleteButton = document.createElement("button");
                    deleteButton.innerText = "Удалить пару";
                    // console.log(i);
                    deleteButton.onclick = () => {
                        if (confirm("Удалить " + i.join(" ") + " ?")) {
                            server.deleteLesson(i[3], i[4], i[5]); // Запрос к серверу на удаление пары
                            let hideBtn = document.getElementById("hideBtn");
                            if (hideBtn) {
                                hideBtn.click();
                                document.getElementById("showBtn").click();
                            }
                        }
                    }
                    // deleteButton.id = "deleteBtn" + i.item(0)
                    tr.append(deleteButton);
                }
                table.append(tr); // Добавление строки в таблицу
            });
            // document.body.append(table); // Добавление таблицы на страницу
            return table;
        }
        return false;
    }
    //===================================
    //===================================
    //===================================
    //===================================
    //===================================
    // Страница студента(УСТАР.)
    async function pageForStudent(student) {
        let div = document.createElement('div');
        div.className = "studInfo";
        let h = document.createElement('h1');
        h.innerText = student["FULL_NAME"];
        div.append(h);
        // Кнопка "показать пары"
        let lessonsBtn = document.createElement('button');
        lessonsBtn.innerText = "Показать мои пары";
        let tableLessons; // Таблица расписания
        // Кнопка "скрыть пары"
        let btnHide = document.createElement('button');
        btnHide.innerText = "Скрыть";
        // Показать расписание
        lessonsBtn.onclick = async () => {
            let lessons = await server.getStudLessons(student['ID']);
            let columns = ["Название предмета", "Преподаватель", "Группа", "Время", "День недели", "Кабинет"]; // Названия столбцов
            lessonsBtn.remove();
            tableLessons = createTable(lessons, columns); // Создание таблицы по данным
            tableLessons.className = "tableLessons";
            div.append(tableLessons);
            div.append(btnHide);
        }
        // Скрыть расписание
        btnHide.onclick = () => {
            tableLessons.remove();
            btnHide.remove();
            div.append(lessonsBtn);
        }
        div.append(lessonsBtn);
        document.body.append(div);
        return div;
    }

    // Страница преподавателя(УСТАР.)
    async function pageForLecturer(lecturer) {
        let div = document.createElement('div');
        div.className = "lectInfo";
        let h = document.createElement('h1');
        h.innerText = lecturer["FULL_NAME"];
        div.append(h);
        // Кнопка "показать пары"
        let lessonsBtn = document.createElement('button');
        lessonsBtn.innerText = "Показать моё расписание";
        let tableLessons; // Таблица расписания
        // Кнопка "скрыть пары"
        let btnHide = document.createElement('button');
        btnHide.innerText = "Скрыть";
        // Показать расписание
        lessonsBtn.onclick = async () => {
            let lessons = await server.getLectLessons(lecturer['ID']);
            let columns = ["Название предмета", "Группа", "Время", "День недели", "Кабинет"]; // Названия столбцов
            lessonsBtn.remove();
            tableLessons = createTable(lessons, columns); // Создание таблицы по данным
            tableLessons.className = "tableLessons";
            div.append(tableLessons);
            div.append(btnHide);
        }
        // Скрыть расписание
        btnHide.onclick = () => {
            tableLessons.remove();
            btnHide.remove();
            div.append(lessonsBtn);
        }

        // // Кнопка "Добавить пару"
        // let btnAddLesson = document.createElement('button');
        // btnAddLesson.innerText = "Добавить пару";
        // btnAddLesson.onclick = () => {
        //     let divAddLesson = document.createElement('div');
        //     div.append(divAddLesson);
        //     let nameLesson = document.createElement('input');
        //     nameLesson.placeholder = "Название предмета";
        //     let group = document.createElement('input');
        //     group.placeholder = "Группа";
        //     let time = document.createElement('input');
        //     time.placeholder = "Время";
        //     let dayOfWeek = document.createElement('input');
        //     dayOfWeek.placeholder = "День недели";
        //     let cabinet = document.createElement('input');
        //     cabinet.placeholder = "Кабинет";
        //     let acceptButton = document.createElement('button');
        //     acceptButton.innerText = "Добавить";
        //     acceptButton.onclick = () => {
        //         server.addLesson(nameLesson.value, group.value, time.value, dayOfWeek.value, cabinet.value, lecturer["ID"]);
        //         divAddLesson.remove();
        //     }
        //     divAddLesson.append(nameLesson, group, time, dayOfWeek, cabinet, acceptButton);
        // }
        // div.append(btnAddLesson);

        div.append(lessonsBtn);
        document.body.append(div);
        return div;

    }
    //===================================
    //===================================
    //===================================
    //===================================
    //===================================


    // Страница пользователя
    async function pageForUser(user) {
        let access = false; // Доступ к удалению
        if (user['ROLE'] == 'Методист')
            access = true;
        let div = document.createElement('div'); // Контейнер информации о пользователе
        div.className = "userInfo";
        let h3 = document.createElement('h3'); // Роль пользователя
        h3.innerText = user['ROLE'];
        div.append(h3);
        let h1 = document.createElement('h1'); // Имя пользователя
        let name = await server.getUserName(user['ID'], user['ROLE']); // Получить имя пользователя
        h1.innerText = name;
        div.append(h1);
        // Кнопка "показать пары"
        let lessonsBtn = document.createElement('button');
        lessonsBtn.innerText = "Показать пары";
        lessonsBtn.id = "showBtn";
        let tableLessons; // Таблица расписания
        // Кнопка "скрыть пары"
        let btnHide = document.createElement('button');
        btnHide.innerText = "Скрыть";
        btnHide.id = "hideBtn"
        // Показать расписание
        lessonsBtn.onclick = async () => {
            let lessons; // Пары
            let columns; // Название столбцов
            let deleteFlag = false; // Возможность удаления
            switch (user['ROLE']) {
                case 'Студент' :
                    lessons = await server.getStudLessons(user['ID']);
                    columns = ["Название предмета", "Преподаватель", "Группа", "Время", "День недели", "Кабинет"]; // Названия столбцов
                    break;
                case 'Преподаватель' :
                    lessons = await server.getLectLessons(user['ID']);
                    columns = ["Название предмета", "Группа", "Время", "День недели", "Кабинет"]; // Названия столбцов
                    break;
                case 'Методист' :
                    lessons = await server.getAllLessons();
                    columns = ["Название предмета", "Преподаватель", "Группа", "Время", "День недели", "Кабинет"]; // Названия столбцов
                    deleteFlag = true;
                    break;
            }
            lessonsBtn.remove();
            tableLessons = createTable(lessons, columns, deleteFlag); // Создание таблицы по данным
            tableLessons.className = "tableLessons";
            div.append(tableLessons); // Добавляем таблицу пар на страницу
            div.append(btnHide); // Добавляем кнопку "Скрыть"
        }
        // Скрыть расписание
        btnHide.onclick = () => { 
            tableLessons.remove(); // Убираем таблицу пар
            btnHide.remove(); // Убираем саму кнопку скрытия
            div.append(lessonsBtn); // Добавляем на страницу кнопку показа пар
        }

        if (access) {
            // Кнопка "Добавить пару"
            let btnAddLesson = document.createElement('button');
            btnAddLesson.innerText = "Добавить пару";
            btnAddLesson.onclick = async () => {
                // Удаляем старую строку добавления, если она есть
                temp = document.getElementsByClassName("addLesson").item(0);
                if (temp) {
                    temp.remove();
                }
                // Строка ячеек ввода информации по лекции
                let divAddLesson = document.createElement('div'); // Контейнер ввода
                divAddLesson.className = "addLesson";
                div.append(divAddLesson);
                let nameLesson = document.createElement('input'); // Поле "Название предмета"
                nameLesson.placeholder = "Название предмета";

                let groups = await server.getAllGroups(); // Получаем список групп
                let group = createSelectField(groups); // Поле "Группы"

                let time = document.createElement('input'); // Поле "Время"
                time.placeholder = "Время";

                let dayOfWeek = createSelectField(["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]); // Поле "День недели"

                let cabinet = document.createElement('input'); // Поле "Кабинет"
                cabinet.placeholder = "Кабинет"; 

                let lecturers = await server.getAllLecturers(); // Получаем список преподавателей
                let lecturer = createSelectField(lecturers); // Поле "Преподаватель"

                let acceptButton = document.createElement('button'); // Кнопка добавления лекции в базу
                acceptButton.innerText = "Добавить";
                acceptButton.onclick = () => { // Действие при нажатии
                    // console.log(await server.addLesson(nameLesson.value, group.value, time.value, dayOfWeek.value, cabinet.value, lecturer.value));
                    server.addLesson(nameLesson.value, group.value, time.value, dayOfWeek.value, cabinet.value, lecturer.value); // Отправляем на сервер
                    divAddLesson.remove(); // Убираем контейнер ввода
                }
                divAddLesson.append(nameLesson, group, lecturer, time, dayOfWeek, cabinet, acceptButton); // Добавляем все поля ввода и кнопку в контейнер
            }
            div.append(btnAddLesson); // Добавляем кнопку добавления лекции на страницу пользователя
        }

        div.append(lessonsBtn);
        document.body.append(div);
        return div;
    }

    function createSelectField(data) { // Создание поля выбора
        let select = document.createElement('select');
        data.forEach(i => {
            let option = document.createElement('option');
            option.innerText = i;
            option.value = i;
            select.append(option);
        });
        return select;
    }
}

