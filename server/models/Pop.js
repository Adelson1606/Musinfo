const mongoose = require('mongoose')
const Schema = mongoose.Schema

const popSchema = new Schema({
  name: String,
  songName: String,
  singerName: String,
  lyricsArr: Array,
  youTubeURL: String,
  youTubeTitle: String,
  preview: String
})
const Pop = mongoose.model("pops", popSchema)


module.exports = Pop