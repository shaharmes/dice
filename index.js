let state = {
    page: 'welcome',
    players: [{}, {}, {}, {}, {}, {}, {}, {}],
    rounds: 3,
    currentPlayer: 6,
}

const hideMains = () => {document.querySelectorAll('.main').forEach(main => main.style.display = 'none')};

function render(s) {
    console.log(s);
    hideMains();
    document.querySelector(`#${s.page}`).style.display = 'flex';
}

function startNewGame(s) {
    return {...s, page: 'players'};
}

const start = document.querySelector('#start').addEventListener('click', () => {
    state = startNewGame(state);
    render(state);
    setPlayers(state.currentPlayer);
});

function setPlayer (name, idx) {
    state.players[idx - 1].name = name;
    console.log(state.players);
}

function setPlayers(num) {
    for (let i = 0; i < num; i++) {
        let lable = document.createElement('label');
        lable.innerHTML = `Player ${i + 1}: `;
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `player${i+1}`);
        lable.appendChild(input);
        document.querySelector('.player').appendChild(lable);
        let br = document.createElement('br');
        document.querySelector('.player').appendChild(br);
        console.log(lable);
        input.addEventListener('keyup', (e) => {
            setPlayer(e.target.value, i+1);
        });
    }
    let button = document.createElement('button');
    button.setAttribute('id', 'submit');
    button.innerHTML = 'Submit';
    document.querySelector('.player').appendChild(button);
    document.querySelector('#submit').addEventListener('click', () => {
        state = {...state, page: 'game'};
        render(state);
        setGame(state);
    }
    );

}

let k = 1;

function setGame (s) {
    let gameTitle = document.createElement('h1');
    gameTitle.innerHTML = `Round ${k} out of ${s.rounds}`; 
    document.querySelector('.gameTitle').appendChild(gameTitle);
    for (let i = 0; i < s.currentPlayer; i++) {
        let lable = document.createElement('label');
        lable.innerHTML = `Player ${i + 1}: `;
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('disabled', true);
        input.setAttribute('id', `Player${i+1}`);
        lable.appendChild(input);
        document.querySelector('.board').appendChild(lable);
        let br = document.createElement('br');
        document.querySelector('.board').appendChild(br);
        console.log(lable);
        k++;
        input.addEventListener('keyup', (e) => {
            setPlayer(e.target.value, i);
        });
    }

    for (let i = 0; i < s.currentPlayer; i++) {
        let lable = document.createElement('label');
        lable.innerHTML = `Player ${i + 1}: `;
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('disabled', true);
        input.setAttribute('id', `PlayerScore${i+1}`);
        lable.appendChild(input);
        document.querySelector('.score').appendChild(lable);
        let br = document.createElement('br');
        document.querySelector('.score').appendChild(br);
        console.log(lable);
        k++;
        input.addEventListener('keyup', (e) => {
            setPlayer(e.target.value, i);
        });
    }
}

let cnt = 0;
let array = [];

function setScore (s) {
    let max = 0;
    for (let i = 0; i < s.currentPlayer; i++) {
        let score = document.querySelector(`#PlayerScore${i+1}`);
        score.value = array[i];
        if (max < array[i]) {
            max = array[i];
        }
    }
}

document.querySelector('#roll').addEventListener('click', () => {
    let dice = Math.floor(Math.random() * 10) + 1;
    document.querySelector(`#Player${cnt + 1}`).value = dice;
    state.players[cnt].score = dice;
    console.log(state.players);
    if (cnt === state.currentPlayer) {

        cnt = 0;

    }
    cnt++;
});


document.addEventListener('DOMContentLoaded', () => {
    render(state);
});