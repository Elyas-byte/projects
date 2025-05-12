let projects = [];

document.addEventListener("DOMContentLoaded", () => {
    loadFromLocalStorage();
    displayProjects();
});

class Todo {
    constructor(title, description, dueDate, priority) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

class Project {
    constructor(name) {
        this.id = Date.now();
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }
}

function saveToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadFromLocalStorage() {
    const savedProjects = JSON.parse(localStorage.getItem('projects'));
    if (savedProjects) {
        projects = savedProjects.map(p => {
            const project = new Project(p.name);
            project.todos = p.todos.map(todo => new Todo(todo.title, todo.description, todo.dueDate, todo.priority));
            return project;
        });
    } else {
        createProject('My Project');
    }
}

function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    saveToLocalStorage();
    displayProjects();
}

function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;

        li.addEventListener('click', () => {
            const previouslySelected = document.querySelector('.selected');
            if (previouslySelected) {
                previouslySelected.classList.remove('selected');
            }
            li.classList.add('selected');

            displayTodos(project.id);
        });

        projectList.appendChild(li);
        if (project.name === 'My Project') {
            li.classList.add('selected');
            displayTodos(project.id);
        }

    });
}

function createTodo() {
    const title = prompt('Enter todo title');
    const description = prompt('Enter todo description');
    const dueDate = prompt('Enter due date (yyyy-mm-dd)');
    const priority = prompt('Enter priority (low, medium, high)');

    if (title && description && dueDate && priority) {
        const todo = new Todo(title, description, dueDate, priority);
        const projectId = projects.find(p => p.name === 'My Project').id;
        const project = projects.find(p => p.id === projectId);
        project.addTodo(todo);
        saveToLocalStorage();
        displayTodos(projectId);
    }
}

function displayTodos(projectId) {
    const project = projects.find(p => p.id === projectId);
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    project.todos.forEach(todo => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const span = document.createElement('span');
        span.style.display = "flex"
        span.style.flexDirection = "column"
        li.appendChild(span);
        p.textContent = `${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;
        p.style.color = todo.priority === 'high' ? 'red' : (todo.priority === 'medium' ? 'orange' : 'green');
        p.style.marginBottom = "2px"
        span.appendChild(p)
        const p2 = document.createElement('p');
        p2.textContent = `${todo.description}`
        span.appendChild(p2)

        li.style.display = "flex"
        li.style.flexDirection = "row"
        li.style.justifyContent = "space-between"
        li.style.alignItems = "center"
        li.addEventListener('click', () => {
            todo.toggleCompleted();
            saveToLocalStorage();
            li.style.textDecoration = todo.completed ? 'line-through' : 'none';
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.marginTop = "0"
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            project.removeTodo(todo.id);
            saveToLocalStorage();
            displayTodos(projectId);
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

document.getElementById('create-project-btn').addEventListener('click', () => {
    const projectName = prompt('Enter project name');
    if (projectName) {
        createProject(projectName);
    }
});

document.getElementById('create-todo-btn').addEventListener('click', () => {
    createTodo();
});
