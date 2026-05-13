const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbwqlhnmqNY179jcCwhh-2gkgH5S4FX_LDtTy94_zXm30i0Fd100F2v8i3efbBryzlLR/exec";

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
        // CONSTRUIMOS LA URL CON LOS PARÁMETROS (GET)
        const url = `${URL_GOOGLE_SCRIPT}?para=${encodeURIComponent(para)}&asunto=${encodeURIComponent(asunto)}&token=${encodeURIComponent(token)}`;
        
        // PETICIÓN GET - Google Apps Script maneja CORS automáticamente
        const response = await fetch(url, { method: 'GET' });
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
