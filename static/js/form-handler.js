document.getElementById('task-box').addEventListener('submit', function (event) {
    event.preventDefault();
    const task_content = document.getElementById('task_content').value;
    const errormsg = document.getElementById('errormsg');

    if (!task_content) {
        errormsg.classList.remove('hidden');
        errormsg.textContent = "Task contents cannot be empty";
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
            location.reload();
        })
        .catch(error => {
            errormsg.classList.remove('hidden');
            errormsg.textContent = "An Error occured. Please try again";
            console.log(error.message);
        })
})

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