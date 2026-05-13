const URL_GOOGLE_SCRIPT = "https://script.google.com/macros/s/AKfycbyPtzxrtvR70u2HUVqbXNvIfVWopi3Fn4kyvafyc2YDiWMC-ArhuuvX3Dx1MxNrF-Jf/exec";

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

    // Deshabilitar botón y mostrar estado de carga
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Procesando...';
    msg.innerHTML = '';

    const datos = { para, asunto, token };

    try {
        // SIN HEADERS PERSONALIZADOS para evitar problema de CORS
        const response = await fetch(URL_GOOGLE_SCRIPT, {
            method: 'POST',
            body: JSON.stringify(datos)
        });

        const nroGenerado = await response.text();
        
        console.log('Respuesta del servidor:', nroGenerado);

        if (nroGenerado.toLowerCase().includes('error')) {
            throw new Error(nroGenerado);
        }

        // ÉXITO: Mostrar el número generado
        msg.innerHTML = `<div class="alert alert-success">✅ Oficio asignado con éxito:<br><h4>${nroGenerado}</h4></div>`;
        document.getElementById('formOficio').reset();
        
    } catch (error) {
        console.error('Error:', error);
        msg.innerHTML = `<div class="alert alert-danger">❌ Error: ${error.message}</div>`;
    } finally {
        // Reactivar botón
        btn.disabled = false;
        btn.innerHTML = 'Generar Oficio';
    }
});
