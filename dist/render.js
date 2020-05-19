class Renderer{
    renderData(_data) {
        const source = $('#song-template').html();
        const template = Handlebars.compile(source);
        $('#container').empty()
        console.log(_data)
        const newHTML = template(_data);
        $('#container').append(newHTML);
    }

    insertTranslate(text) {
        $('#lyrics').empty()
        let newHTML = " <h1>Lyrics</h1>"
        for(let line of text) {
            newHTML+=`<p>${line}</p>`
        }
        newHTML += "<button id ='removeTranslateBut'>Show Original Lyrics</button>"
        $('#lyrics').append(newHTML);
    }
}