var term = 0;
const pos = Array.from({ length: 3 }, () => Array(3).fill(-1));
let gameWon = false;

var row0 = document.getElementsByClassName("col-0");
var row1 = document.getElementsByClassName("col-1");
var row2 = document.getElementsByClassName("col-2");
document.getElementById("btn").addEventListener('click',function(){
    location.reload();
})
for(let i = 0 ; i<3 ;i++){
    row0[i].addEventListener('click',function(e){
        console.log( 0 , row0[i].dataset.value);
        insert(0 , Number(row0[i].dataset.value),row0[i]);
    })
    row1[i].addEventListener('click',function(e){
        console.log(1,row1[i].dataset.value);
        insert(1 , Number(row1[i].dataset.value),row1[i]);
    })
    row2[i].addEventListener('click',function(e){
        console.log(2,row2[i].dataset.value);
        insert(2 , Number(row2[i].dataset.value),row2[i]);
    })
}
function addimg(e) {
    if(gameWon){
        return;
    }
    const audio =new Audio("ting.mp3");
    audio.play();
    var img = e.getElementsByTagName('img');
    img = img[0];
    if(term==0){
        img.src="img/circle.png"
    }else{
        img.src="img/cross.png"
    }
}
function insert(row,col ,e) {
    if(pos[row][col]==1){
        return;
    }else{
        pos[row][col]=term;
        term = 1 - term;
        addimg(e)
        let title = document.getElementById("title");
        var x = document.getElementsByTagName("BODY")[0];
        if(tie()){
            title.innerText = "TIE Refrresh to Start Again";
            x.style.backgroundColor='red';
        }
        if (check()) {
            const victory = new Audio("victory.mp3");
            x.style.backgroundColor='green';
            victory.play();
            gameWon = true;
            if (term == 0) {
                title.innerText = "O has won the game ";
            } else {
                title.innerText = "X has won the game ";
            }
            setTimeout(function() {
                location.reload();
            }, 5000);
            
        }
    }
}
function check() {
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (pos[i][0] !== -1 && pos[i][0] === pos[i][1] && pos[i][1] === pos[i][2]) {
            resetPos();
            return true;
        }
    }
    
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (pos[0][i] !== -1 && pos[0][i] === pos[1][i] && pos[1][i] === pos[2][i]) {
            resetPos();
            return true;
        }
    }
    
    // Check diagonals
    if (pos[0][0] !== -1 && pos[0][0] === pos[1][1] && pos[1][1] === pos[2][2]) {
        resetPos();
        return true;
    }
    
    if (pos[0][2] !== -1 && pos[0][2] === pos[1][1] && pos[1][1] === pos[2][0]) {
        resetPos();
        return true;
    }

    return false;
}
function tie(){
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(pos[i][j] == -1){
                return false;
            }
        }
    }
    return true;
}
function resetPos() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            pos[i][j] = -1;
        }
    }
}

