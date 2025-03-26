document.addEventListener("DOMContentLoaded", async () => {
  // Evento que se ejecuta cuando termina de cargar la página
  usuario_iniciado = localStorage.getItem("usuario_iniciado");
  if (usuario_iniciado) {
    window.location.href = "../mi_monitoreo.html";
  }
  const iniciar_sesion = document.getElementById("iniciar_sesion");
  iniciar_sesion.addEventListener("click", async () => {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    var regex = /^[a-zA-Z]+$/;

    if (!regex.test(user)) {
      alert("El nombre de usuario solo puede contener letras.");
      return false;
    }
    if (user.length < 4 || user.length > 12) {
      alert("El nombre de usuario debe tener entre 4 y 12 caracteres.");
      return false;
    }
    if (password.length < 4 || password.length > 20) {
      alert("La contraseña debe tener entre 6 y 20 caracteres.");
      return false;
    }

    const result = await fetch("your-api-url/userData/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    });
    const data = await result.json();
    if (data[0].count && data[0].count == "1") {
      localStorage.setItem("usuario_iniciado", user);
      alert("Bienvenido/a " + user);
      window.location.href = "../mi_monitoreo.html";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
});
