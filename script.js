let box = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let turno = true;
let count = 0;
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];

box.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("the Box is Click");
        if (turno) { // player o
            box.innerText = "o";
            box.style.color = "red";
            turno = false;
        } else { // player x
            box.style.color = "blue";
            box.innerText = "x";
            turno = true;
        }
        box.disabled = true;
        count++;
        if (checkwinner()) {
            return; 
        }
        if (count === 9) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game Is Tie";
    msgcontainer.style.display = "block";
    msgcontainer.classList.remove("hide");
    disabledbox();
};

const resetgame = () => {
    count = 0;
    turno = true;
    enablebox();
    msgcontainer.style.display = "none";
    msgcontainer.classList.add("hide");
};

const disabledbox = () => {
    for (let boxs of box) {
        boxs.disabled = true;
    }
};

const enablebox = () => {
    for (let boxs of box) {
        boxs.disabled = false;
        boxs.innerText = "";
        boxs.style.backgroundColor = "";
    }
};

const showwinner = (winner) => {
    msg.innerText = `The Winner Of The Game Is "Player ${winner}"`;
    msgcontainer.classList.remove("hide");
    msgcontainer.style.display = "block";
    disabledbox();
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1val = box[pattern[0]].innerText;
        let pos2val = box[pattern[1]].innerText;
        let pos3val = box[pattern[2]].innerText;
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                box[pattern[0]].style.backgroundColor = "rgb(202, 28, 196)";
                box[pattern[1]].style.backgroundColor = "rgb(202, 28, 196)";
                box[pattern[2]].style.backgroundColor = "rgb(202, 28, 196)";
                console.log("winner", pos1val);
                showwinner(pos1val);
                return true;
            }
        }
    }
    return false;
};

newbtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);
