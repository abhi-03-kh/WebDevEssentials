const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'Resources/Starboy.mp3',
        displayName: 'Starboy',
        cover: 'Resources/starboy img.jpeg',
        artist: 'The Weeknd',
    },
    {
        path: 'Resources/Ed Sheeran - Shape Of You.mp3',
        displayName: 'Shape of You',
        cover: 'Resources/shape of you img.jpeg',
        artist: 'Ed Sheeran',
    },
    {
        path: 'Resources/Eminem Without me.mp3',
        displayName: 'Without Me',
        cover: 'Resources/eminem img.jpeg',
        artist: 'Eminem',
    },
    {
        path: 'Resources/Daylight .mp3',
        displayName: 'Daylight',
        cover: 'Resources/daylight img.jpg',
        artist: 'David Kushner',
    },
    {
        path: 'Resources/Eminem - Godzilla (Lyrics) FT. Juice WRLD.mp3',
        displayName: 'Godzilla',
        cover: 'Resources/godzilla song img.jpeg',
        artist: 'Eminem',
    },
    {
        path: 'Resources/imagine enemy.mp3',
        displayName: 'Enemy',
        cover: 'Resources/enemy.jpg',
        artist: 'Imagine Dragons and JID',
    },
    {
        path: 'Resources/01-Superman (Clean Radio Edit).mp3',
        displayName: 'Superman',
        cover: 'Resources/eminem img.jpeg',
        artist: 'Eminem',
    },
    {
        path: 'Resources/Believer.mp3',
        displayName: 'Believer',
        cover: 'Resources/believer imagine.jpeg',
        artist: 'Imagine Dragons',
    },
    {
        path: 'Resources/Luis Fonsi - Despacito ft. Daddy Yankee.mp3',
        displayName: 'Despacito ft. Daddy Yankee',
        cover: 'Resources/despacito image.jpeg',
        artist: 'Luis Fonsi',
    },
    {
        path: 'Resources/neffex.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'Resources/neffex img.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'Resources/Roddy Ricch - The Box [Official Audio].mp3',
        displayName: 'The Box',
        cover: 'Resources/box.jpeg',
        artist: 'Roddy Ricch',
    }
];

let musicIndex = 0;
let isPlaying = false;


function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
 
    playBtn.classList.replace('fa-play', 'fa-pause');  // to change play button icon
    
    playBtn.setAttribute('title', 'Pause');   // button title on hover
    music.play();
}

function pauseMusic() {
    isPlaying = false;
 
    playBtn.classList.replace('fa-pause', 'fa-play');  // to change pause button icon
    
    playBtn.setAttribute('title', 'Play');   // button title on hover
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime( duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime( currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);