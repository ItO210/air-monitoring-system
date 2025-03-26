document.addEventListener("DOMContentLoaded", () => {
  usuario_iniciado = localStorage.getItem("usuario_iniciado");
  // Recargar la página cada 60 segundos (60000 milisegundos)
  setInterval(() => {
    location.reload();
  }, 30000);

  if (!usuario_iniciado) {
    window.location.href = "../inicio_sesion.html";
  }
  const salir_sesion = document.getElementById("salir-sesion");
  salir_sesion.addEventListener("click", async () => {
    localStorage.removeItem("usuario_iniciado");
  });
});
