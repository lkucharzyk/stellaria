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
        //const devOutputEl = document.querySelector('#dev-output');
       //devOutputEl.innerHTML = `Root: ${plant.root.size}, Leafs: ${plant.leafs.size}, Flowers: ${plant.flowers.size}`;
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


        this.graphData ={
            plant:{
                height : 40,
                maxWidth : 500,
                maxHeight: 550
            }
        }

        this.asets ={
            
        }
       screen.orientation.lock(); 
        if(window.innerHeight < window.innerWidth){
            this.ctx.canvas.height = 1280;
            this.ctx.canvas.width  = 3000;
            this.canvas.style.height = `100vh`;
            //this.canvas.style.height = '-webkit-fill-available';
            
        }else{
            this.ctx.canvas.width  = 720;
            this.ctx.canvas.height = 2200;
            this.canvas.style.width = '100%'
        }

        //set screen in center
        setTimeout(() => {
            console.log();
            window.scroll(document.querySelector('canvas').offsetWidth /2 - window.innerWidth /2, document.querySelector('canvas').offsetHeight /2 - window.innerHeight /2);
            document.querySelector('body').style.overflow = 'hidden';
        }, 1000);
    }

    draw(){
        //draw backgorund 
        this.ctx.fillStyle = "#2e778f";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = "#332300";
        this.ctx.fillRect(0, app.interactiveZoneC.botsideDivider, this.ctx.canvas.width, this.ctx.canvas.height);
    
        //draw interactive zone 
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        if(app.interactiveZoneC.rest === 'horizontal'){
            this.ctx.rect(app.interactiveZoneC.posX +3, 3, app.interactiveZoneC.width -3, app.interactiveZoneC.height -3);
        }else{
            this.ctx.rect(3, app.interactiveZoneC.posY +3, app.interactiveZoneC.width -3, app.interactiveZoneC.height -3);
        }
        this.ctx.stroke();
    }

    drawDividers(){
        //for dev needs and maybe tutotrial
        
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.2;

        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZoneC.posX, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.posX + app.interactiveZoneC.width, app.interactiveZoneC.botsideDivider);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.posY);
        this.ctx.stroke();
    }

    drawPlantStart(){
        //root
        this.asets.imgRoot = new Image(10, 10);
        this.asets.imgRoot.src = './asets/img/root.jpg';
        this.asets.imgRoot.onload = () =>{
            this.ctx.drawImage(this.asets.imgRoot, app.interactiveZoneC.werticalDivider - 20, app.interactiveZoneC.botsideDivider, 40, 30);
        }

        //leafs
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = "#447629";
       this.ctx.lineWidth = 15;

        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider - this.graphData.plant.height);
        this.ctx.stroke();

        this.asets.imgLeafRight = new Image(100, 100);
        this.asets.imgLeafRight.src = './asets/img/leaf-right.png';
        this.asets.imgLeafRight.onload = () =>{
            this.ctx.drawImage(this.asets.imgLeafRight, app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider - 50 - this.graphData.plant.height / 2, 80, 50);
        }
        this.asets.imgLeafLeft = new Image(100, 100);
        this.asets.imgLeafLeft.src = './asets/img/leaf-left.png';
        this.asets.imgLeafLeft.onload = () =>{
            this.ctx.drawImage(this.asets.imgLeafLeft, app.interactiveZoneC.werticalDivider - 80, app.interactiveZoneC.botsideDivider -50 - this.graphData.plant.height / 2, 80, 50);

        }
    }

    //simple
    drawRoot(){
        const img = new Image(10, 10);
        img.src = './asets/img/root.jpg';
        img.onload = () =>{
            this.ctx.drawImage(img, app.interactiveZoneC.werticalDivider - 15, app.interactiveZoneC.botsideDivider +plant.root.size * 10, 30, 10);
        }
    }

    clearLeafs(){
        this.ctx.clearRect( app.interactiveZoneC.werticalDivider - this.graphData.plant.maxWidth /2, app.interactiveZoneC.botsideDivider - this.graphData.plant.maxHeight, this.graphData.plant.maxWidth, this.graphData.plant.maxHeight);
        this.ctx.fillStyle = "#2e778f";
        this.ctx.fillRect(app.interactiveZoneC.werticalDivider - this.graphData.plant.maxWidth /2, app.interactiveZoneC.botsideDivider - this.graphData.plant.maxHeight, this.graphData.plant.maxWidth, this.graphData.plant.maxHeight);
    }

    drawLeafs(){
        this.clearLeafs();
        canvas.graphData.plant.height =  40 + plant.leafs.size * 15;

        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = "#447629";
        this.ctx.lineWidth = 15;

        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider - this.graphData.plant.height);
        this.ctx.stroke();

        const leafSizeRatio = plant.leafs.size * 7;
        this.ctx.drawImage(this.asets.imgLeafRight, app.interactiveZoneC.werticalDivider , app.interactiveZoneC.botsideDivider -50 - this.graphData.plant.height / 2, 80 + leafSizeRatio, 50 + leafSizeRatio,);
        this.ctx.drawImage(this.asets.imgLeafLeft, app.interactiveZoneC.werticalDivider - 80 - leafSizeRatio, app.interactiveZoneC.botsideDivider -50 - this.graphData.plant.height / 2, 80 + leafSizeRatio, 50 + leafSizeRatio);
        

    }
}

class App{
    constructor(){
        //values for scalable canvas
        this.interactiveZoneC = {
            posX : 0,
            posY :0,
            width : 720,
            height : 1280,
            rest : '',
            botsideDivider : 0,
            werticalDivider: 0,
        }
        //real values for window
        this.interactiveZoneW = {
            posX : 0,
            posY :0,
            width : 720,
            height : 1280,
            rest : '',
            botsideDivider : 0,
            werticalDivider: 0,
        }
        this._adjustinteractiveZoneC();
        this._adjustControls();
    }

    _adjustinteractiveZoneC(){
        if(window.innerHeight < window.innerWidth){
            this.interactiveZoneC.height = canvas.ctx.canvas.height;
            this.interactiveZoneC.width = this.interactiveZoneC.height * (9/16);
            this.interactiveZoneC.posX = (canvas.ctx.canvas.width - this.interactiveZoneC.width) /2;
            this.interactiveZoneC.rest = 'horizontal';

            this.interactiveZoneW.height = window.innerHeight;
            this.interactiveZoneW.width = this.interactiveZoneW.height * (9/16);
            this.interactiveZoneW.posX = window.innerWidth /2 - this.interactiveZoneW.width /2;
            this.interactiveZoneW.rest = 'horizontal';


        }else{
            this.interactiveZoneC.width = canvas.ctx.canvas.width;
            this.interactiveZoneC.height = this.interactiveZoneC.width * (16/ 9);
            this.interactiveZoneC.posY = (canvas.ctx.canvas.height - this.interactiveZoneC.height) /2;
            this.interactiveZoneC.rest = 'vertical';

            this.interactiveZoneW.width = window.innerWidth;
            this.interactiveZoneW.height = this.interactiveZoneW.width * (16/9);
            this.interactiveZoneW.posY = window.innerHeight /2 - this.interactiveZoneW.height /2;
            this.interactiveZoneW.rest = 'horizontal';
        }


        this.interactiveZoneC.botsideDivider = this.interactiveZoneC.height / (100 / 60)  + this.interactiveZoneC.posY;
        this.interactiveZoneC.werticalDivider = this.interactiveZoneC.width / 2 + this.interactiveZoneC.posX ;

        this.interactiveZoneW.botsideDivider = this.interactiveZoneW.height / (100 / 60)  + this.interactiveZoneW.posY;
        this.interactiveZoneW.werticalDivider = this.interactiveZoneW.width / 2 + this.interactiveZoneW.posX ;
    }

    _adjustControls(){
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                passiveSupported = true;
                return false;
                },
            };
            window.addEventListener('pointerdown', null, options);
            window.removeEventListener('pointerdown', null, options);
            } catch (err) {
            passiveSupported = false;
        }
        //disable context menu
        document.addEventListener("contextmenu", e => e.preventDefault());

        //console.log(`IzX ${this.interactiveZoneW.posX } IzY: ${this.interactiveZoneW.posY} IzW: ${this.interactiveZoneW.width} IzH: ${this.interactiveZoneW.height}`);
        document.addEventListener('pointerdown', this._handleControls.bind(this), passiveSupported ? { passive: false } : false)
    }

    _handleControls(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.clientX < this.interactiveZoneW.posX || 
            e.clientX > this.interactiveZoneW.posX + this.interactiveZoneW.width || 
            e.clientY < this.interactiveZoneW.posY || 
            e.clientY > this.interactiveZoneW.posY + this.interactiveZoneW.height){
            return
        }else{
            let grow;
            if(e.clientY >= this.interactiveZoneW.botsideDivider){
                grow = setInterval(plant.growRoot.bind(plant), 10);
            }else if(e.clientY < this.interactiveZoneW.botsideDivider && e.clientX >  this.interactiveZoneW.werticalDivider){
                grow = setInterval(plant.growLeafs.bind(plant), 10);
            }
            window.addEventListener('pointerup', ()=>{
                clearInterval(grow);
            })
        }
        
    }
}

const plant = new Plant;
const canvas = new Canvas;
const app = new App;

function init(){
    devOutput.renderOutput();
    canvas.draw();
    canvas.drawDividers();
    canvas.drawPlantStart();
}

document.addEventListener('DOMContentLoaded', init);