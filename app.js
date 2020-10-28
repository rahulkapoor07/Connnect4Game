
class Game {
    constructor(width = 7, height = 6){
        this.width = width;
        this.height = height;
        this.gameStart = true;
        this.currPlayer = 1;
        this.gameDiv = document.querySelector('.game');
        this.table = document.querySelector('.board');
        this.createHtmlBoard();
        this.changeColorOfCellsToWhite();
        this.horizontalCheck();
        this.verticalCheck();
        this.diagonalCheck1();
        this.diagonalCheck2();
        this.checkForTie();
        this.colorMatchCheck();
    }
    createHtmlBoard() {
    //top row
        const topRow = document.createElement('tr');
        topRow.setAttribute('id', 'top-column');
        topRow.style.cursor = 'pointer';

        this.handleGameClick = this.handleClick.bind(this);
        topRow.addEventListener('click', this.handleGameClick);

    //top cells
        for (let i = 0; i < this.width; i++){
            const topCell = document.createElement('td');
            topCell.className = 'top-cells';
            topRow.appendChild(topCell);
        }
        this.table.appendChild(topRow);

        for (let y = 0; y < this.height; y++){
            const rows = document.createElement('tr');
            for (let x = 0; x < this.width; x++){
                const cells = document.createElement('td');
                cells.setAttribute('id', `${y}-${x}`);
                cells.className = 'cells';
                rows.appendChild(cells);
            }
            this.table.appendChild(rows);
        }
    }
    // CHange Color of each cell to White and insert circle with white color
    changeColorOfCellsToWhite(){
        for(let y = 0; y < this.height; y++){
            for (let x = 0; x < this.width; x++){
                document.getElementById(`${y}-${x}`).style.backgroundColor = 'white';
                const div = document.createElement('div');
                div.className = 'circle';
                div.className = `${y}-${x}`;
                document.getElementById(`${y}-${x}`).appendChild(div);
            }
        }
    }
    colorMatchCheck(one, two, three, four){
        if((one === two) && (one === three) && (one === four)){
            return true;
        }
    }
    horizontalCheck(){
        for(let y = 0; y < this.height; y++){
            for(let x = 0; x < 4; x++){
                if(this.colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y}-${x + 1}`).firstElementChild.className, 
                document.getElementById(`${y}-${x + 2}`).firstElementChild.className, document.getElementById(`${y}-${x + 3}`).firstElementChild.className)){
                    document.getElementById(`${y}-${x}`).style.border = '4px solid';
                    document.getElementById(`${y}-${x + 1}`).style.border = '4px solid';
                    document.getElementById(`${y}-${x + 2}`).style.border = '4px solid';
                    document.getElementById(`${y}-${x + 3}`).style.border = '4px solid';
                    return true;
                }
            }
        }
    }
    verticalCheck(){
        for(let x = 0; x < this.width; x++){
            for(let y = 0; y < 3; y++){
                if(this.colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y + 1}-${x}`).firstElementChild.className,
                document.getElementById(`${y + 2}-${x}`).firstElementChild.className, document.getElementById(`${y + 3}-${x}`).firstElementChild.className)){
                    document.getElementById(`${y}-${x}`).style.border = '4px solid';
                    document.getElementById(`${y + 1}-${x}`).style.border = '4px solid';
                    document.getElementById(`${y + 2}-${x}`).style.border = '4px solid';
                    document.getElementById(`${y + 3}-${x}`).style.border = '4px solid';
                    return true;
                }
            }
        }
    }
    
    diagonalCheck1(){
        for (let x = 0; x < 4; x++){
            for(let y = 0; y < 3; y++){
                if(this.colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y + 1}-${x + 1}`).firstElementChild.className,
                document.getElementById(`${y + 2}-${x + 2}`).firstElementChild.className, document.getElementById(`${y + 3}-${x + 3}`).firstElementChild.className)){
                    document.getElementById(`${y}-${x}`).style.border = '4px solid';
                    document.getElementById(`${y + 1}-${x + 1}`).style.border = '4px solid';
                    document.getElementById(`${y + 2}-${x + 2}`).style.border = '4px solid';
                    document.getElementById(`${y + 3}-${x + 3}`).style.border = '4px solid';
                    return true;
    
                }
            }
        }
    }
    
    diagonalCheck2(){
        for (let x = 0; x < 4; x++){
            for (let y = 5; y > 2; y--){
                if(this.colorMatchCheck(document.getElementById(`${y}-${x}`).firstElementChild.className, document.getElementById(`${y - 1}-${x + 1}`).firstElementChild.className,
                document.getElementById(`${y - 2}-${x + 2}`).firstElementChild.className, document.getElementById(`${y - 3}-${x + 3}`).firstElementChild.className)){
                    document.getElementById(`${y}-${x}`).style.border = '4px solid';
                    document.getElementById(`${y - 1}-${x + 1}`).style.border = '4px solid';
                    document.getElementById(`${y - 2}-${x + 2}`).style.border = '4px solid';
                    document.getElementById(`${y - 3}-${x + 3}`).style.border = '4px solid';
                    return true;
    
                }
            }
        }
    }
    
    checkForTie(){
        let arr = [];
        for(let x = 0; x < this.width; x++){
            for(let y = 0; y < this.height; y++){
                if(document.getElementById(`${y}-${x}`).style.backgroundColor !== 'white'){
                    arr.push(document.getElementById(`${y}-${x}`));
                }
            }
        }
        if (arr.length === 42){
            return true;
        }
    }
    handleClick(e){
        if(this.gameStart){
            const targetX = e.target.cellIndex;
            console.log(targetX);
            let arr = [];
            for(let y = 5; y > -1; y--){
                if(document.getElementById(`${y}-${targetX}`).style.backgroundColor === 'white'){
                    arr.push(document.getElementById(`${y}-${targetX}`));
                    if(this.currPlayer === 1){
                        arr[0].style.backgroundColor = '#f1f6f9';
                        arr[0].firstElementChild.classList.remove('circle');
                        arr[0].firstElementChild.classList.remove(`${y}-${targetX}`);
                        arr[0].firstElementChild.classList.add('circle-red');
                        if(this.horizontalCheck() || this.verticalCheck() || this.diagonalCheck1() || this.diagonalCheck2() ){
                            document.querySelector('.turn').textContent = 'Player 1 is Winner!';
                            document.querySelector('.turn').style.color = 'red';
                            document.querySelector('.turn').style.fontSize = '2rem';
                            this.gameStart = false;
                            return alert('Player 1 Winner!');
                        }else if(this.checkForTie()){
                            document.querySelector('.turn').textContent = 'It\'s a Tie!';
                            document.querySelector('.turn').style.color = 'white';
                            this.gameStart = false;
                            return alert('It\'s a Tie!');
                        }else{
                            document.querySelector('.turn').textContent = 'Player 2\'s turn';
                            return this.currPlayer = 2;
                        }
                            
                        
                    }else{
                        arr[0].style.backgroundColor = '#f1f6f9';
                        arr[0].firstElementChild.classList.remove('circle');
                        arr[0].firstElementChild.classList.remove(`${y}-${targetX}`);
                        arr[0].firstElementChild.classList.add('circle-blue');
                        if(this.horizontalCheck() || this.verticalCheck() || this.diagonalCheck1() || this.diagonalCheck2() ){
                            document.querySelector('.turn').textContent = 'Player 2 is Winner!';
                            document.querySelector('.turn').style.color = 'Blue';
                            document.querySelector('.turn').style.fontSize = '2rem';
                            this.gameStart = false;
                            return alert('Player 2 Winner!');
                        }else if(this.checkForTie()){
                            document.querySelector('.turn').textContent = 'It\'s a Tie!';
                            document.querySelector('.turn').style.color = 'white';
                            this.gameStart = false;
                            return alert('It\'s a Tie!');
                        }else{
                            document.querySelector('.turn').textContent = 'Player 1\'s turn';
                            return this.currPlayer = 1;
                        }
    
                    }
                }
            }
        }
    
    }
}

new Game();

// //Reset Button++++++++++++++++++++
document.querySelector('.reset').addEventListener('click',() => location.reload());