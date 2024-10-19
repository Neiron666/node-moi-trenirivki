function createTask(id) {
    return {
        id: id,
        title: `Task number ${id}`,
        description: `Description of task number ${id}`,
    };
}

let tasks = [createTask(1), createTask(2)];

const getTasksHandler = (req, res) => {
    // const taskList = tasks
    //     .map((task) => `<li>${task.title},${task.description}</li>`)
    //     .join("");
    // В Express метод res.json() завершает обработку запроса и отправляет ответ клиенту в формате JSON.
    res.json(tasks);
};

const getSingleTaskHandler = (req, res) => {
    const task = tasks.find((task) => task.id === Number(req.params.taskId));

    if (task) {
        // В Express метод res.json() завершает обработку запроса и отправляет ответ клиенту в формате JSON.
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
};

const postSingleTaskHandler = (req, res) => {
    if (!req.body.title || !req.body.description) {
        //Преобразуем переданный объект в строку JSON.
        //Устанавливает заголовок ответа Content-Type: application/json
        return (
            res
                // код ошиби 400 (Bad Request)
                .status(400)
                //отправляет JSON с сообщением об ошибке: { error: "Title and description are required" }.
                .json({ error: "Title and description are required" })
        );
    } else {
        //из тела запроса деструктурируем title и description что бы затем присвоить их в новом обьекте
        const { title, description } = req.body;
        //создаем новый обьект с нужными полями
        const newTask = {
            id: tasks.length + 1,
            title: title || `Task number ${tasks.length + 1}`,
            description:
                description || `Description of task number ${tasks.length + 1}`,
        };
        tasks.push(newTask);
        res.status(201).json(newTask); // Возвращаем созданную задачу
    }
};

const putSingleTaskHandler = (req, res) => {
    const task = tasks.find((task) => task.id === Number(req.params.taskId));

    if (task) {
        if (!req.body.title && !req.body.description) {
            return res
                .status(400)
                .json({ error: "Title and description are required" });
        } else {
            // Такой джейсон будет слаться с постмэна с "raw" с выбраным форматом JSON
            //{
            //     "title": "Updated Task Title",
            //     "description": "Updated Task Description"
            // }
            // Обновляем поля задачи только если они переданы в теле запроса
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;

            res.status(201).json(task); // Возвращаем измененную задачу
        }
    } else {
        res.status(404).send(`Task ${req.params.taskId} not found`);
    }
};

const deleteSingleTaskHandler = (req, res) => {
    const taskExisting = tasks.find(
        (task) => task.id === Number(req.params.taskId)
    );

    if (taskExisting) {
        tasks = tasks.filter((task) => task.id !== Number(req.params.taskId));
        res.status(204).send(); // Успешное удаление, без контента
    } else {
        res.status(404).send(`Task ${req.params.taskId} not found`);
    }
};

module.exports = {
    getTasksHandler,
    getSingleTaskHandler,
    postSingleTaskHandler,
    putSingleTaskHandler,
    deleteSingleTaskHandler,
};
