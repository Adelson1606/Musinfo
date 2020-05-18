const mongoose = require('mongoose')
const Schema = mongoose.Schema

const musicSchema = new Schema({
  name: String,
  songName: String,
  singerName: String,
  lyricsArr: Array,
  youTubeURL: String,
  youTubeTitle: String,
  preview: String
})
const Music = mongoose.model("musics", musicSchema)


module.exports = Music