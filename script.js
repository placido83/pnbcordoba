const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbyPtzxrtvR70u2HUVqbXNvIfVWopi3Fn4kyvafyc2YDiWMC-ArhuuvX3Dx1MxNrF-Jf/exec";

document.getElementById('formOficio').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const msg = document.getElementById('mensaje');
    
    const para = document.getElementById('para').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const token = document.getElementById('token').value.trim();

    if (!para || !asunto || !token) {
        msg.innerHTML = `<b style="color:red">⚠️ Error: Todos los campos son obligatorios.</b>`;
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Procesando...';
    msg.innerHTML = '';

    try {
        // USAMOS GET CON PARÁMETROS EN LA URL (esto SÍ funciona con CORS)
        const url = `${URL_GOOGLE_SCRIPT}?para=${encodeURIComponent(para)}&asunto=${encodeURIComponent(asunto)}&token=${encodeURIComponent(token)}`;
        
        const response = await fetch(url, {
            method: 'GET'
        });

        const nroGenerado = await response.text();
        
        if (nroGenerado.toLowerCase().includes('error')) {
            throw new Error(nroGenerado);
        }

        msg.innerHTML = `<div class="alert alert-success">✅ Oficio asignado con éxito:<br><h4>${nroGenerado}</h4></div>`;
        document.getElementById('formOficio').reset();
        
    } catch (error) {
        console.error('Error:', error);
        msg.innerHTML = `<div class="alert alert-danger">❌ Error: ${error.message}</div>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Generar Oficio';
    }
});
