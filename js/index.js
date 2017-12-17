var vid = document.getElementById("video_intro");
var barra_bianca = document.getElementById("barra_bianca");
var logo = document.getElementById("logo");
var tempo = 6000;

if ($('#video_intro').length){
	vid.onended = function() {
		window.location.href = "anime.html";
	}
}

function mostra_logo() {
	setTimeout(function () {	barra_bianca.style.zIndex = "1001";}, 0);
	barra_bianca.style.width = "100%";
	logo.style.opacity = "1";
}
function mostra_video() {
	barra_bianca.style.width = "0%";
	logo.style.opacity = "0";
	setTimeout(function () {	barra_bianca.style.zIndex = "-1001";}, tempo);
}
function mostra_logo_home() {	
	setTimeout(function () {	barra_bianca.style.zIndex = "1001";}, 0);
	barra_bianca.style.width = "100%";
	logo.style.opacity = "1";
}
function mostra_video_home() {	
	barra_bianca.style.width = "0%";
	logo.style.opacity = "0";
}
function info() {
	mostra_logo();
	setTimeout(function () {window.location.href = "info.html";}, tempo);
}
function anime() {
	mostra_logo();
	setTimeout(function () {window.location.href = "anime.html";}, tempo);
}
function home() {
	mostra_logo();
	setTimeout(function () {window.location.href = "index.html";}, tempo);
}

function pagina_anime(percorso_anime) {
	mostra_logo();
	setTimeout(function () {window.location.href = percorso_anime;}, tempo);
}


function nascondiInfo(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
function mostra_play(id) {
	var x = document.getElementById(id);
    x.style.opacity = "1";
}
function nascondi_play(id) {
	var x = document.getElementById(id);
    x.style.opacity = "0";
}