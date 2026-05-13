const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbxB9Xj2pcSt4iCuYkR9VusJnn9PxEemwRE19kZ5Huhyh1CZFuKsxGZl0Y_kyei8n7xx/exec"; // Asegúrate de mantener tu URL

document.getElementById('formOficio').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msg = document.getElementById('mensaje');
    
    // Captura de valores
    const para = document.getElementById('para').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const token = document.getElementById('token').value.trim();

    // VALIDADOR DE LLENADO
    if (!para || !asunto || !token) {
        msg.innerHTML = `<b style="color:red">⚠️ Error: Todos los campos son obligatorios.</b>`;
        return;
    }

    btn.disabled = true;
    msg.innerHTML = "Procesando...";

    const datos = { para, asunto, token };

    try {
        const response = await fetch(URL_GOOGLE_SCRIPT, {
            method: 'POST',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
        });
        // IMPORTANTE: Con 'no-cors', no podemos leer la respuesta de Google, 
// así que asumimos éxito si no hubo error de conexión.
msg.innerHTML = `<div class="alert alert-success">Solicitud enviada.<br>Revise su Excel en unos segundos.</div>`;
document.getElementById('formOficio').reset();
        const nroGenerado = await response.text();

        if (nroGenerado.includes("Error")) {
            msg.innerHTML = `<b style="color:red">${nroGenerado}</b>`;
        } else {
            // ÉXITO: Muestra el número y limpia el formulario
            msg.innerHTML = `<div class="alert alert-success">Asignado con éxito:<br><h4>${nroGenerado}</h4></div>`;
            document.getElementById('formOficio').reset();
        }
    } catch (error) {
        msg.innerHTML = `<b style="color:red">Error de conexión. Verifique el Excel.</b>`;
    }
    btn.disabled = false;
});
