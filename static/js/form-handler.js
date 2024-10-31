document.getElementById('task-box').addEventListener('submit', function (event) {
    event.preventDefault();
    const task_content = document.getElementById('task_content').value.trim();
    const errormsg = document.getElementById('errormsg');

    const displayError = (message) => {
        errormsg.classList.remove('hidden')
        errormsg.textContent = message
    }

    if (!task_content) {
        displayError("Task contents cannot be empty");
        return;
    }

    console.log(task_content);

    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task_content: task_content }),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.Error || 'An error occured');
                })
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                displayError(data.error);
            } else {
                errormsg.classList.add('hidden')
                location.reload();
            }
        })
        .catch(error => {
            displayError("An Error occured. Please try again");
            console.log(error.message);
        })
})

function editTask(id) {
    const taskInput = document.getElementById(`task-${id}`);
    const saveButton = taskInput.nextElementSibling.nextElementSibling.nextElementSibling;

    taskInput.removeAttribute('readonly');
    taskInput.classList.add('border-b', 'border-gray-900', 'dark:border-gray-100');
    taskInput.focus();
    saveButton.classList.remove('hidden');
}

function saveTask(id) {
    const taskInput = document.getElementById(`task-${id}`);
    const new_task = taskInput.value.trim();
    const errormsg1 = document.getElementById('errormsg1');

    const displayError = (message) => {
        errormsg1.classList.remove('hidden');
        errormsg1.textContent = message
    }

    if (!new_task) {
        displayError("Task cannot be empty");
        return;
    }

    fetch(`/edit/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_task: new_task }),
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || 'An error occured');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                displayError(data.error)
            } else {
                errormsg1.classList.add('hidden')
                location.reload();
            }
        })
        .catch(error => {
            displayError("An error occured");
            console.log(error.message);
        });

};

function deleteTask(id) {
    if (confirm('Are you sure you want delete this task')) {
        console.log(id);

        fetch(`/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.Error || 'An error occured')
                    })
                }
                return response.json()
            })
            .then(data => {
                location.reload();
            })
            .catch(error => {
                errormsg.classList.remove('hidden');
                errormsg.textContent = "An Error occured. Please try again";
                console.log(error.message);

            })
    }
}