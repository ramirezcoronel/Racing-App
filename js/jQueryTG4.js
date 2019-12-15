$(document).ready(function (){

  carrera($('#bCarro1'))
  carrera($('#bCarro2'))

  $('#bJugar').click(function () {
    comenzarCarrera()
  })

})

//Closure para reutilizar un contador
function carrera (el) {
  let contador = 0
  let id = $(el).attr('id').slice(-1) //obtengo el ultimo numero de su id

  //cuando den click en el boton
  $(el).click(function() {
    seleccionDeCarro()
    habilitar($('#bOk' + id))
  })

  $('#bOk' + id).click(function ()  {
    let nuevoSrc = $('#miCarrera').attr('src')
    let pista = $('#pista'+id+' img').first()

    cambiarImagen(pista, nuevoSrc)
    //como ya se asigno la pista se asigna el estado listo
    $('#pista'+id).data('estado', 'listo');
    deshabilitar($(this))
    deshabilitar($(el))

    if ( yaEstanEnLaPista() ) {
      habilitar($('#bJugar'))
    }

  })

  //Recorrer array de carros y mostrar previsualizacion
  function seleccionDeCarro() {
    if(contador >= $('.carros').length){
      contador = 0
    }
    let nuevoSrc = $('.carros')[contador]

    cambiarImagen( $('#miCarrera'), $(nuevoSrc).attr('src') )
    contador++
  }
}


//Funciones
function yaEstanEnLaPista() {
  let c = 1
  let errores = 0

  while ( $('#pista' + c).attr('id') ) {
    //Si el estado de todas las pista es "listo"
    if ( !$('#pista' + c).data('estado') ) {
      errores++
    }
    c++
  }

  if ( errores ) {
    return false
  } else {
    return true;
  }
}

function cambiarImagen(el, src) {
  $(el).attr('src',src);
}

function habilitar (el) {
  if ($(el).attr('disabled')) {
    $(el).removeAttr('disabled')
  }
}
function deshabilitar  (el) {
  if (!$(el).attr('disabled')) {
    $(el).attr('disabled', 'disabled')
  }
}

//Una vez inicia la carrera
function comenzarCarrera () {

  let pistas = obtenerPistas()

  $(pistas).each(function (index, pista) {

    animarCarrera($(this).children(), 500)
  })

}

function animarCarrera(arrays, tiempo) {
  let contador = 0;

  let animacion = setInterval(animar, tiempo);

  function animar () {
    let frameAuxiliar = $(arrays[contador + 1]).attr("src")
    $(arrays[contador + 1]).attr("src", $(arrays[contador]).attr('src'))
    $(arrays[contador]).attr("src", frameAuxiliar)
    contador++
    console.log('holaaa')
    if ( contador === $(arrays).length -1)
    detenerAnimacion()
  }

  function detenerAnimacion() {
    clearInterval(animacion)
  }
}


function obtenerPistas () {
  let cantidadDePistas = 1
  let contador = 0
  let pistas = []
  while ($('#pista' + cantidadDePistas).attr('id')) {

    pistas[contador] = $('#pista' + cantidadDePistas)
    cantidadDePistas++
    contador++
  }
  return pistas
}
