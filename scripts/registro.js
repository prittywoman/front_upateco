document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById("nombre_usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const email = document.getElementById("email").value;

    registrarUsuario(nombreUsuario, contraseña, email);
});

function registrarUsuario(nombreUsuario, contraseña, email) {
    const data = {
        nombre_usuario: nombreUsuario,
        contraseña: contraseña,
        email: email
    };

    fetch("http://127.0.0.1:5000/usuarios/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.status === 201) {
            alert("Registro exitoso");
            // Redirige a la página de inicio de sesión
            window.location.href = "login.html"; 
        } else {
            return response.json().then(data => {
                alert("Error en el registro: " + data.message);
            });
        }
    })
    .catch(error => {
        console.error("Ocurrió un error:", error);
        alert("Ocurrió un error durante el registro");
    });
}
