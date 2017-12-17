var musicPlaylist = [];
$(window).on('load', function (e) {
  $('tbody').find('audio').each(function(){
    musicPlaylist.push(this);
  });
  sessionStorage.setItem('musicCurrent', 0);
  var music = musicPlaylist[sessionStorage.getItem('musicCurrent')];
  $('#durationProgressBar').attr('max', music.duration);
  $('#title').html($(musicPlaylist[sessionStorage.getItem('musicCurrent')]).attr('data-titolo'));
  $('#album').html($(musicPlaylist[sessionStorage.getItem('musicCurrent')]).attr('data-album'));
  $('#duration').html($(musicPlaylist[sessionStorage.getItem('musicCurrent')]).attr('data-durata'));
  plays();
});

$("audio").on("timeupdate", function() {
  var currentTime = this.currentTime;
  document.getElementById('durationProgressBar').value = currentTime;
  var minutes = Math.floor(currentTime / 60);
  var seconds = Math.floor(currentTime - minutes * 60);
  if(seconds < 10){
    seconds = '0'+seconds;
  }
  document.getElementById('durationProgress').innerHTML = minutes+':'+seconds;
});

$("audio").on("ended", function() {
  skipNext();
});

$("body").on("input", "#durationProgressBar", function() {
  $(this).attr('value', this.value);
  range(this);
});

$("body").on("input", "#volume", function() {
  $(this).attr('value', this.value);
  setVolume(this);
});

$("tbody").on("click", "tr", function() {
  stop();
  sessionStorage.setItem('musicCurrent', $(this).find('audio').attr('data-numero'));
  
  changeMusic();
  plays();
});

$("body").on("click", "#play", function() {
  console.log('plays');
  plays();
});

$("body").on( "click", "#pause", function() {
  console.log('pause');
  pause();
});

$("body").on( "click", "#shuffle", function() {
  console.log('shuffle');
  shuffle(musicPlaylist);
});

$("body").on( "click", "#repeat", function() {
  console.log('repeat');
  repeat();
});

$("body").on( "click", "#skipNext", function() {
  console.log('next');
  skipNext();
});

$("body").on( "click", "#skipPrevious", function() {
  skipPrevious('previous');
});

function range(el){
  var value = $(el).attr('value');
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var s = musicPlaylist[musicCurrent];
  s.currentTime = value;
  console.log('ciao');
}

function plays(){
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var s = musicPlaylist[musicCurrent];
  s.play();
  var icon = $('#play').find('i');
  $(icon).html('pause_circle_outline');
  $('#play').attr('id', 'pause');
}

function pause(){
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var s = musicPlaylist[musicCurrent];
  s.pause();
  var icon = $('#pause').find('i');
  $(icon).html('play_circle_outline');
  $('#pause').attr('id', 'play');
}

function skipPrevious(){
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var s = musicPlaylist[musicCurrent];
  if(s.currentTime < 5){
    stop();
    var n = sessionStorage.getItem('musicCurrent');
    sessionStorage.setItem('musicCurrent', parseInt(n)-1);
    console.log(sessionStorage.getItem('musicCurrent'));
    changeMusic();
    plays();
  }
  else{
    var musicCurrent = sessionStorage.getItem('musicCurrent');
    var s = musicPlaylist[musicCurrent];
    s.currentTime = 0;
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function stop(){
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var s = musicPlaylist[musicCurrent];
  s.pause();
  s.currentTime = 0;
  var icon = $('#pause').find('i');
  $(icon).html('play_circle_outline');
  $('#pause').attr('id', 'play');
}

function skipNext(){
  stop();
  var n = sessionStorage.getItem('musicCurrent');
  sessionStorage.setItem('musicCurrent', parseInt(n)+1);
  console.log(sessionStorage.getItem('musicCurrent'));
  changeMusic();
  plays();
}

function changeMusic(){
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var s = musicPlaylist[musicCurrent];
  $('#title').html($(musicPlaylist[sessionStorage.getItem('musicCurrent')]).attr('data-titolo'));
  $('#album').html($(musicPlaylist[sessionStorage.getItem('musicCurrent')]).attr('data-album'));
  $('#duration').html($(musicPlaylist[sessionStorage.getItem('musicCurrent')]).attr('data-durata'));
}

function setVolume(el){
  var musicCurrent = sessionStorage.getItem('musicCurrent');
  var volume = $(el).attr('value');
  $('audio').each(function(){
    this.volume = volume;
  });
  var s = musicPlaylist[musicCurrent];
  var audio = s;
  var icon = $(el).parent().find('i')

  if(volume == 0){
    $(icon).html('volume_off');
  }
  else{
    if(volume > 0 && volume < 0.5){
      $(icon).html('volume_down');
    }
    else{
      $(icon).html('volume_up');
    }
  }
}