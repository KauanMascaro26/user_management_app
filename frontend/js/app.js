const API_URL = 'http://localhost:3000/users';

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
            </div>
        `;
    });
}

loadUsers();