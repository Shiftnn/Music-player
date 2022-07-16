let disk = document.getElementById('disk')
let player = document.getElementById('player')
let info = document.getElementById('info')
let songName = document.getElementById('name')

const musicContainer = document.getElementById('container')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

const next = document.getElementById('next')
const play = document.getElementById('play')
const prev = document.getElementById('prev')

// song titles
const songs = ['power', 'АТВИНТА', 'serpentine', 'Ecstasy', 'apocalypse','вентилятор Салют' , 'grown', 'KORABEL`NAYA PU - DJ MIX НА 9-ОЕ МАЯ', 'chippin-in', 'Mewone - inside',
'SR']

// keep tracks of song
let songIndex = 0

// update song index
function loadsong (song) {
    songName.innerText = song
    audio.src = `music/${song}.mp3`
    disk.src = `img/${song}.jpg`
}

// load song detailes into DOM
loadsong(songs[songIndex])

// to play
function playSong() {
    musicContainer.classList.add('play')
    play.querySelector('img').src = 'img/pause.png'

    audio.play()
}

// to pause
function pauseSong() {
    musicContainer.classList.remove('play')
    play.querySelector('img').src = 'img/play-2.png'

    audio.pause()
}

// to next song
function nextSong () {
    songIndex++

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    
    info.classList.add('active')
    loadsong(songs[songIndex])

    audio.play()
    play.querySelector('img').src = 'img/pause.png'
    musicContainer.classList.add('play')
    
}

// updates the progress bar of the cur song
function updateProgress (e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

// sets progress bar
function setProgress (e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// to previous song
function prevSong () {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    info.classList.remove('active')
    loadsong(songs[songIndex])

    play.querySelector('img').src = 'img/play-2.png'
    musicContainer.classList.remove('play')
    audio.pause()
}
// Event listeners
// pause & play
play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    const isActive = info.classList.contains('active')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

    if (isActive) {
        info.classList.remove('active')
    } else {
        info.classList.add('active')
    }
})

// change song
next.addEventListener('click', () => {nextSong()})
prev.addEventListener('click', () => {prevSong()})

//  Time/song update
audio.addEventListener('timeupdate', updateProgress)

// click of progress bar
progressContainer.addEventListener('click', setProgress)

// song ends
audio.addEventListener('ended', nextSong)