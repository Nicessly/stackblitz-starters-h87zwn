//sidebar
const menuItems = document.querySelectorAll('.menu-item');
const messagesNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
 

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        
        if (item.id != 'notifications') {
            document.querySelector('.notifications-popup').style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').style.display = 'block';
            document.querySelector('#notifications .notification-count').style.display='none';
        }
    })
})


const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
        let name=chat.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        } else{
            chat.style.display = 'none';
        }
    })
}

messageSearch.addEventListener('keyup', searchMessage);


messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

const createPostForm = document.querySelector('.create-post');
const feedContainer = document.querySelector('.feeds');

// Función para guardar las publicaciones en el localStorage
const savePostsToLocalStorage = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};

// Función para cargar las publicaciones desde el localStorage
const loadPostsFromLocalStorage = () => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    return savedPosts ? savedPosts : [];
};

// Función para agregar una nueva publicación
const addPost = (postText) => {
    // Crear un nuevo elemento de publicación
    const newPost = document.createElement('div');
    newPost.classList.add('feed');

    // Contenido de la nueva publicación
    newPost.innerHTML = `
        <!-- Estructura de la publicación -->
        <div class="head"></div>
        <div class="user">
            <div class="profile-pic">
                <img src="images/profile-8.jpg" alt="">
            </div>
            <div class="info">
                <h3>Your Name</h3>
                <small>Now</small>
            </div>
            <span class="edit"><i class="uil uil-ellipsis-v"></i></span>
        </div>
        <div class="photo"></div>
        <p> ${postText}</p>
        <div class="action-button">
            <div class="interaction-button">
                <span><i class="uil uil-thumbs-up"></i></span>
                <span><i class="uil uil-comment"></i></span>
                <span><i class="uil uil-share"></i></span>
            </div>
            <div class="bookmark">
                <span><i class="uil uil-bookmark"></i></span>
            </div>
        </div>
        <div class="caption">
            
        </div>
        <div class="comments text-muted">View all 0 comments</div>
    `;

    // Insertar la nueva publicación al principio del contenedor de publicaciones
    feedContainer.prepend(newPost);

    // Obtener las publicaciones guardadas en el localStorage
    let savedPosts = loadPostsFromLocalStorage();
    
    // Agregar la nueva publicación al arreglo de publicaciones guardadas
    savedPosts.unshift(postText);
    
    // Guardar el arreglo actualizado en el localStorage
    savePostsToLocalStorage(savedPosts);
};

// Agregar evento de envío de formulario
createPostForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    const inputField = document.querySelector('#create-post');
    const postText = inputField.value;

    // Agregar la nueva publicación
    addPost(postText);

    // Limpiar el campo de entrada después de publicar
    inputField.value = '';
});

// Agregar evento de pulsación de tecla en el campo de entrada
createPostForm.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evitar que el formulario se envíe

        const inputField = document.querySelector('#create-post');
        const postText = inputField.value;

        // Agregar la nueva publicación
        addPost(postText);

        // Limpiar el campo de entrada después de publicar
        inputField.value = '';
    }
});

const thumbsUpIcon = document.querySelector('.interaction-button .uil-thumbs-up');
const likeCount = document.querySelector('.interaction-button .like-count');

let likeCounter = 0;
let isLiked = false;

thumbsUpIcon.addEventListener('click', () => {
    if (!isLiked) {
        likeCounter++;
        thumbsUpIcon.classList.add('active');
        isLiked = true;
    } else {
        likeCounter--;
        thumbsUpIcon.classList.remove('active');
        isLiked = false;
    }
    likeCount.textContent = likeCounter;
});

