const API_URL = 'http://localhost:3000/users';

const form = document.getElementById('user-form');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoPreview = document.getElementById('photo-preview');
const faceStatus = document.getElementById('face-status');
const captureButton = document.getElementById('capture-photo');

captureButton.disabled = true;
captureButton.style.cursor = 'not-allowed';

let photoData = null;
let editingUserId = null;

document
    .getElementById('retake-photo')
    .addEventListener('click', async () => {

        photoPreview.style.display = 'none';

        video.style.display = 'block';

        photoData = null;

        document.getElementById('retake-photo')
            .style.display = 'none';

        await startCamera();
    });

document.getElementById('retake-photo')
    .style.display = 'none';

async function startCamera() {

    const stream =
        await navigator.mediaDevices.getUserMedia({
            video: true
        });

    video.srcObject = stream;
}

document
    .getElementById('start-camera')
    .addEventListener('click', async () => {

        photoPreview.style.display = 'none';
        video.style.display = 'block';
        
        await startCamera();

        setInterval(async () => {

            const detection =
                await faceapi.detectSingleFace(
                    video,
                    new faceapi.TinyFaceDetectorOptions()
                );

            if (!detection) {

                faceStatus.textContent =
                    'Nenhum rosto detectado';

                faceStatus.style.color = 'red';

                captureButton.disabled = true;

                captureButton.style.cursor =
                    'not-allowed';

                return;
            }

            const width =
                detection.box.width;

            if (width < 100) {

                faceStatus.textContent =
                    'Aproxime-se da câmera';

                faceStatus.style.color =
                    '#f39c12';

                captureButton.disabled = true;

                captureButton.style.cursor =
                    'not-allowed';

            } else if (width > 220) {

                faceStatus.textContent =
                    'Afaste-se da câmera';

                faceStatus.style.color =
                    '#f39c12';

                captureButton.disabled = true;

                captureButton.style.cursor =
                    'not-allowed';

            } else {

                faceStatus.textContent =
                    'Rosto bem posicionado';

                faceStatus.style.color =
                    'green';

                captureButton.disabled = false;

                captureButton.style.cursor =
                    'pointer';
            }

        }, 500);

    });

document
    .getElementById('capture-photo')
    .addEventListener('click', () => {
        const context =
            canvas.getContext('2d');

        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        photoData =
            canvas.toDataURL('image/png');

        photoPreview.src = '';

        setTimeout(() => {
            photoPreview.src = photoData;
        }, 10);
        const stream = video.srcObject;

        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
        }
        video.style.display = 'none';
        photoPreview.style.display = 'block';

        document.getElementById('retake-photo')
            .style.display = 'block';
    });


async function loadUsers() {

    const response = await fetch(API_URL);
    const users = await response.json();

    const usersList = document.getElementById('users-list');

    usersList.innerHTML = '';

    users.forEach(user => {

        usersList.innerHTML += `
            <div class="user-card">
            ${
            user.photo
                ? `<img src="${user.photo}" width="150">`
                : ''
            }
                <h3>${user.name}</h3>
                <p>${user.email}</p>

                <button onclick="editUser(
                    ${user.id},
                    '${user.name}',
                    '${user.email}',
                    \`${user.photo || ''}\`
                )">
                    Editar
                </button>

                <button onclick="deleteUser(${user.id})">
                    Excluir
                </button>
            </div>
        `;
    });
}

async function deleteUser(id) {

    const confirmDelete = confirm(
        'Você tem certeza que quer excluir esse usuário?'
    );

    if (!confirmDelete) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    loadUsers();
}

function editUser(id, name, email, photo) {

    document.getElementById('name').value = name;
    document.getElementById('email').value = email;

    photoData = photo;

    if (photo) {
        photoPreview.src = photo;
        photoPreview.style.display = 'block';
        video.style.display = 'none';
}

    editingUserId = id;
}

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    if (!photoData) {

    alert(
        'É obrigatório capturar uma foto antes de salvar o usuário.'
    );

    return;
}

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
                email,
                photo: photoData
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
                email,
                photo: photoData
            })
        });

    }

    form.reset();
    photoPreview.src = '';
    loadUsers();
});

async function loadFaceApi() {

    await faceapi.nets.tinyFaceDetector.loadFromUri(
        './models'
    );

    console.log('Face API Loaded');
}
loadUsers();
loadFaceApi();