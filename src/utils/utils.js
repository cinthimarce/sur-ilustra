export function cargarDatosPagina(nombrePagina) {
    const datosGuardados = localStorage.getItem(nombrePagina);
    return datosGuardados ? JSON.parse(datosGuardados) : [];
}

export function guardarDatosPagina(nombrePagina, datos) {
    localStorage.setItem(nombrePagina, JSON.stringify(datos));
}