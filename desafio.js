function showAlert(){
    alert("¡Te dije que no hicieras click en mí!😡");
}
document.querySelector("button.button-menu-toggle")
    .addEventListener("click", function() {
           document.querySelector(".nav-links").
                      classList.toggle("nav-links-responsive")})