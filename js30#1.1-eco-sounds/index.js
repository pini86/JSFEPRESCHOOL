console.log('1.Вёрстка +10\n2.При кликах по интерактивным элементам меняется изображение +10\n3.При кликах по интерактивным элементам меняется звук +10\n4.Активный в данный момент интерактивный элемент выделяется стилем +10\n5.Кнопка Play/Pause +20\n6.дополнительный функционал - плавная смена фона +10\nоценка за задание 60 баллов')
const audio = new Audio();
const playBtn = document.querySelector('.play');
const birdSel = document.querySelectorAll('.nav-item');
const main=document.querySelector('.main');

let activeBird = birdSel[0];

activeBird.classList.add('active');

let isPlay = false;
audio.currentTime = 0;
audio.loop = true;
audio.src="./assets/audio/forest.mp3";
playBtn.addEventListener('click', toggleBtn);

birdSel.forEach( 
  function(bird) { 
    bird.addEventListener("click", changeBird);
  }
 );

 [].forEach.call( birdSel, function( item ){
  item.addEventListener( 'click', function() {
      activeBird.classList.remove('active'); 
      activeBird = item;  
      activeBird.classList.add('active');  
      }
  );
}
);

function changeBird(event) {
  const bird=event.target.dataset.bird;
  main.style.backgroundImage = `url('./assets/img/${bird}.jpg')`;
  audio.src=`./assets/audio/${bird}.mp3`;
  isPlay=false;
  let asd=toggleBtn()
}  

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function toggleBtn() {
    if (isPlay){
        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        pauseAudio();
        isPlay=false;
    } else {
        playBtn.classList.remove('play');
        playBtn.classList.add('pause');
        playAudio();
        isPlay=true;
    }
}

