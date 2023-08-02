// Recuperar comentarios almacenados en localStorage
var savedComments = localStorage.getItem("comments");
if (savedComments) {
  var commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = savedComments;

  // Agregar evento de clic para eliminar comentarios
  var commentElements = commentsList.getElementsByClassName("comment");
  for (var i = 0; i < commentElements.length; i++) {
    commentElements[i].addEventListener("click", deleteComment);
  }
}

document.getElementById("comment-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  var commentNameInput = document.getElementById("comment-name");
  var commentTextarea = document.getElementById("comment-textarea");
  
  var commentName = commentNameInput.value;
  var commentText = commentTextarea.value;

  if (commentName.trim() !== "" && commentText.trim() !== "") {
    var commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    var commentAuthor = document.createElement("p");
    commentAuthor.classList.add("comment-author");
    commentAuthor.textContent = commentName;
    commentElement.appendChild(commentAuthor);

    var commentTextElement = document.createElement("p");
    commentTextElement.textContent = commentText;
    commentElement.appendChild(commentTextElement);

    var commentsList = document.getElementById("comments-list");
    commentsList.appendChild(commentElement);

    commentNameInput.value = "";
    commentTextarea.value = "";

    // Agregar evento de clic para eliminar el nuevo comentario
    commentElement.addEventListener("click", deleteComment);

    // Guardar comentarios en localStorage
    var existingComments = localStorage.getItem("comments");
    var updatedComments = existingComments ? existingComments + commentElement.outerHTML : commentElement.outerHTML;
    localStorage.setItem("comments", updatedComments);
  }
});

function deleteComment(event) {
  var commentElement = event.target;

  // Eliminar el comentario del contenedor de comentarios
  commentElement.parentNode.removeChild(commentElement);

  // Actualizar los comentarios almacenados en localStorage
  var commentsList = document.getElementById("comments-list");
  localStorage.setItem("comments", commentsList.innerHTML);
}
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNkdJaysXvuKXlEZOqgjvo5rWyEev-lVU",
  authDomain: "proyecto-52a68.firebaseapp.com",
  projectId: "proyecto-52a68",
  storageBucket: "proyecto-52a68.appspot.com",
  messagingSenderId: "448151821906",
  appId: "1:448151821906:web:c242e3c7c0ded99080098b",
  measurementId: "G-LEGZNPZ7P8"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener referencia a la base de datos
var database = firebase.database();

// Recuperar comentarios almacenados en Firebase Realtime Database
database.ref("comments").on("value", function(snapshot) {
  var commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = ""; // Limpiar la lista de comentarios existente

  snapshot.forEach(function(childSnapshot) {
    var comment = childSnapshot.val();
    var commentElement = createCommentElement(comment.name, comment.text);
    commentsList.appendChild(commentElement);
  });
});

document.getElementById("comment-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que el formulario se envíe

  var commentNameInput = document.getElementById("comment-name");
  var commentTextarea = document.getElementById("comment-textarea");
  
  var commentName = commentNameInput.value;
  var commentText = commentTextarea.value;

  if (commentName.trim() !== "" && commentText.trim() !== "") {
    var commentData = {
      name: commentName,
      text: commentText
    };

    // Generar una nueva clave única para el comentario
    var commentKey = database.ref("comments").push().key;

    // Guardar el comentario en Firebase Realtime Database
    var updates = {};
    updates["/comments/" + commentKey] = commentData;
    database.ref().update(updates);

    commentNameInput.value = "";
    commentTextarea.value = "";
  }
});

function createCommentElement(name, text) {
  var commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  var commentAuthor = document.createElement("p");
  commentAuthor.classList.add("comment-author");
  commentAuthor.textContent = name;
  commentElement.appendChild(commentAuthor);

  var commentTextElement = document.createElement("p");
  commentTextElement.textContent = text;
  commentElement.appendChild(commentTextElement);

  return commentElement;
}

  