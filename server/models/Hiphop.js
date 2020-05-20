const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hiphopSchema = new Schema({
  name: String,
  songName: String,
  singerName: String,
  lyricsArr: Array,
  youTubeURL: String,
  youTubeTitle: String,
  preview: String
})
const Hiphop = mongoose.model("hiphops", hiphopSchema)


module.exports = Hiphop