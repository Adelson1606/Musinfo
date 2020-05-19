class Renderer {
  renderData (_data) {
    const source = $('#song-template').html()
    const template = Handlebars.compile(source)
    $('#container').empty()
    console.log(_data)
    const newHTML = template(_data)
    $('#container').append(newHTML)
  }

  insertTranslate (text) {
    $('#lyrics').empty()
    let newHTML = " <h1>Lyrics</h1>"
    for (const line of text) {
      newHTML += `<p>${line}</p>`
    }
    $('#lyrics').append(newHTML)
  }

  renderError (eroor) {
    const source = $('.error').html()
    const template = Handlebars.compile(source)
    const newHTML = template({ eroor })
    $('#container').append(newHTML)
  }
}