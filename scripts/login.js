document.addEventListener("DOMContentLoaded", function () {
  const jwt = localStorage.getItem("jwt");
  if (jwt != null) {
    window.location.href = './prueba.html';
  }

  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("nombre_usuario").value;
    const password = document.getElementById("contraseña").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/usuarios/login", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.onload = function () {
      if (xhttp.status === 200) {
        const response = JSON.parse(xhttp.responseText);

        if (response.status === 'ok') {
          localStorage.setItem("jwt", response.accessToken);

          Swal.fire({
            text: response.message,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              console.log("Redirigiendo a prueba.html");
              window.location.href = './prueba.html';
            }
          });
        } else {
          Swal.fire({
            text: response.message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } else {
        console.error("Error en la solicitud AJAX");
      }
    };

    xhttp.onerror = function () {
      console.error("Error en la solicitud AJAX");
    };

    xhttp.send(JSON.stringify({
      "nombre_usuario": username,
      "contraseña": password
    }));
  });
});
