$(document).ready(function (){

  setMetas()

  carrera($('#bCarro1'))
  carrera($('#bCarro2'))

  $('#bJugar').click(function () {
    comenzarCarrera()
    deshabilitar($(this));
  })

  $('#bReset').click( function () {
    resetear()
  } )


enPista()
})
/********************************************************************************

                    FUNCION PRINCIPAL

********************************************************************************/
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
    //Se desabilita el poder volver a elegir jugador
    deshabilitar($(this)) 
    deshabilitar($(el))

    if ( enPista() ) {
      //Si todos los jugadores estan en pista
      //que se habilite la opcion de jugar
      habilitar($('#bJugar'))
      enPista()
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

//Una vez inicia la carrera
function comenzarCarrera () {

  let pistas = getPistas()

  $(pistas).each(function (index, pista) {
    let concursante = $(this).children()[0]
      animarCarrera($(this), (Math.floor(Math.random() * 4) + 1) * 100)
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

  function hayGanadores () {
    let pistas = getPistas()

    let ganador = 0

    $(pistas).each(function(){
      if($(this).data('ganador')) {
        ganador++
      }
    })

    return ganador
  }


  $('#bReset').click( function () {
      clearInterval(animacion)
  })
}


/********************************************************************************

                  FUNCION PARA RESETEAR

********************************************************************************/
function resetear () {
  pistas = getPistas()

  function rPista() {
    $(pistas).each(function (indice, elemento) {
      let pista = $(elemento).children()
      let cantidadDePistas = $(pista).length
      let posicion = indice + 1

      $(pista).each(function(indice, carril) {
        $(carril).attr('src', 'imagenes/pista'+ posicion+ '.jpg')
        if ($(carril).data('meta')) {
          $(carril).attr('src', 'imagenes/meta.jpg')
        }
      })


      $(pista[0]).attr('src', 'imagenes/Select'+ posicion +'.jpg')
      $(pista[ cantidadDePistas - 1 ]).attr('src', 'imagenes/meta.jpg')

      $(elemento).removeData('ganador')

      $(elemento).removeData('estado')
      $(pista[ cantidadDePistas - 1 ]).removeData('estado')
    })
  }

  function resetearCarros() {
    habilitar($('#bCarro1'))
    habilitar($('#bCarro2'))
    deshabilitar($('#bJugar'))
  }

  function resetarGanador() {
    $('#miCarrera').attr('src', 'imagenes/carreraAuto.jpg')
  }
  resetearCarros()
  rPista()
  resetarGanador()
}


/************************************************************************

              FUNCIONES DE AYUDA

**************************************************************************/

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

//NEW FUNCTION

function enPista() {
  const pistas = getPistas()
  let estadoDePistas = $(pistas).filter((index, el)=> $(el).data('estado')).length

  return estadoDePistas === pistas.length ? true : false
}

function getPistas () {
  const pistas = $('.pista').filter((index, el)=> $(el).data('meta')).parent()
  return pistas
}

function setMetas() {
  let pistas = $('.pista').filter((index, el)=> $(el).attr('src') === 'imagenes/meta.jpg').parent()
  let carriles = pistas.children()
  let metas = $(carriles).filter((i, el)=> $(el).attr('src') == 'imagenes/meta.jpg')

  $(metas).each((i, el)=> $(el).data('meta', 'true'))
}
