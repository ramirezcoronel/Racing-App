$(document).ready(function (){

  let contador = 0

  $('#bCarro1').click(function () {
    habilitar($('#bOk1'))
    deshabilitar($('#bCarro2'))
    seleccionDeCarro()
  })

  $('#bOk1').click(function () {
    let nuevoSrc = $('#miCarrera').attr('src')
    let pista = $('#pista1 img').first()

    cambiarImagen(pista, nuevoSrc)
    deshabilitar($(this))
    habilitar($('#bCarro2'))
})

  $('#bOk2').click(function () {
    let nuevoSrc = $('#miCarrera').attr('src')
    let pista = $('#pista2 img').first()

    cambiarImagen(pista, nuevoSrc)
    deshabilitar($(this))
  })

  $('#bCarro2').click(function () {
    deshabilitar($('#bCarro1'))
    habilitar($('#bOk2'))

    seleccionDeCarro()
  })

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

  function seleccionDeCarro() {
    if(contador >= $('.carros').length){
      contador = 0
    }
    let nuevoSrc = $('.carros')[contador]

    cambiarImagen( $('#miCarrera'), $(nuevoSrc).attr('src') )
    contador++
  }

  function cambiarImagen(el, src) {
    $(el).attr('src',src);
  }
})
