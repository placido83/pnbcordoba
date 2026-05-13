const URL_GOOGLE_SCRIPT = "TU_URL_AQUI"; // Asegúrate de mantener tu URL

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
            body: JSON.stringify(datos)
        });

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
