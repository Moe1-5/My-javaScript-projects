const image = document.querySelector('#cover'),
    title = document.querySelector('#music-title'),
    artist = document.querySelector('#music-artist'),
    currentTimeEl = document.querySelector('#current-time'),
    durationEl = document.querySelector('#duration'),
    progress = document.querySelector('#progress'),
    playerProgress = document.querySelector('#player-progress'),
    prevBtn = document.querySelector('#prev'),
    nextBtn = document.querySelector('#next'),
    playBtn = document.querySelector('#play'),
    background = document.querySelector('#bg-img');

const music = new Audio();

const songs = [
    {
        path: 'Assets/mussic1.mp3',
        displayName: 'Mocking Bird',
        cover: 'Assets/1asset.jpg',
        artistName:'Eminem'
    },
    {
        path: 'Assets/music2.mp3',
        displayName: "what's your secret ",
        cover: 'Assets/asset-2.jpeg',
        artistName:'Ilias al-six'
    },
    {
        path: 'Assets/music3.mp3',
        displayName: ' Habibi',
        cover: 'Assets/assets-3.jpeg',
        artistName:'Albani'
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}



function playMusic(){
    isPlaying = true;
    // change play button icon 
    playBtn.classList.replace('fa-play', 'fa-pause');
    //  set button hover title 
    playBtn.setAttribute('title', 'Pause');
    music.play();
}


function pauseMusic(){
    isPlaying = false;
    // change pause button icon 
    playBtn.classList.replace('fa-pause', 'fa-play');
    //  set button hover title 
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artistName;
    image.src = song.cover
    background.src = song.cover;
}


function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length)%songs.length;
    loadMusic(songs[musicIndex]);
    playMusic()
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPrecent = (currentTime / duration) * 100;
    progress.style.width = `${progressPrecent}%`;

    const formatTime = (time) => String(Math.floor(time)).
    padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60 )}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}


function setProgressBar (e){
    const width = playerProgress.clientwidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX /width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', ()=> changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);
loadMusic(songs[musicIndex]);