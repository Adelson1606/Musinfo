const express = require('express')
const router = express.Router()
const request = require('axios')
// const gapi = require('googleapis')

const Music = require('../models/Music')

const googleApiParams = {
  maxResults: 1,
  part: 'snippet',
  type: 'video',
  key: 'AIzaSyDHn1socGyIKPmXU5VvisDMbZ9Sl4U3x70'
}


async function apiRequest (singer, song) {
  const q = singer + ' ' + song
  const qs = new URLSearchParams(googleApiParams).toString()
  const youtubereq = await request(`https://www.googleapis.com/youtube/v3/search?q=${q}&` + qs)
  const lyricreq = await request(`https://api.lyrics.ovh/v1/${singer}/${song}`)
  const deezerreq = await request(`https://api.deezer.com/search?q=${singer}`)
  const youtubedata = youtubereq.data.items[0]
  const lyricsString = lyricreq.data.lyrics
  const lyricsArrData = lyricsString.split(/\r?\n/) 
  const deezerArrData = deezerreq.data //need for making recomendations
  return { youtubedata, lyricsArrData, deezerArrData }
}


router.get('/music/', async function (req, res) {
  // const singer=req.params.singer
  const singer = req.query.singer.toLowerCase()
  const song = req.query.song.toLowerCase()
  const data = await apiRequest(singer, song)
    .catch(function (err) {
      console.error(err)
    })
  if (!data) {
    res.status(404).end()  
  }
  const songPreview = data.deezerArrData.data.find(s => s.title === (song.charAt(0).toUpperCase() + song.slice(1)))
  const songInfo = {
    name: data.youtubedata.snippet.title,
    songName: song,
    singerName: singer,
    lyricsArr: data.lyricsArrData,
    youTubeURL: data.youtubedata.id.videoId,
    youTubeTitle: data.youtubedata.snippet.title,
    preview: songPreview.preview
  }
  const lenthOfall = data.deezerArrData.data.length
  const getRandom1 = Math.floor(Math.random() * lenthOfall)
  const getRandom2 = Math.floor(Math.random() * lenthOfall)
  const getRandom3 = Math.floor(Math.random() * lenthOfall)

  const first = data.deezerArrData.data[getRandom1].title
  const second = data.deezerArrData.data[getRandom2].title
  const third = data.deezerArrData.data[getRandom3].title
  const recSongsArr = []
  recSongsArr.push(first, second, third)
  res.send({ songInfo, recSongsArr })
})


router.get('/songs', async function (req, res) {
  const songs = await Music.find({})
  res.send(songs)
})

router.post('/music', function (req, res) {
  const newSong = req.body
  const s = new Music(
    {
      name: newSong.youTubeTitle,
      songName: newSong.songName,
      singerName: newSong.singerName,
      lyricsArr: newSong.lyricsArr,
      youTubeURL: newSong.youTubeURL,
      youTubeTitle: newSong.youTubeTitle,
      preview: newSong.preview
    }
  )
  s.save()
    .then(function (newSong) {
      res.send(newSong)
    })
})

router.delete('/music/', async function (req, res) {
  const song = req.query.song
  const singer = req.query.singer

  Music.deleteOne({ $and: [{ songName: song }, { singerName: singer }] }, () => {
    console.log(song, '-', singer, "remover from data")
  }).then(function () {
    res.send("apocalypse!")
  })
}) 

module.exports = router