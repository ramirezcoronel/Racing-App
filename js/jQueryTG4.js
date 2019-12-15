$(document).ready(function (){

  carrera($('#bCarro1'))
  carrera($('#bCarro2'))

})

//Closure para reutilizar un contador
function carrera (el) {
  let contador = 0
  let id = $(el).attr('id').slice(-1) //obtengo el ultimo numero de su id

  //cuando den click en el boton
  $(el).click(function() {
    seleccionDeCarro()
  })

  $('#bOk' + id).click(function () ) {
    
  }

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

function cambiarImagen(el, src) {
  $(el).attr('src',src);
}
