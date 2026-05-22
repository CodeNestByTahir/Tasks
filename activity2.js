let gameSeq = [];
let userSeq = [];
const btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let acceptingInput = false;

const h2 = document.querySelector("h2");
const body = document.body;
const allBtns = document.querySelectorAll(".btn");
const startMessage = "Press any key to start..!";

function reset() {
    started = false;
    acceptingInput = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerText = startMessage;
}

function gameFlash(btn) {
    if (!btn) return;
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
    if (!btn) return;
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
}

function playSequence() {
    acceptingInput = false;
    gameSeq.forEach((color, index) => {
        const button = document.querySelector(`.${color}`);
        setTimeout(() => gameFlash(button), 600 * index);
    });
    setTimeout(() => {
        acceptingInput = true;
    }, 600 * gameSeq.length);
}

function nextLevel() {
    level += 1;
    userSeq = [];
    h2.innerText = `Level ${level}`;
    const randColor = btns[Math.floor(Math.random() * btns.length)];
    gameSeq.push(randColor);
    playSequence();
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            acceptingInput = false;
            setTimeout(nextLevel, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start..!`;
    body.style.backgroundColor = "red";
    setTimeout(() => {
        body.style.backgroundColor = "";
    }, 250);
    reset();
}

function btnPress() {
    if (!started || !acceptingInput) return;

    const btn = this;
    const userColor = btn.id;
    userSeq.push(userColor);
    userFlash(btn);
    checkAns(userSeq.length - 1);
}

allBtns.forEach((btn) => {
    btn.addEventListener("click", btnPress);
});

document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        reset();
        nextLevel();
    }
});

reset();