$(document).ready(function (){

  carrera($('#bCarro1'))
  carrera($('#bCarro2'))

  $('#bJugar').click(function () {
    comenzarCarrera()
    deshabilitar($(this));
  })

  $('#bReset').click( function () {
    resetear()
  } )
})




function resetear () {
  pistas = obtenerPistas()

  function resetearPista() {
    $(pistas).each(function (indice, elemento) {
      let pista = $(elemento[0]).children()
      let cantidadDePistas = $(pista).length
      let posicion = indice + 1

      $(pista).each(function(indice, carril) {
        $(carril).attr('src', 'imagenes/pista'+ posicion+ '.jpg')
      })

      $(elemento[0]).attr('src', 'imagenes/Select'+ posicion +'.jpg')
      $(pista[ cantidadDePistas - 1 ]).attr('src', 'imagenes/meta.jpg')

      $(elemento[0]).removeData('estado')
      $(pista[ cantidadDePistas - 1 ]).removeData('estado')
    })
  }

  function resetearCarros() {
    habilitar($('#bCarro1'))
    habilitar($('#bCarro2'))
    deshabilitar($('#bJugar'))
  }

  resetearCarros()
  resetearPista()
}



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
    cambiarImagen($('#miCarrera'), 'imagenes/carreraAuto.jpg')
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


//Una vez inicia la carrera
function comenzarCarrera () {

  let pistas = obtenerPistas()

  $(pistas).each(function (index, pista) {
    let concursante = $(this).children()[0]
    let modoRapidin = 2;

    if ($(concursante).attr('src') == 'imagenes/costa-rica.gif') {
      animarCarrera($(this), modoRapidin)
    } else {
      animarCarrera($(this), (Math.floor(Math.random() * 4) + 1) * 150)
    }


  })

}

function animarCarrera(el, tiempo) {
  let contador = 0;
  let arrays = $(el).children()

  let animacion = setInterval(animar, tiempo);

  function animar () {
    let frameAuxiliar
    if(contador === $(arrays).length -2) {
       frameAuxiliar = $(arrays[contador -1]).attr("src")
    } else {
       frameAuxiliar = $(arrays[contador + 1]).attr("src")
    }


    $(arrays[contador + 1]).attr("src", $(arrays[contador]).attr('src'))
    $(arrays[contador]).attr("src", frameAuxiliar)
    contador++

    if ( contador === $(arrays).length -1){

      detenerAnimacion(arrays[contador])
    }

  }

  function detenerAnimacion(ganador) {
    if ( hayGanadores() ) {

    } else {
      $(el).data('ganador', 'si')
      $('#miCarrera').attr('src', $(ganador).attr('src'))
    }


  }

  $('#bReset').click( function () {
      clearInterval(animacion)
  })
}


function hayGanadores () {
  let pistas = obtenerPistas()

  let ganador = 0

  $(pistas).each(function(){
    if($(this).data('ganador')) {
      ganador++
    }
  })

  return ganador
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
function yaEstanEnLaPista() {
  let c = 1
  let errores = 0

  while ( $('#pista' + c).attr('id') ) {
    //Si el estado de todas las pista es "listo"
    console.log($('#pista' + c).data('estado'))
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
