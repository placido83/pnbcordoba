const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbyrnZ7BOTwGNPV9Ja6hvbic-riV7G0-6M6_s_aVfHlewxPzMXyMiU-CQCDxnQWj4ILp/exec";

document.getElementById('formOficio').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msg = document.getElementById('mensaje');
    
    btn.disabled = true;
    msg.innerHTML = "Procesando...";

    const datos = {
        para: document.getElementById('para').value,
        asunto: document.getElementById('asunto').value,
        token: document.getElementById('token').value
    };

    try {
        const response = await fetch(URL_GOOGLE_SCRIPT, {
            method: 'POST',
            body: JSON.stringify(datos)
        });

        const nroGenerado = await response.text();

        if (nroGenerado.includes("Error")) {
            msg.innerHTML = `<b style="color:red">${nroGenerado}</b>`;
        } else {
            msg.innerHTML = `<div class="alert alert-success">Asignado con éxito:<br><h4>${nroGenerado}</h4></div>`;
            document.getElementById('formOficio').reset();
        }
    } catch (error) {
        msg.innerHTML = "Error de conexión. Verifique el Excel.";
    }
    btn.disabled = false;
});
