const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rockSchema = new Schema({
  name: String,
  songName: String,
  singerName: String,
  lyricsArr: Array,
  youTubeURL: String,
  youTubeTitle: String,
  preview: String
})
const Rock = mongoose.model("rocks", rockSchema)


module.exports = Rock