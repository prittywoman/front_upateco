
function login() {
    const nombre_usuario = document.getElementById("usernameInput").value;
    const contraseña = document.getElementById("passwordInput").value;

    
    fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre_usuario, contraseña }),
    })
    .then(response => {
        if (response.status === 200) {
           
            alert("Inicio de sesión exitoso");
            window.location.href = "servidores.html"; 
        } else {
            
            return response.json().then(data => {
                alert("Error de inicio de sesión: " + data.message);
            });
        }
    })
    .catch(error => {
        console.error("Ocurrió un error:", error);
        alert("Ocurrió un error al iniciar sesión");
    });
}
