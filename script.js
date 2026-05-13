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
        const response = await fetch(URL_GOOGLE_SCRIPT, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        // Obtener la respuesta del servidor
        const nroGenerado = await response.text();
        
        console.log('Respuesta del servidor:', nroGenerado);
        console.log('Status:', response.status);

        // Verificar si la respuesta es un error
        if (nroGenerado.toLowerCase().includes('error') || response.status !== 200) {
            throw new Error(nroGenerado || `Error HTTP ${response.status}`);
        }

        // ÉXITO: Mostrar el número generado
        msg.innerHTML = `<div class="alert alert-success">✅ Oficio asignado con éxito:<br><h4>${nroGenerado}</h4></div>`;
        document.getElementById('formOficio').reset();
        
    } catch (error) {
        console.error('Error completo:', error);
        msg.innerHTML = `<div class="alert alert-danger">❌ Error: ${error.message}<br><small>Revisa la consola (F12) para más detalles</small></div>`;
    } finally {
        // Reactivar botón
        btn.disabled = false;
        btn.innerHTML = 'Generar Oficio';
    }
});
