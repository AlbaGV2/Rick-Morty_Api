//Constantes
const urlBase = "https://rickandmortyapi.com/api";
const input = document.getElementById("personajeId");
const botonBuscar = document.getElementById("btnBuscar");
const botonLimpiar = document.getElementById("limpiarTodo");
const resultado = document.getElementById("resultadoFinal");
const MAXpersonajes = 826;

//Funciones comunes

//funcion para limpiar los datos
function limpiarResultado(){
    resultado.innerHTML = "";
}

function limpiarTodo(){
    limpiarResultado();
    input.value = "";
}

//renderizar datos
function pintarDatos(datos){
    resultado.innerHTML = `
        <p>Nombre: ${datos.name}</p>
        <p>Estado: ${datos.status}</p>
        <p>Especie: ${datos.species}</p>
        <p>Origen: ${datos.type}</p>
        <img src="${datos.image}">  
        <p>PrimerEpisodio: ${datos.episode}</p>
    `;
}

//Funcion validar input
function validarId(){
    const valorId = input.value.trim();

    //1.Si no es válido..
    if(!valorId){
        resultado.innerText = "Introduce un ID numerico.";
        
    }
    //2.Si no es un numero..
    if(valorId == isNaN) {
        resultado.innerText = "Introduce un Id solo formado por numeros.";
        
    }

    //Si es válido.. y esta en el rango
    if(valorId > 0 && valorId < MAXpersonajes) {
        return valorId;
    }

    //Si no, 
    else {
        resultado.innerText = "Introduce un numero entre 1 y 826.";
    }

}

//Funcion para obtener Datos
async function fetchJson(urlBase) {
    const res = await fetch(urlBase);
        if(!res.ok){
            resultado.innerText = "Algo falló al conectarse a la Api";
        }
        return await res.json();
}

//Funcion Principal
async function buscarPersonaje() {
    //1.Limpiar resultado
    limpiarResultado();

    //2.verificar input
    const idValidado = validarId();

    //Si el id no se validado correctamente
    if(!idValidado){
        //resultado.innerText = "Introduce un Id válido";
        return;
    }
        //Si funciona monto la URL
        const urlMontada = `${urlBase}${idValidado}`;

        try{
            //Le mandamos la URL montada y pintamos los datos
            const datos = await fetchJson(urlMontada)
                if(datos.ok){
                    const dstod2 = await fetchJson();
                    if(!datos){
                        resultado.innerText = "Fallo en la segunda llamada";
                    }
            else {
                pintarDatos(datos)
            }
                }
        }catch(error){
            if(error.status === 404){
                resultado.innerText = "Pagina no encontrada."
            }else{
            resultado.innerText = "No se pudo conectar a la API";
            }
        }
    }
    

//EVENTOS
botonBuscar.addEventListener("click", buscarPersonaje);
botonLimpiar.addEventListener("click", limpiarTodo);

//