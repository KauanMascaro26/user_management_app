const API_URL = 'http://localhost:3000/users';

const form = document.getElementById('user-form');

let editingUserId = null;

async function loadUsers() {

    const response = await fetch(API_URL);
    const users = await response.json();

    const usersList = document.getElementById('users-list');

    usersList.innerHTML = '';

    users.forEach(user => {

        usersList.innerHTML += `
            <div class="user-card">
                <h3>${user.name}</h3>
                <p>${user.email}</p>

                <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">
                    Edit
                </button>

                <button onclick="deleteUser(${user.id})">
                    Delete
                </button>
            </div>
        `;
    });
}

async function deleteUser(id) {

    const confirmDelete = confirm(
        'Are you sure you want to delete this user?'
    );

    if (!confirmDelete) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    loadUsers();
}

function editUser(id, name, email) {

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;

    editingUserId = id;
}

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (editingUserId) {

        await fetch(`${API_URL}/${editingUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        editingUserId = null;

    } else {

        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email
            })
        });

    }

    form.reset();

    loadUsers();
});

loadUsers();