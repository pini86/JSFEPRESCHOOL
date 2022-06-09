console.log('1.Вёрстка +10\n2.При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10\n3.Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10\n4.По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10\n5.Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10\n6.Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10\n7.Очень высокое качество оформления приложения +10\nОбщая оценка за задание 60 баллов')
var table = new Array ( 9 );        //массив игровых клеток
const audio = new Audio();
headerText = document.querySelector ('.game-name');
gameTable = document.querySelector ('.table');
scoreList = document.querySelector ('.scoreList');
scoreItem = [...document.querySelectorAll('.game')];
var winner = '';        //кто победитель
var moves = 0;          //количество ходов
var score =[];          //таблица 10 последних игр

const win = [
    [ 0,1,2 ],
    [ 3,4,5 ],
    [ 6,7,8 ],
    [ 0,3,6 ],
    [ 1,4,7 ],
    [ 2,5,8 ],
    [ 0,4,8 ],
    [ 2,4,6 ]
];                      //выигрышные комбинации

getLocalStorage();      //проверим локальную память на сохраненные игры
scoreList.style.display = "none";//спрячем таблицу последних игр

function ai() {
  let id = Math.floor(Math.random() * 9);   //случайный ход ИИ
  table[id] ? ai() : move(id, 'O');         //если клетка занята, то снова вызов ИИ, иначе ход
}

function checkEnd() {
    for (let cur of win){
        if (table[cur[0]]=='O' && table[cur[1]]=='O' && table[cur[2]]=='O'){ //если совпадает одна из выигрышных комбинаций для О
            winner = 'O';
            return true
        } else if (table[cur[0]]=='X' && table[cur[1]]=='X' && table[cur[2]]=='X'){ //аналогично для Х
            winner = 'X';
            return true
        } 
    }
    if ( !table.includes(undefined) ) {     //иначе ничья
        winner = '?';
        return true
    }
}

function move( id, role ) {
  if ( table[id] ) {        //клетка уже занята
    playMusic(`./assets/audio/icq.mp3`);
    return false
  } 
  ++moves;               //счетчик ходов
  winner = role;        //текущий ходок
  table[id] = role;     //сам ход
  document.getElementById(id).className = 'cell ' + role;       //рисуем Х или О
  playMusic(`./assets/audio/wjuh.mp3`);                         //вжух
  !checkEnd() ? (role == 'X') ? ai() : null : gameOver()        //проверка на конец игры
}

function gameOver() {
    score.unshift([winner , moves]);        //кладем результат текущей игры в текущий список
    setLocalStorage();                      //и отправляем в Local Storage
    playMusic(`./assets/audio/TADA.mp3`);   //фанфары
    headerText.style.fontSize = '2.55rem';
    headerText.textContent = `Winner -  "${winner}"  on the ${moves}th moves`;  //красивые таблички с задержками
    headerText.addEventListener("click", ()=>{
        setTimeout(location.reload(),1000)
    });

    let timerId = setInterval(() =>{
        headerText.textContent = `Please click here gently to reload`;
        setTimeout(()=>{headerText.textContent = `Winner -  "${winner}"  on the ${moves}th moves`}, 3000);
    } , 6000);
   
    gameTable.style.display = 'none';   //скрываем игровое поле
    fillScore();                         //заполняем таблицу для экрана
    scoreList.style.display = 'block';  //показываем таблицу
}

function fillScore(){
    for (i=0; i<10 ; i++){
       scoreItem[i].textContent = `${score[i][0]} on ${score[i][1]} moves`  //заполняем текущий список игр
    }
}

function playMusic(src){        //музыка
    audio.currentTime = 0;
    audio.loop = false;
    audio.src = src;
    audio.play();
}

function setLocalStorage(){
    for ( let num=0 ; num < score.length ; num++ ){
        localStorage.setItem (`gamer${num}`, score[num][0]);    //сохраняем в Local Storage
        localStorage.setItem (`moves${num}`, score[num][1]);
    }
}

function getLocalStorage(){
    for ( let num=0 ; num<9 ; num++ ){
        score.push( [localStorage.getItem (`gamer${num}`) || '-' , localStorage.getItem (`moves${num}`) || '-'] ) //если что-то есть в Local Storage,то кладем в текущий список, иначе заполняем минусиками
    }
}
