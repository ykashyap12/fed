console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: " All Hell The Tiger(Anirudh)", filePath: "songs2/1.mp3", coverPath: "covers/anirudh.webp"},
    {songName: "Bade Miyan Chhote Miyan (Anirudh)", filePath: "songs2/2.mp3", coverPath: "covers/anirudh.webp"},
    {songName: "Devara BGM (Anirudh)", filePath: "songs2/3.mp3", coverPath: "covers/anirudh.webp"},
    {songName: "Leo Das Entry (Anirudh)", filePath: "songs2/4.mp3", coverPath: "covers/anirudh.webp"},
   
]

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        pauseSong();
    }
});

// Function to play the song
const playSong = () => {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    syncPlayButton();
};

// Function to pause the song
const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    syncPlayButton();
};

// Function to sync the play/pause button icons with the current song item
const syncPlayButton = () => {
    const songItemPlay = document.getElementById(`songItemPlay${songIndex}`);
    if (songItemPlay) {
        if (audioElement.paused) {
            songItemPlay.classList.remove('fa-pause-circle');
            songItemPlay.classList.add('fa-play-circle');
        } else {
            songItemPlay.classList.remove('fa-play-circle');
            songItemPlay.classList.add('fa-pause-circle');
        }
    }
    songItems.forEach((element, i) => {
        const songItemPlayIcon = element.querySelector('.songItemPlay');
        if (i === songIndex) {
            if (audioElement.paused) {
                songItemPlayIcon.classList.remove('fa-pause-circle');
                songItemPlayIcon.classList.add('fa-play-circle');
            } else {
                songItemPlayIcon.classList.remove('fa-play-circle');
                songItemPlayIcon.classList.add('fa-pause-circle');
            }
        } else {
            songItemPlayIcon.classList.remove('fa-pause-circle');
            songItemPlayIcon.classList.add('fa-play-circle');
        }
    });
};

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); 
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id.replace('songItemPlay', ''));
        if (songIndex === clickedIndex && !audioElement.paused) {
            // Pause the song
            pauseSong();
        } else {
            // Play the song
            makeAllPlays();
            playSongAtIndex(clickedIndex);
        }
    });
});

// Function to play the song at a specific index
const playSongAtIndex = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    playSong();
};

// JavaScript to add and remove the "clicked" class when the repeat icon is clicked
const repeatIcon = document.getElementById('repeat');
repeatIcon.addEventListener('click', () => {
    repeatIcon.classList.toggle('clicked');
    // Toggle repeat functionality
    if (repeatIcon.classList.contains('clicked')) {
        audioElement.loop = true; // Enable repeat
    } else {
        audioElement.loop = false; // Disable repeat
    }
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSongAtIndex(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    playSongAtIndex(songIndex);
});

audioElement.addEventListener('ended', () => {
    pauseSong();
    syncPlayButton();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault(); // Prevent the default space bar behavior (e.g., scrolling)
      if (audioElement.paused) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        syncPlayButton();
      } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        syncPlayButton();
      }
    } else if (event.code === 'ArrowLeft') {
        // Handle backward action
        audioElement.currentTime -= 5; // Go back 5 seconds
    } else if (event.code === 'ArrowRight') {
        // Handle forward action
        audioElement.currentTime += 5; // Go forward 5 seconds
    }
});
