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
            growRate: 0.01
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
        requestAnimationFrame(canvas.drawRoot.bind(canvas));
    }

    growLeafs(){
        this.leafs.size += this.leafs.growRate;
        devOutput.renderOutput();
        requestAnimationFrame(canvas.drawLeafs.bind(canvas));
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
        // this.ctx.canvas.width  = window.innerWidth;
        // this.ctx.canvas.height = window.innerHeight;
        //this.ctx.canvas.width  = 720;
       //this.ctx.canvas.height = 1280;

        this.plantGraphData ={
            height : 20,
            maxWidth : 200,
            maxHeight: 300
        
        }
    }

    draw(){
        //draw backgorund 
        this.ctx.fillStyle = "#2e778f";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = "#332300";
        this.ctx.fillRect(0, app.interactiveZone.botsideDivider, this.ctx.canvas.width, this.ctx.canvas.height);
    
        //draw interactive zone 
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        if(app.interactiveZone.rest === 'horizontal'){
            this.ctx.rect(app.interactiveZone.posX , 0 , app.interactiveZone.width, app.interactiveZone.height);
        }else{
            this.ctx.rect(0, app.interactiveZone.posY, app.interactiveZone.width, app.interactiveZone.height);
        }
        this.ctx.stroke();
    }

    drawDividers(){
        //for dev needs and maybe tutotrial
        
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.2;

        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZone.posX, app.interactiveZone.botsideDivider);
        this.ctx.lineTo(app.interactiveZone.posX + app.interactiveZone.width, app.interactiveZone.botsideDivider);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZone.werticalDivider, app.interactiveZone.botsideDivider);
        this.ctx.lineTo(app.interactiveZone.werticalDivider, app.interactiveZone.posY);
        this.ctx.stroke();
    }

    drawPlantStart(){
        //root
        const imgRoot = new Image(10, 10);
        imgRoot.src = './asets/img/root.jpg';
        imgRoot.onload = () =>{
            this.ctx.drawImage(imgRoot, app.interactiveZone.werticalDivider - 15, app.interactiveZone.botsideDivider, 30, 20);
        }

        //leafs
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = "#447629";
       this.ctx.lineWidth = 8;

        this.ctx.moveTo(app.interactiveZone.werticalDivider, app.interactiveZone.botsideDivider);
        this.ctx.lineTo(app.interactiveZone.werticalDivider, app.interactiveZone.botsideDivider - this.plantGraphData.height);
        this.ctx.stroke();

        const imgLeafRight = new Image(10, 10);
        imgLeafRight.src = './asets/img/leaf-right.png';
        imgLeafRight.onload = () =>{
            this.ctx.drawImage(imgLeafRight, app.interactiveZone.werticalDivider, app.interactiveZone.botsideDivider - this.plantGraphData.height, 30, 20);
        }
        const imgLeafLeft = new Image(10, 10);
        imgLeafLeft.src = './asets/img/leaf-left.png';
        imgLeafLeft.onload = () =>{
            this.ctx.drawImage(imgLeafLeft, app.interactiveZone.werticalDivider - 30, app.interactiveZone.botsideDivider - this.plantGraphData.height, 30, 20);

        }
    }

    //simple
    drawRoot(){
        const img = new Image(10, 10);
        img.src = './asets/img/root.jpg';
        img.onload = () =>{
            this.ctx.drawImage(img, app.interactiveZone.werticalDivider - 15, app.interactiveZone.botsideDivider +plant.root.size * 10, 30, 10);
        }
    }

    drawLeafs(){
        this.ctx.clearRect( app.interactiveZone.werticalDivider - this.plantGraphData.maxWidth /2, app.interactiveZone.botsideDivider - this.plantGraphData.maxHeight, this.plantGraphData.maxWidth, this.plantGraphData.maxHeight)
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
        const canvasEl = document.querySelector('canvas');
        if(window.innerHeight < window.innerWidth){
            canvasEl.style.height =  `${window.innerHeight}px`;

            this.interactiveZone.height = canvas.ctx.canvas.height;
            this.interactiveZone.width = this.interactiveZone.height * (9/16);
            this.interactiveZone.posX = (canvas.ctx.canvas.width - this.interactiveZone.width) /2;
            this.interactiveZone.rest = 'horizontal';
            
        }else{
            canvasEl.style.width = '100%';

            this.interactiveZone.width = canvas.ctx.canvas.width;
            this.interactiveZone.height = this.interactiveZone.width * (16/ 9);
            this.interactiveZone.posY = (canvas.ctx.canvas.height - this.interactiveZone.height) /2;
            this.interactiveZone.rest = 'vertical';
        }

        this.interactiveZone.botsideDivider = this.interactiveZone.height / (100 / 60)  + this.interactiveZone.posY;
        this.interactiveZone.werticalDivider = this.interactiveZone.width / 2 + this.interactiveZone.posX ;

        //NIEDOROBIONE
        canvas.plantGraphData.maxHeight = this.interactiveZone.height - this.interactiveZone.botsideDivider;
        canvas.plantGraphData.maxWidth = this.interactiveZone.width - 100;;
    }

    _adjustControls(){
        //disable context menu
        document.addEventListener("contextmenu", (e) => {e.preventDefault()});

        document.addEventListener('pointerdown', e =>{
            if(e.clientX < this.interactiveZone.posX || 
                e.clientX > this.interactiveZone.posX + this.interactiveZone.width || 
                e.clientY < this.interactiveZone.posY || 
                e.clientY > this.interactiveZone.posY + this.interactiveZone.height){
                return
            }else{
                let grow;
                if(e.clientY >= this.interactiveZone.botsideDivider){
                    grow = setInterval(plant.growRoot.bind(plant), 10);
                }else if(e.clientY < this.interactiveZone.botsideDivider && e.clientX >  this.interactiveZone.werticalDivider){
                    grow = setInterval(plant.growLeafs.bind(plant), 10);
                }
                window.addEventListener('pointerup', ()=>{
                    clearInterval(grow);
                })
            }
            
        })
    }
}

const canvas = new Canvas;
const plant = new Plant;
const app = new App;

function init(){
    devOutput.renderOutput();
    canvas.draw();
    canvas.drawDividers();
   canvas.drawPlantStart();
}

document.addEventListener('DOMContentLoaded', init);