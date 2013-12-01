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
        if(!input) {
            alert('error');
        } else if(!input.files) {
            alert("no files");
        } else if(!input.files[0]) {
            alert("please attach some files");
        }
        var file = input.files[0];
        var fr = new FileReader();
        fr.onload = function() {
            socket.emit("fileSend", fr.result);
        }
        fr.readAsDataURL(file);
    });
});
