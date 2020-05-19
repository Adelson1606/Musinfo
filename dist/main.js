const App = new musicApp()
const renderer = new Renderer()
const render = renderer.renderData
const renderErr = renderer.renderError
const renderRecomendations = renderer.renderRecomendations

const renderFavorites = renderer.renderFavorites


const handleSearch = async function (songName, singerName) {
  await App.getSongData(songName, singerName)
  if (App.songData === "Sorry, we can't find it. Try another song") {
    renderErr(App.songData)
  } else {
    render(App.songData)
    renderRecomendations(App.songData.recSongsArr)
    await App.getFavorites()
    renderFavorites(App.favorites)
  }
}

const handleTraanslate = async function (songName, singerName, to) {
  await App.getTranslated(songName, singerName, to)
  renderer.insertTranslate(App.translatedText)
}


$('#button').on('click', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  if (songName && singerName) {
    handleSearch(songName, singerName)
  }
})



$('#container').on('click', '#he', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  handleTraanslate(songName, singerName, 'he')
})

$('#container').on('click', '#ru', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  handleTraanslate(songName, singerName, 'ru')
})


$('#container').on('click', '#ar', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  handleTraanslate(songName, singerName, 'ar')
})


$('#container').on('click', '#es', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  handleTraanslate(songName, singerName, 'es')
})

$('#container').on('click', '#fr', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  handleTraanslate(songName, singerName, 'fr')
})


const handleFavorite = async function () {
  await App.saveSong()
}

$('#container').on('click', '#favBut', function () {
  handleFavorite()
})

$('#container').on('click', '.recSong', function () {
  const songName = $(this).text()
  const singerName = $('#artistIn').val()
  handleSearch(songName, singerName)
})

// two blocks the same? do we remove it? ####
$('#container').on('click', '.favSong', function () {
  const songName = $(this).text().split('-')[1]
  const singerName = $(this).text().split('-')[0]
  handleSearch(songName, singerName)
})


async function showFavFromDB() {
  await App.getFavorites()
  renderFavorites(App.favorites)
}

document.getElementById('artistIn').addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault()
    // Trigger the button element with a click
    document.getElementById('button').click()
  }
})

showFavFromDB()