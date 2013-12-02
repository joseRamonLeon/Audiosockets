$(function() {
    var socket = io.connect();
    var musicForm = $('#music-form');
    musicForm.submit(function(e) {
        e.preventDefault();
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }
        var input = document.getElementById('fileinput');
        var file = input.files[0];
        var fr = new FileReader();
        fr.onload = function() {
            var data = new Object();
            data.data = fr.result;
            data.name = file.name;
            socket.emit("fileSend", data);
        }
        fr.readAsDataURL(file);
    });
});
