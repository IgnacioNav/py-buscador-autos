// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const preciomin = document.querySelector('#minimo');
const preciomax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');
const yearMax = new Date().getFullYear(); // nos trae el año actual
const yearMin = yearMax - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    preciomin : '',
    preciomax : '',
    puertas : '',
    transmision : '',
    color : '',
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar

    llenarSelect();
})

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    // Una vez que seleccionamos la marca, aplicamos filtro
    filtrarAuto();
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value); // El año lo pasamos a Int

    filtrarAuto();
})

preciomin.addEventListener('change', e => {
    datosBusqueda.preciomin = e.target.value;

    filtrarAuto();
})

preciomax.addEventListener('change', e => {
    datosBusqueda.preciomax = e.target.value;

    filtrarAuto();
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
})


// Funciones
function mostrarAutos(autos){

    // Elimina el HTML previo, antes de llenar con nueva info..
    limpiarHTML();

    autos.forEach( auto => {
        const { marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('tr');

        autoHTML.innerHTML = `
            <td>${marca}</td>
            <td>${modelo}</td>
            <td>${year}</td>
            <td>${precio}</td>
            <td>${puertas}</td>
            <td>${color}</td>
            <td>${transmision}</td>
        `;

        // Insertar en el html
        resultado.appendChild(autoHTML);
    })
}

// Limpiar HTML
function limpiarHTML() {
    while(resultado.firstChild){ 
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del select
function llenarSelect() {

    for(let i = yearMax; i >= yearMin; i--) { 
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion) // Agrega cada opcion de años al select
    }
}

// Filtra en base a la busqueda
function filtrarAuto() {

    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear).filter( filtrarMinimo).filter( filtrarMaximo).filter( filtrarPuertas).filter( filtrarTransmision).filter( filtrarColor);

    // Si hay algo en resultado, mostramos los autos
    if( resultado.length){  
        mostrarAutos(resultado);

    } else {
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('td');
    noResultado.classList.add('alerta', 'error');
    noResultado.setAttribute("colspan", 7);
    noResultado.textContent = 'No hay resultados para esta busqueda';
    resultado.appendChild(noResultado);
}

// Filtrar los automoviles existentes por marca
function filtrarMarca(auto) { 
    const { marca} = datosBusqueda;

    if (marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year} = datosBusqueda;

    if (year) {    
        return auto.year === year;   
    }
    return auto; 
}

function filtrarMinimo(auto) {
    const { preciomin} = datosBusqueda;

    if (preciomin) {
        return auto.precio >= preciomin;
    }
    return auto; 
}

function filtrarMaximo(auto) {
    const { preciomax} = datosBusqueda;

    if (preciomax) {    
        return auto.precio <= preciomax;
    }
    return auto; 
}

function filtrarPuertas(auto) {
    const { puertas} = datosBusqueda;

    if (puertas) {    
        return auto.puertas === puertas;   
    }
    return auto; 
}

function filtrarTransmision(auto) {
    const { transmision} = datosBusqueda;

    if (transmision) {    
        return auto.transmision === transmision;   
    }
    return auto; 
}

function filtrarColor(auto) {
    const { color} = datosBusqueda;

    if (color) {    
        return auto.color === color;   
    }
    return auto; 
}