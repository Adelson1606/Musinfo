const App = new musicApp()
const renderer = new Renderer()
const render = renderer.renderData
const renderErr = renderer.renderError


const handleSearch = async function (songName, singerName) {
  await App.getSongData(songName, singerName)
  if (App.songData === "Sorry, we can't find it. Try another song") {
    renderErr(App.songData)
  } else {
    render(App.songData) 
  }
}

const handleTraanslate = async function (songName, singerName) {
  await App.getTranslated(songName, singerName)
  renderer.insertTranslate(App.translatedText)
}


$('#button').on('click', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  if (songName && singerName) {
    handleSearch(songName, singerName) 
  }
})


$('#container').on('click', '#translateBut', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  handleTraanslate(songName, singerName)
})


$('#container').on('click', '#removeTranslateBut', function () {
  render(App.songData)
})





document.getElementById('artistIn').addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault()
    // Trigger the button element with a click
    document.getElementById('button').click()
  }
})