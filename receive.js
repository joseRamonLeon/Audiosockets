var songs = new Array();
var songCount = 0;
var currentSong = -1;
var shouldRun = false;
var hasSetInterval = false;
$(function() {
    var socket = io.connect();
    var musicDiv = document.getElementById("music-div");
    var list = document.getElementById("music-list");
    socket.on('musicData', function(data) {
        shouldRun = true;
        var audio = document.createElement("audio");
        var song = new Object();
        audio.src = data.data;
        audio.id = "song" + songCount;
        song.audio = audio;
        song.name = data.name;
        song.number = songCount;
        songs.push(song);
        document.body.appendChild(audio);
        songCount++;
        processAudio();
    });
});

function processAudio() {
    if(document.getElementById("music-list").childNodes.length == 0) {
        currentSong++;
        songs[currentSong].audio.play();
        if(!hasSetInterval) {
            setInterval(function() {
                hasSetInterval = true;
                if(shouldContinue() && songs[currentSong].audio.paused) {
                    nextSong();
                } else if(shouldRun && songs[currentSong].audio.paused) {
                    shouldRun = false;
                    var list = document.getElementById("music-list");
                    var songList = list.childNodes;
                    var oldSong = songList[0];
                    list.removeChild(oldSong);
                }
            }, 1000);
        }
        var list = document.getElementById("music-list");
        var listItem = document.createElement("li");
        listItem.innerHTML = "<p>Current Song: " + songs[currentSong].name + "</p>";
        list.appendChild(listItem);
    } else {
        var list = document.getElementById("music-list");
        var listItem = document.createElement("li");
        listItem.innerHTML = "<p>" + songs[songs.length - 1].name + "</p>";
        list.appendChild(listItem);
    }
}

function nextSong() {
    currentSong++;
    var list = document.getElementById("music-list");
    var songList = list.childNodes;
    var oldSong = songList[0];
    list.removeChild(oldSong);
    var nextSong = songList[0];
    nextSong.innerHTML = "<p>Current Song: " + songs[currentSong].name + "</p>";
    songs[currentSong].audio.play();
}

function shouldContinue() {
    return currentSong !== songCount - 1;
}
