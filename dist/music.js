class musicApp {

  constructor () {
  }

  async getSongData (song, singer) {
    const songInfo = await $.get(`/music/?singer=${singer}&song=${song}`) 
    if(songInfo=="Ho No! We couldn't find your song. Please try again.") {
      this.songData = songInfo
      return;
    }
    if (songInfo) {
      const bigArr = songInfo.recSongsArr
      const lenthOfall = bigArr.length

      const getRandom1 = Math.floor(Math.random() * lenthOfall)
      const getRandom2 = Math.floor(Math.random() * lenthOfall)
      const getRandom3 = Math.floor(Math.random() * lenthOfall)

      const firsttitle =bigArr[getRandom1].title
      const secondtitle =bigArr[getRandom2].title
      const thirdtitle = bigArr[getRandom3].title
      const firstpicUrl =bigArr[getRandom1].album.cover_medium
      const secondpicUrl =bigArr[getRandom2].album.cover_medium
      const thirdpicUrl = bigArr[getRandom3].album.cover_medium
      songInfo.recSongsArr = [
        {
          title: firsttitle,
          pic: firstpicUrl
        },
        {
          title: secondtitle,
          pic: secondpicUrl
        },
        {
          title: thirdtitle,
          pic: thirdpicUrl
        }
      ]
      this.songData = songInfo     
    }
  }

  async getTranslated (song, singer, to) {
    const text = await $.get(`/translate/?singer=${singer}&song=${song}&to=${to}`) 
    if (text) {
      this.translatedText = text
    }
  }


  async saveSong () {
    $.ajax({
      type: "POST",
      url: '/music',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(this.songData)
    })
  }


  async deleteSong (singer, song) {
    $.ajax({
      url: `/music/?singer=${singer}&song=${song}`,
      type: 'DELETE',
      success: function (result) {}
    })

  }
  
  async getFavorites () {
    const favSongsArr = await $.get('/songs')
    if (favSongsArr) {
      this.favorites = favSongsArr
    }
  }


}