function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

class Plant{
    constructor(){
        this.root = {
            size: 1,
            growRate: 0.01
        };
        this.leafs = {
            size: 1,
            growRate: 1
        };
        this.flowers = {
            size: 0,
            growRate: 0.2
        };

        this.carbohydrates = 0;
        
    }

    growRoot(){
        this.root.size += this.root.growRate;
        devOutput.renderOutput();
        canvas.drawRoot();
    }
}

class devOutput{
    static renderOutput(){
        const devOutputEl = document.querySelector('#dev-output');
        devOutputEl.innerHTML = `Root: ${plant.root.size}, Leafs: ${plant.leafs.size}, Flowers: ${plant.flowers.size}`;
    }
}

class Canvas{
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.canvas.width  = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;

    }

    draw(){
        //draw black backgorund 
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        //draw interactive zone 
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        if(app.interactiveZone.rest === 'horizontal'){
            this.ctx.rect(app.interactiveZone.posX , 0 , app.interactiveZone.width, app.interactiveZone.height);
        }else{
            this.ctx.rect(0, app.interactiveZone.posY, app.interactiveZone.width, app.interactiveZone.height);
        }
        this.ctx.stroke();
    }
    //simple
    drawRoot(){
        const img = new Image(10, 10);
        img.src = './asets/img/root.jpg';
        this.ctx.drawImage(img, app.interactiveZone.werticalDivider, app.interactiveZone.botsideDivider +plant.root.size * 10, 40, 20);
    }
}

class App{
    constructor(){
        this.interactiveZone = {
            posX : 0,
            posY :0,
            width : 0,
            height : 0,
            rest : '',
            botsideDivider : 0,
            werticalDivider: 0,
        }
        this._adjustInteractiveZone();
        this._adjustControls();
    }

    _adjustInteractiveZone(){

        if(window.innerHeight < window.innerWidth){
            this.interactiveZone.height = canvas.ctx.canvas.height;
            this.interactiveZone.width = this.interactiveZone.height * (9/16);
            this.interactiveZone.posX = (canvas.ctx.canvas.width - this.interactiveZone.width) /2;
            this.interactiveZone.rest = 'horizontal';
        }else{
            this.interactiveZone.width = canvas.ctx.canvas.width;
            this.interactiveZone.height = this.interactiveZone.width * (16/ 9);
            this.interactiveZone.posY = (canvas.ctx.canvas.height - this.interactiveZone.height) /2;
            this.interactiveZone.rest = 'vertical';

        }

        this.interactiveZone.botsideDivider = this.interactiveZone.height / (100 / 60)  + this.interactiveZone.posY;
        this.interactiveZone.werticalDivider = this.interactiveZone.width / 2 + this.interactiveZone.posX ;
    }

    _adjustControls(){
        let hold = false;
        window.addEventListener('mousedown', e =>{
            if(e.clientX < this.interactiveZone.posX || 
                e.clientX > this.interactiveZone.posX + this.interactiveZone.width || 
                e.clientY < this.interactiveZone.posY || 
                e.clientY > this.interactiveZone.posY + this.interactiveZone.height){
                return
            }else{
                hold = true
                let grow;
                if(e.clientY > this.interactiveZone.botsideDivider){
                     grow = setInterval(plant.growRoot.bind(plant), 10);
                }
                window.addEventListener('mouseup', ()=>{
                    clearInterval(grow);
                })
            }
            
        })
    }
}

const canvas = new Canvas;
const plant = new Plant;
const app = new App;
devOutput.renderOutput();
canvas.draw();

