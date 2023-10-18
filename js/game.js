let canvas;
let world
let keyboard = new Keyboard()
let globalVolume = 0.2
let gameMute = false
let fullScreen = false


function init() {
   setVolumeSettings()
   canvas = document.getElementById('canvas');
   canvas.style.display = "block"
   initLevel()
   document.getElementById('keys').classList.add('displayNone')
   document.getElementById('start').classList.add('displayNone')
   detectPhonePosition()
   world = new World(canvas, keyboard)
   document.getElementById('fullScreenImg').classList.remove('displayNone')
}


/**
 * displays the Gameover screen
 */
function replay() {
   document.getElementById('gameOver').classList.remove('gameOver')
   document.getElementById('gameOver').classList.add('displayNone')
}


document.addEventListener('keydown', function (e) {
   if (e.keyCode == 39) {
      keyboard.right = true
   }
   if (e.keyCode == 37) {
      keyboard.left = true
   }
   if (e.keyCode == 38) {
      keyboard.jump = true
   }
   if (e.keyCode == 32) {
      keyboard.throwObj = true
   }
})


document.addEventListener('keyup', function (e) {
   if (e.keyCode == 39) {
      keyboard.right = false
   }
   if (e.keyCode == 37) {
      keyboard.left = false
   }
   if (e.keyCode == 38) {
      keyboard.jump = false
   }
   if (e.keyCode == 32) {
      keyboard.throwObj = false
   }
})


/**
 * event listener for mobile devices
 */
document.addEventListener('DOMContentLoaded', function () {
   document.getElementById('goRight').addEventListener('touchstart', function (e) {
      e.preventDefault()
      keyboard.right = true;
   });
   document.getElementById('goLeft').addEventListener('touchstart', function (e) {
      e.preventDefault()
      keyboard.left = true;
   });
   document.getElementById('jump').addEventListener('touchstart', function (e) {
      e.preventDefault()
      keyboard.jump = true;
   });
   document.getElementById('shoot').addEventListener('touchstart', function (e) {
      e.preventDefault()
      keyboard.throwObj = true;
   });


   document.getElementById('goRight').addEventListener('touchend', function (e) {
      e.preventDefault()
      keyboard.right = false;
   });
   document.getElementById('goLeft').addEventListener('touchend', function (e) {
      e.preventDefault()
      keyboard.left = false;
   });
   document.getElementById('jump').addEventListener('touchend', function (e) {
      e.preventDefault()
      keyboard.jump = false;
   });
   document.getElementById('shoot').addEventListener('touchend', function (e) {
      e.preventDefault()
      keyboard.throwObj = false;
   });
})


/**
 * displays the Gameover screen
 */
function closeDialogs() {
   document.getElementById('instruction').classList.add('displayNone')
   document.getElementById('instruction').classList.remove('instructions')
}


/**
 * displays the instruction dialog
 */
function openInstruction() {
   document.getElementById('instruction').classList.remove('displayNone')
   document.getElementById('instruction').classList.add('instructions')
}


/**
 * displays the key instruction dialog
 */
function openKeysInstruction() {
   document.getElementById('keysInstruction').classList.remove('displayNone')
   document.getElementById('keysInstruction').classList.add('instructions')
}


/**
 * removes the key instruction dialog
 */
function closeKeysInstruction() {
   document.getElementById('keysInstruction').classList.add('displayNone')
   document.getElementById('keysInstruction').classList.remove('instructions')
}


/**
 * overlay and canvas enter full screen mode
 */
function enterFullScreen() {
   let fullScreenDiv = document.getElementById("overlay");

   if (fullScreenDiv.requestFullscreen) {
      fullScreenDiv.requestFullscreen();  // Enter fullscreen mode
      fullScreenCanvas()
   } else if (fullScreenDiv.mozRequestFullScreen) { // Firefox
      fullScreenDiv.mozRequestFullScreen();
      fullScreenCanvas()
   } else if (fullScreenDiv.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      fullScreenDiv.webkitRequestFullscreen();
      fullScreenCanvas()
   } else if (fullScreenDiv.msRequestFullscreen) { // IE/Edge
      fullScreenDiv.msRequestFullscreen();
      fullScreenCanvas()
   }
   fullScreen = true
}


/**
 * exit full screen mode
 */
function exitFullscreen() {
   if (document.exitFullscreen) {
      document.exitFullscreen();
   } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
   } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
   } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
   }
   fullScreen = false
}


/**
 * check for full screen mode
 */
function fullScreenSettings() {
   if (fullScreen == false) {
      enterFullScreen()
   } else {
      exitFullscreen()
   }
}


/**
 * settings for canvas in full screen mode
 */
function fullScreenCanvas() {
   let fullScreenCanvas = document.getElementById("canvas");
   fullScreenCanvas.style.height = "100%";
   fullScreenCanvas.style.width = "100%";
}


/**
 * check if the sound is muted
 */
function mute() {
   let speakerImg = document.getElementById('speaker')
   if (globalVolume == 0) {
      globalVolume = 0.2;
      speakerImg.src = 'img/game_background_4/speaker-24.png';
      gameMute = false
   } else {
      globalVolume = 0;
      speakerImg.src = 'img/game_background_4/mute-2-24.png';
      gameMute = true
   }
   saveVolumeSettings()
}


/**
 * checks the phone position 
 * sets min width for window.innerWidth and handles resizing
 */
function detectPhonePosition() {
   const rotateDeviceElement = document.getElementById('rotateDevice');

   function handleResize() {
      if (window.innerWidth < minWidthForRotation && window.innerHeight > window.innerWidth) {
         rotateDeviceElement.classList.remove('displayNone');
         rotateDeviceElement.classList.add('rotateDevice');
      } else {
         rotateDeviceElement.classList.remove('rotateDevice');
         rotateDeviceElement.classList.add('displayNone');
      }
   }
   const minWidthForRotation = 1300;
   window.addEventListener("resize", handleResize);
   handleResize();
}


/**
 * saves volume settings in local storage
 */
function saveVolumeSettings() {
   localStorage.setItem('gameMute', gameMute)
}


/**
 * gets volume settings in local storage
 */
function getVolumeSettings() {
   return JSON.parse(localStorage.getItem('gameMute'))
}


/**
 * sets volume settings 
 */
function setVolumeSettings() {
   let speakerImg = document.getElementById('speaker')
   if (getVolumeSettings()) {
      globalVolume = 0
      speakerImg.src = 'img/game_background_4/mute-2-24.png';
   } else {
      globalVolume = 0.2
      speakerImg.src = 'img/game_background_4/speaker-24.png';
   }
}



