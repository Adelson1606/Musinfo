const App = new musicApp()
const renderer = new Renderer()
const render = renderer.renderData
const renderErr = renderer.renderError
const renderRecomendations = renderer.renderRecomendations
const renderUser = renderer.renderPlaylist

const renderFavorites = renderer.renderFavorites
const renderPop = renderer.renderPop
const renderHiphop = renderer.renderHiphop
const renderRock = renderer.renderRock

async function showFavFromDB () {
  await App.getFavorites()
  renderFavorites(App.favorites)
}

async function showPopFromDB () {
  await App.getPop()
  renderPop(App.pop)
}

async function showHiphopFromDB () {
  await App.getHiphop()
  renderHiphop(App.hiphop)
}

async function showRockFromDB () {
  await App.getRock()
  renderRock(App.rock)
}
async function showFromDB (nameOfCategory) {
  await App.getUserPlaylist(nameOfCategory)
  renderUser(App[nameOfCategory])
}


const handleSearch = async function (songName, singerName) {
  $(`.err`).empty()
  await App.getSongData(songName, singerName)
  if (App.songData === "Ho No! We couldn't find your song. Please try again.") {
    renderErr(App.songData)
  } else {
    render(App.songData)
    renderRecomendations(App.songData.recSongsArr)
    await App.getFavorites()
    renderFavorites(App.favorites)
    renderPop(App.pop)
    renderHiphop(App.hiphop)
    renderRock(App.rock)
  }
}

const handleTraanslate = async function (songName, singerName, to) {
  await App.getTranslated(songName, singerName, to)
  renderer.insertTranslate(App.translatedText, songName, singerName)
}

const handleDeleteFromFav = async function (singer, song) {
  await App.deleteSong(singer, song)
  await App.getFavorites()
  await App.getPop()
  await App.getRock()
  await App.getHiphop()
  renderFavorites(App.favorites)
  renderPop(App.pop)
  renderHiphop(App.hiphop)
  renderRock(App.rock)
}


$('#button').on('click', function () {
  const songName = $('#songIn').val()
  const singerName = $('#artistIn').val()
  if (songName && singerName) {
    handleSearch(songName, singerName)
  }
})



$('#container').on('click', '#he', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleTraanslate(songName, singerName, 'he')
})

$('#container').on('click', '#ru', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleTraanslate(songName, singerName, 'ru')
})


$('#container').on('click', '#ar', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleTraanslate(songName, singerName, 'ar')
})


$('#container').on('click', '#es', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleTraanslate(songName, singerName, 'es')
})

$('#container').on('click', '#fr', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleTraanslate(songName, singerName, 'fr')
})
$('#container').on('click', '#en', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleTraanslate(songName, singerName, 'en')
})


const handleleCategory = async function (category) {
  App.songData.category = category
  await App.saveSong()
}


// const handleFavorite = async function () {
//   App.songData.category = "favorites"
//   await App.saveSong()
// }

// const handlePop = async function () {
//   App.songData.category = "pop"
//   await App.saveSong()
// }


// const handleHiphop = async function () {
//   App.songData.category = "hiphop"
//   await App.saveSong()
// }

// const handleRock = async function () {
//   App.songData.category = "rock"
//   await App.saveSong()
// }


$('#container').on('click', '#favoriteBar', function () {
  handleleCategory("favorites")
  showFavFromDB()
})


$('#container').on('click', '#hiphopBar', function () {
  handleleCategory("hiphop")
  showHiphopFromDB()
})

$('#container').on('click', '#popBar', function () {
  handleleCategory("pop")
  showPopFromDB()
})

$('#container').on('click', '#rockBar', function () {
  handleleCategory("rock")
  showRockFromDB()
})

$('#container').on('click', '#createPlaylistBtn', function () {
  const nameOfPlaylist = $('#nameofnewplaylist').val()
  handleleCategory(nameOfPlaylist)
  showFromDB(nameOfPlaylist)
})

$('#container').on('click', '.recSong', function () {
  const songName = $(this).text()
  const singerName = $('#artistIn').val()
  handleSearch(songName, singerName)
})


$('.cont').on('click', '.favSong', function () {
  const songName = $(this).text().split('-')[1]
  const singerName = $(this).text().split('-')[0]
  handleSearch(songName, singerName)
})


// $('.cont').on('click', '.remove', function () {
//   const FullInfo = $(this).closest('.favoriteLine').find('.favSong').text().split('-')
//   const singer = FullInfo[0]
//   const song = FullInfo[1]
//   handleDeleteFromFav(singer, song)
// })

$('#fcontainer').on('click', '.remove', function () {
  const FullInfo = $(this).closest('.favoriteLine').find('.favSong').text().split('-')
  const singer = FullInfo[0]
  const song = FullInfo[1]
  handleDeleteFromFav(singer, song)
})

$('#pcontainer').on('click', '.remove', function () {
  const FullInfo = $(this).closest('.favoriteLine').find('.favSong').text().split('-')
  const singer = FullInfo[0]
  const song = FullInfo[1]
  handleDeleteFromFav(singer, song)
})

$('#rcontainer').on('click', '.remove', function () {
  const FullInfo = $(this).closest('.favoriteLine').find('.favSong').text().split('-')
  const singer = FullInfo[0]
  const song = FullInfo[1]
  handleDeleteFromFav(singer, song)
})

$('#hcontainer').on('click', '.remove', function () {
  const FullInfo = $(this).closest('.favoriteLine').find('.favSong').text().split('-')
  const singer = FullInfo[0]
  const song = FullInfo[1]
  handleDeleteFromFav(singer, song)
})

$('#ucontainer').on('click', '.remove', async function () {
  const FullInfo = $(this).closest('.favoriteLine').find('.favSong').text().split('-')
  const playList = $(this).closest('.userMainContainer').find('h1').text().split(' ')[0]
  const singer = FullInfo[0]
  const song = FullInfo[1]
  await App.deleteSong(singer, song)
  await App.getUserPlaylist(playList)
  renderUser(App[playList])

})

$('#container').on('click','#shuffleBar',function () {
  const favoritesLength  =  App.favorites.length})

$('#ucontainer').on('click', '.favSong', function () {
  const songName = $(this).text().split('-')[1]
  const singerName = $(this).text().split('-')[0]
  handleSearch(songName, singerName)
})


$('#fcontainer').on('click', '#shuffleBar', function () {
  const favoritesLength = App.favorites.length
  const randomIndex = Math.floor(Math.random() * favoritesLength)
  const songName = App.favorites[randomIndex].songName
  const singerName = App.favorites[randomIndex].singerName
  handleSearch(songName, singerName)
})



$('#container').on('click', '.otherRec', function () {
  const songName = App.songData.songInfo.songName
  const singerName = App.songData.songInfo.singerName
  handleSearch(songName, singerName)
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

showFavFromDB()
showPopFromDB()
showRockFromDB()
showHiphopFromDB()