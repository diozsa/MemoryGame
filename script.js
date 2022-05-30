const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


//shuffle cards with Fisher-Yates
//https://stackoverflow.com/questions/31089918/fisher-yates-algorithm-explanation

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let card1, card2;
let cardCount = 0;
let wait = false;

function handleCardClick(e) {
  if(wait) return;
  if(e.target.classList.contains ("flipped")) return;
  let card = e.target;
  
  if (!card1) {
    card.style.backgroundColor = card.classList[0];
    card.classList.add("flipped");
    card1 = card;}
  else if (!card2) {
    card.style.backgroundColor = card.classList[0];
    card.classList.add("flipped");
    card2 = card;

    if(card1 && card2) {
      wait = true;
      if(card1.className === card2.className) {
        cardCount += 2;        
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        wait = false;
      }
    else {
      setTimeout(function(){
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");        
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1 = null;
        card2 = null;
        wait = false;
      },1000)
    }
    }
  }
  if(cardCount === COLORS.length) alert('You have some memory lapses..');
}


createDivsForColors(shuffledColors);