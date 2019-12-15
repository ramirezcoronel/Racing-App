$(document).ready(function (){

  let counter = 0

  $('#bCarro1').click(function () {
    if(counter >= $('.carros').length){
      counter = 0
    }
    let nuevoSrc = $('.carros')[counter]

    cambiarImagen( $('#miCarrera'), $(nuevoSrc).attr('src') )
    counter++
  })

  function cambiarImagen(el, src) {
    el.attr('src',src);
  }
})
