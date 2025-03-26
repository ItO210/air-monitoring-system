function cambiarTexto() {
  var enlace = document.getElementById("iniciar-sesion-opcion-menu");
  if (localStorage.getItem("usuario_iniciado")) {
    enlace.textContent = "MI MONITOREO";
  } else {
    var enlace = document.getElementById("iniciar-sesion-opcion-menu");
    enlace.textContent = "INICIAR SESIÓN";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Evento que se ejecuta cuando termina de cargar la página
  cambiarTexto();
});
