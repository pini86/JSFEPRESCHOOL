console.log('1.Вёрстка +10\n2.При загрузке страницы приложения отображается рандомная цитата +10\n3.При перезагрузке страницы цитата обновляется (заменяется на другую) +10\nЕсть кнопка, при клике по которой цитата обновляется (заменяется на другую) +10\n5.Смена цитаты сопровождается любым другим эффектом +10\n6.Можно выбрать один из двух языков отображения цитат +10\nоценка за задание 60 баллов')
const urlEn = 'https://api.chucknorris.io/jokes/random';
const urlRu = "./quotes.json";
const textJoke = document.querySelector ('.textJoke');
const newJoke = document.querySelector ('.play');
const lang = document.querySelector ('.switch-lng');
const imageHero = document.querySelector ('.imageHero');
const audio = new Audio();
let urlCurr = urlEn;

newJoke.addEventListener('click', changeJoke);
lang.addEventListener('click', changeLang);

function changeLang(){
  if (urlCurr===urlEn){
    urlCurr = urlRu;
    newJoke.textContent = 'Лев Толстой рекомендует :';
    imageHero.src = './assets/img/lev.png';
  } else {
    urlCurr = urlEn;
    newJoke.textContent = 'MAKE ME LAUGH CHUCK!'
    imageHero.src = './assets/img/chuck.png';
  }
  changeJoke();
}

async function getData(urlCurr) {
  const res = await fetch(urlCurr);
  const data = await res.json();
  if (urlCurr === urlRu){
    let number = Math.floor(Math.random()*100);
    textJoke.textContent = data[number].value;
  }else{
    textJoke.textContent = data.value;
  }
}

function changeJoke(){
  getData (urlCurr)
  playMusic();
}

function playMusic(){
  audio.currentTime = 0;
  audio.loop = false;
  audio.src = `./assets/audio/TADA.mp3`;
  audio.play();
}

window.onload = function() {
   getData (urlCurr);
};
