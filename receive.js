$(function() {
    var socket = io.connect();
    socket.on('musicData', function(data) {
        var audio = document.createElement("audio");
        audio.src = data;
        document.body.appendChild(audio);
        audio.play();
    });
});
