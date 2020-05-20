class musicApp {

  constructor () {
  }

  async getSongData (song, singer) {
    const songInfo = await $.get(`/music/?singer=${singer}&song=${song}`) 
    if (songInfo) {
      this.songData = songInfo     
    }
  }

  async getTranslated (song, singer, to) {
    const text = await $.get(`/translate/?singer=${singer}&song=${song}&to=${to}`) 
    if (text) {
      this.translatedText = text
    }
  }


  async saveSong() {
    $.ajax({
      type: "POST",
      url: '/music',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(this.songData)
    })
  }


  async deleteSong(singer,song) {
    $.ajax({
      url: `/music/?singer=${singer}&song=${song}`,
      type: 'DELETE',
      success: function (result) {}
  });

  }
  
  async getFavorites() {
    const favSongsArr = await $.get('/songs/?category=favorites')
    if (favSongsArr) {
      this.favorites = favSongsArr
    }
  }
  
  async getPop() {
    const PopArr = await $.get('/songs/?category=pop')
    if (PopArr) {
      this.pop = PopArr
    }
  }

  async getHiphop() {
    const hiphopArr = await $.get('/songs/?category=hiphop')
    if (hiphopArr) {
      this.hiphop = hiphopArr
    }
  }

  async getRock() {
    const rockArr = await $.get('/songs/?category=rock')
    if (rockArr) {
      this.rock = rockArr
    }
  }

}