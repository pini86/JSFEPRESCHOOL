console.log("1. Смена изображений в секции portfolio +25\n2. Перевод страницы на два языка +25\n3. Переключение светлой и тёмной темы +25\n4.Дополнительный функционал: сложные эффекты для кнопок  Portfolio при наведении +5\nоценка за задание 80 баллов");

const portfolioImages = document.querySelectorAll('.portfolio-img>img');
const portfolioBtns = document.querySelectorAll('.portfolio-button , .portfolio-button.light-theme');
const lightTheme = document.querySelector('.carbon');
const ltSection= document.querySelectorAll('.crossIcon , .menu , .menuItem , .portfolio-button , #skills , #portfolio , #video , #price');


function changeImage(event) {
   const season=event.target.dataset.season;
   portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
}  
portfolioBtns.forEach( 
  function(portfolioBtn) { 
    portfolioBtn.addEventListener("click", changeImage);
  }
);

let activeItem = portfolioBtns[0]; 
activeItem.classList.add('active');
[].forEach.call( portfolioBtns, function( item ){
    item.addEventListener( 'click', function() {
        activeItem.classList.remove('active'); 
        activeItem = item;  
        activeItem.classList.add('active');  
        }
    );
  }
);

// Light theme
lightTheme.addEventListener("click", switchLight);

function switchLight (){
  ltSection.forEach((name) => name.classList.toggle('light-theme'));
}

//Hamburger menu
const hamburger= document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const crossIcon = document.querySelector(".crossIcon");
const hamburgerIcon= document.querySelector(".hamburgerIcon");


function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    hamburgerIcon.style.display = "none";
    crossIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    hamburgerIcon.style.display = "block";
    crossIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach( 
  function(menuItem) { 
    menuItem.addEventListener("click", toggleMenu);
  }
);

// Translate
import i18Obj from "./translate.js";
let lng='en';
const ruBtn = document.querySelector ('.ru');
const enBtn = document.querySelector ('.en');
enBtn.classList.add('active');
ruBtn.addEventListener('click', ruTranslate);
enBtn.addEventListener('click', enTranslate);

function ruTranslate(){
  lng="ru";
  ruBtn.classList.add('active');
  enBtn.classList.remove('active');
  getTranslate(lng);
};

function enTranslate(){
  lng="en";
  enBtn.classList.add('active');
  ruBtn.classList.remove('active');
  getTranslate(lng);
};

function getTranslate (lng){
  const allText= document.querySelectorAll('[data-i18n]');
  allText.forEach((item)=>{
    item.textContent = i18Obj[lng][item.dataset.i18n];
    if (item.placeholder) {
      item.placeholder = i18Obj[lng]['message'];
    }
  })
};

