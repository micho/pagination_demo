var content = "El universo (que otros llaman la Biblioteca) se componte de un número indefinido, y tal vez infinito, de galerías hexagonales, con vastos pozos de ventilación en el medio, cercados por barandas bajísimas. Desde cualquier hexágono se ven los pisos inferiores y superiores: interminablemente. La distribución de las galerías es invariable. Veinte anaqueles, a cinco largos anaqueles por lado, cubren todos los lados menos dos; su altura, que es la de los pisos, excede apenas la de un bibliotecario normal. Una de las caras libres da a un angosto zaguán, que desemboca en otra galería, idéntica a la primera y a todas. A izquierda y a derecha del zaguán hay dos gabinetes minúsculos. Uno permite dormir de pie; otro, satisfacer las necesidades finales. Por ahí pasa la escalera espiral, que se abisma y se eleva hacia lo remoto. En el zaguán hay un espejo, que fielmente duplica las apariencias. Los hombres suelen inferir de ese espejo que la Biblioteca no es infinita (si lo fuera realmente ¿a qué esa duplicación ilusoria?); yo prefiero soñar que las superficies bruñidas figuran y prometen el infinito... La luz procede de unas frutas esféricas que llevan el nombre de lámparas. Hay dos en cada hexágono: transversales. La luz que emiten es insuficiente, incesante.\n\nComo todos los hombres de la Biblioteca, he viajado en mi juventud; he peregrinado en busca de un libro, acaso del catálogo de catálogos; ahora que mis ojos casi no pueden descifrar lo que escribo, me preparo a morir a unas pocas leguas del hexágono en que nací. Muerto, no faltarán manos piadosas que me tiren por la baranda; mi sepultura será el aire insondable; mi cuerpo se hundirá largamente y se corromperá y disolverá en el viento engendrado por la caída, que es infinita. Yo afirmo que la Biblioteca es interminable. Los idealistas arguyen que las salas hexagonales son una forma necesaria del espacio absoluto o, por lo menos, de nuestra intuición del espacio. Razonan que es inconcebible una sala triangular o pentagonal. (Los místicos pretenden que el éxtasis les revela una cámara circular con un gran libro circular de lomo continuo, que da toda la vuelta de las paredes; pero su testimonio es sospechoso; sus palabras, oscuras. Ese libro cíclico es Dios.) Básteme, por ahora, repetir el dictamen clásico: La Biblioteca es una esfera cuyo centro cabal es cualquier hexágono, cuya circunferencia es inaccesible.\n\n A cada uno de los muros de cada hexágono corresponden cinco anaqueles; cada anaquel encierra treinta y dos libros de formato uniforme; cada libro es de cuatrocientas diez páginas; cada página, de cuarenta renglones; cada renglón, de unas ochenta         letras de color negro. También hay letras en el dorso de cada libro; esas letras no indican o prefiguran lo que dirán las páginas. Sé que esa inconexión, alguna vez, pareció misteriosa. Antes de resumir la solución (cuyo descubrimiento, a pesar de sus trágicas proyecciones, es quizá el hecho capital de la historia) quiero rememorar algunos axiomas.\n\nEl primero: La Biblioteca existe ab alterno. De esa verdad cuyo colorario inmediato es la eternidad futura del mundo, ninguna mente razonable puede dudar. El hombre, el imperfecto bibliotecario, puede ser obra del azar o de los demiurgos malévolos; el universo, con su elegante dotación de anaqueles, de tomos enigmáticos, de infatigables escaleras para el viajero y de letrinas para el bibliotecario sentado, sólo puede ser obra de un dios. Para percibir la distancia que hay entre lo divino y lo humano, basta comparar estos rudos símbolos trémulos que mi falible mano garabatea en la tapa de un libro, con las letras orgánicas del interior: puntuales, delicadas, negrísimas, inimitablemente simétricas."

Pagination = {
  split_by_sentence: function(content) {
    return "<span>"+content.gsub(/\. /, ".</span> <span>")+"</span>"
  },
  paginate: function() {
    var display_height = $('page_container').measure('height')
    $$("#page_container span").each( function(span){
      if (span.measure('top') + span.measure('height') >= display_height)
        span.hide()
      else
        span.className = "read"
    })
  },
  nextPage: function() {
    var spans = $$('span'),
        read_spans = $$('span.read')
    spans.invoke('show')
    read_spans.invoke('hide')
    Pagination.paginate()
    if (spans.length == read_spans.length)
      this.load()
  },
  load: function(element) {
    this.element = this.element || element
    this.element.innerHTML = Pagination.split_by_sentence(content)
    Pagination.paginate()
  }
}

document.on("dom:loaded", function() {
  Pagination.load($('page_container'))
})

document.on("click", "a.next_page", function(e) {
  e.stop()
  Pagination.nextPage()
})

document.on("keydown", function(e) {
  if (e.keyCode == Event.KEY_RIGHT) {
    Pagination.nextPage()
    e.stop()
  } else if (e.keyCode == Event.KEY_LEFT) {
    Pagination.prevPage()
    e.stop()
  }
})
