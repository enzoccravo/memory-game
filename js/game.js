const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const spanTimer = document.querySelector('.timer')
const spanAttempts = document.querySelector('.attempt')



const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

const createElement = (tag, className) => {
 const element = document.createElement(tag);
 element.className = className;
 return element;
}

let firstCard = '';
let secondCard = '';

const checkWin = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20){
        setTimeout(()=>{        
            clearInterval(this.loop);
            alert(`Parabéns, ${spanPlayer.innerHTML}! Você demorou ${spanTimer.innerHTML} segundos e tentou ${spanAttempts.innerHTML} vezes.`);
         }, 800)
    }



}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = '';
        secondCard = '';

        checkWin();

    } else {

        setTimeout(()=>{
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card'); 

        firstCard = '';
        secondCard = '';
    }, 500)



    }
}

let counter = 0;

const revealCard = ({target}) => {
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if( secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

        counter += 1;
        spanAttempts.innerHTML = counter;
    }
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characters, ...characters];

    const shuffledCharacters = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    })
}

const clicked = ()=> {
    startTimer();
    grid.removeEventListener('click', clicked);
};

grid.addEventListener('click', clicked);

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +spanTimer.innerHTML
        spanTimer.innerHTML = currentTime + 1;
    }, 1000);
}


window.onload = () =>{

    loadGame();

    

    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
}


