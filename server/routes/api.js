const express = require('express')
const router = express.Router()
const request = require('axios')

const Music = require('../models/Music')


const googleApiParams = {
  maxResults: 1,
  part: 'snippet',
  type: 'video',
  key: 'AIzaSyAl_etB-VBnzxNy68QCaOHTWis2m5oH-L0'
}

const getYandexParams = function (to) {
  return {
    lang: `${to}`,
    options: 1,
    key: 'trnsl.1.1.20200518T065621Z.ed83ca0e1dd27529.8800a647be442891e8c11a0d364f2d809488a75d'
  }
}

async function apiTranslate (lyrics, to) {
  const textForTranslate = encodeURIComponent(lyrics)
  const qs = new URLSearchParams(getYandexParams(to)).toString()
  const yandexreq = await request(`https://translate.yandex.net/api/v1.5/tr.json/translate?${qs}&text=${textForTranslate}`)
  const translatedText = yandexreq.data.text
  return (translatedText)
}

router.get('/translate', async function (req, res) {
  const singer = req.query.singer.toLowerCase()
  const song = req.query.song.toLowerCase()
  const to = req.query.to.toLowerCase()
  const lyricreq = await request(`https://api.lyrics.ovh/v1/${singer}/${song}`)
  const lyricsString = lyricreq.data.lyrics
  const data = await apiTranslate(lyricsString, to)
  const lyricsArrData = data[0].split(/\r?\n/)
  res.send(lyricsArrData)
})

const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

async function apiRequest (singer, song) {
  const q = singer + ' ' + song
  const qs = new URLSearchParams(googleApiParams).toString()
  // const youtubereq = await request(`https://www.googleapis.com/youtube/v3/search?q=${q}&` + qs)
  //  const youtubereq = await request('https://www.youtube.com/watch?v=YQHsXMglC9A')
  const lyricreq = await request(`https://api.lyrics.ovh/v1/${singer}/${song}`)
  const deezerreq = await request(`https://api.deezer.com/search?q=${singer}`)
  //const youtubedata = youtubereq.data.items[0]
  const youtubedata = {
    id: {
      videoId: 'YQHsXMglC9A'
    },
    snippet: {
      title: 'It is not ok youtube'
    }
  } 
 
  const lyricsString = lyricreq.data.lyrics
  const lyricsArrData = lyricsString.split(/\r?\n/)
  const deezerArrData = deezerreq.data 
  return {
    youtubedata,
    lyricsArrData,
    deezerArrData
  }
}


router.get('/music/', async function (req, res) {
  const singer = req.query.singer.toLowerCase()
  const song = req.query.song.toLowerCase()
  const errMessage = "Ho No! We couldn't find your song. Please try again."
  const data = await apiRequest(singer, song)
    .catch(function (err) {
      //console.error(err)
    })
  if (!data) {
    res.send(errMessage)
  } else {
    const songPreview = data.deezerArrData.data.find(s => s.title === toTitleCase(song))
    const songInfo = {
      name: data.youtubedata.snippet.title,
      songName: song,
      singerName: singer,
      lyricsArr: data.lyricsArrData,
      youTubeURL: data.youtubedata.id.videoId,
      youTubeTitle: data.youtubedata.snippet.title
    }
    if (songPreview) {
      songInfo.preview = songPreview.preview
    } else {
      songInfo.preview = 'https://cdns-preview-1.dzcdn.net/stream/c-13039fed16a173733f227b0bec631034-10.mp3'
    }
    const recSongsArr = data.deezerArrData.data
    res.send({
      songInfo,
      recSongsArr
    })
  }
})



router.get('/songs', async function (req, res) {
  const category = req.query.category.toLowerCase()
  const songs = await Music.find({ category: category })

  res.send(songs)
})

router.post(`/music/`, async function (req, res) {
  const newSong = req.body

  const s = new Music({
    name: newSong.songInfo.youTubeTitle,
    songName: newSong.songInfo.songName,
    singerName: newSong.songInfo.singerName,
    lyricsArr: newSong.songInfo.lyricsArr,
    youTubeURL: newSong.songInfo.youTubeURL,
    youTubeTitle: newSong.songInfo.youTubeTitle,
    preview: newSong.songInfo.preview,
    category: newSong.category
  })
  const isExist = await Music.find({
    $and: [{
      songName: newSong.songInfo.songName
    }, {
      singerName: newSong.songInfo.singerName
    }, {
      category: newSong.category
    }
    ]
  })
  if (isExist.length === 0) {
    s.save()
    res.send(newSong)
  } else {
    res.end()
  }


})

router.delete('/music/', async function (req, res) {
  const song = req.query.song
  const singer = req.query.singer

  Music.deleteOne({
    $and: [{
      songName: song
    }, {
      singerName: singer
    }]
  }, () => {
    //console.log(song, '-', singer, "remover from data")
  }).then(function () {
    res.send("apocalypse!")
  })
})

module.exports = router