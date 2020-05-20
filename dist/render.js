class Renderer {
  renderData (_data) {
    const source = $('#song-template').html()
    const template = Handlebars.compile(source)
    $('#container').empty()
    console.log(_data)
    const newHTML = template(_data)
    $('#container').append(newHTML)
  }

  insertTranslate (text,songName, singerName) {
    $('#lyrics').empty()
    let newHTML = ` <h1>${songName} - ${singerName}</h1>`
    for (const line of text) {
      newHTML += `<p>${line}</p>`
    }
    $('#lyrics').append(newHTML)
  }

  renderError (eroor) {
    const source = $('.error').html()
    const template = Handlebars.compile(source)
    const newHTML = template({ eroor })
    $('#header').append(newHTML)
    
  }

  renderRecomendations (recSongsArr) {
    const source = $('.recomendations').html()
    const template = Handlebars.compile(source)
    const newHTML = template({ recSongsArr })
    $('#container').append(newHTML)
  }

  renderFavorites(favSongsArr) {
     $('.favoritesMainContainer').empty()
     const source = $('.favorites').html()
     const template = Handlebars.compile(source)
     const newHTML = template({favSongsArr})
     $('#fcontainer').append(newHTML)
   }

   renderPop(popArr) {
    $('.popMainContainer').empty()
    const source = $('.pop').html()
    const template = Handlebars.compile(source)
    const newHTML = template({popArr})
    $('#pcontainer').append(newHTML)
  }

  renderHiphop(hiphopArr) {
    $('.hiphopMainContainer').empty()
    const source = $('.hiphop').html()
    const template = Handlebars.compile(source)
    const newHTML = template({hiphopArr})
    $('#hcontainer').append(newHTML)
  }

  renderRock(rockArr) {
    $('.rockMainContainer').empty()
    const source = $('.rock').html()
    const template = Handlebars.compile(source)
    const newHTML = template({rockArr})
    $('#rcontainer').append(newHTML)
  }

}