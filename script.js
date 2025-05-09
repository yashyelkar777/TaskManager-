$(document).ready(function() {
    loadTasks();


    $('#task-form').on('submit', function(e) {
        e.preventDefault();
        const taskInput = $('#task-input').val().trim();
        
        if (taskInput) {
            addTask(taskInput);
            $('#task-input').val('');
        }
    });

    
    $(document).on('click', '.delete-task', function() {
        $(this).closest('li').remove();
        saveTasks();
    });

    
    $(document).on('click', '.edit-task', function() {
        const listItem = $(this).closest('li');
        const taskText = listItem.find('.task-text');
        const newText = prompt('Edit task:', taskText.text());
        
        if (newText !== null && newText.trim() !== '') {
            taskText.text(newText);
            saveTasks();
        }
    });
    
    function addTask(text) {
        $('#task-list').append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="task-text">${text}</span>
                <div>
                    <button class="btn btn-warning btn-sm edit-task">Edit</button>
                    <button class="btn btn-danger btn-sm delete-task">Delete</button>
                </div>
            </li>
        `);
        saveTasks();
    }

    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task));
    }

    
    function saveTasks() {
        const tasks = [];
        $('.task-text').each(function() {
            tasks.push($(this).text());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});