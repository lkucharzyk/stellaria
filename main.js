function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

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
        this.root.size = (+this.root.size + +this.root.growRate).toFixed(2);
        devOutput.renderOutput();
        requestAnimationFrame(canvas.drawRoot.bind(canvas));
    }

    growLeafs(){
        this.leafs.size = (+this.leafs.size + +this.leafs.growRate).toFixed(2);

        canvas.graphData.plant.leafRowsSize = canvas.graphData.plant.leafRowsSize.map(entry => entry += 0.1);
        canvas.graphData.plant.height =  (40 + plant.leafs.size * 15).toFixed(2);
        requestAnimationFrame(canvas.drawLeafs.bind(canvas));
        
        devOutput.renderOutput();
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
        //this.ctx.canvas.width  = 720;
       //this.ctx.canvas.height = 1280;


        this.graphData ={
            plant:{
                height : 40,
                maxWidth : 500,
                maxHeight: 550,
                leafRowsSize : [100],
                leafSizeRatio: 0
            }
        }

        this.asets ={
            
        }
        this.adjustCanvasToScreen()
       // ScreenOrientation.onchange = this.adjustCanvasToScreen.bind(this);

    }
    adjustCanvasToScreen(){
        if(window.innerHeight < window.innerWidth){

            if(window.mobileCheck()){
                alert('To play Stellaria, please change device orientation to portrait, then refresh page');
            }
            this.ctx.canvas.height = 1280;
            this.ctx.canvas.width  =  4000;
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
        }, 200);
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
            this.ctx.drawImage(this.asets.imgLeafRight, app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafRowsSize[0] *0.625 - this.graphData.plant.height / 2, this.graphData.plant.leafRowsSize[0], this.graphData.plant.leafRowsSize[0] *0.625);
        }
        this.asets.imgLeafLeft = new Image(100, 100);
        this.asets.imgLeafLeft.src = './asets/img/leaf-left.png';
        this.asets.imgLeafLeft.onload = () =>{
            this.ctx.drawImage(this.asets.imgLeafLeft, app.interactiveZoneC.werticalDivider - this.graphData.plant.leafRowsSize[0], app.interactiveZoneC.botsideDivider -this.graphData.plant.leafRowsSize[0] *0.625 - this.graphData.plant.height / 2, this.graphData.plant.leafRowsSize[0], this.graphData.plant.leafRowsSize[0] *0.625);

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


    drawLeafs(){
        this._clearLeafs();

        //draw stalk
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        this.ctx.strokeStyle = "#447629";
        this.ctx.lineWidth = 15;

        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider - this.graphData.plant.height);
        this.ctx.stroke();

        //draw leafs        
        console.log(this.graphData.plant.height);     
        if(this.graphData.plant.height / 150  > this.graphData.plant.leafRowsSize.length ){
            this.graphData.plant.leafRowsSize.push(30);
        }

        const leafGrowRatio = 2;

        console.log(this.graphData.plant.leafRowsSize)
    

        for (let i = 0; i < this.graphData.plant.leafRowsSize.length; i++){
            if(i === 0){
                this._drawSingleLeafRow(i, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafRowsSize[i] *0.625 - this.graphData.plant.height / 2);
            }else{
                this._drawSingleLeafRow(i, app.interactiveZoneC.botsideDivider - i * 150 - this.graphData.plant.leafRowsSize[i]);
            }
        }

    }



    _drawSingleLeafRow(id, leafsHeight){
        //this "if" prevent from growing mature leafs
        console.log(this.graphData.plant.leafRowsSize);
        if(this.graphData.plant.leafRowsSize[id] < 200){

           this.ctx.drawImage(this.asets.imgLeafLeft, app.interactiveZoneC.werticalDivider - this.graphData.plant.leafRowsSize[id], leafsHeight, this.graphData.plant.leafRowsSize[id], this.graphData.plant.leafRowsSize[id] *0.625);

           this.ctx.drawImage(this.asets.imgLeafRight, app.interactiveZoneC.werticalDivider, leafsHeight, this.graphData.plant.leafRowsSize[id], this.graphData.plant.leafRowsSize[id] *0.625);
        }else{

        }
    }

    _clearLeafs(){
        this.ctx.clearRect( app.interactiveZoneC.werticalDivider - this.graphData.plant.maxWidth /2, app.interactiveZoneC.botsideDivider - this.graphData.plant.maxHeight, this.graphData.plant.maxWidth, this.graphData.plant.maxHeight);
        this.ctx.fillStyle = "#2e778f";
        this.ctx.fillRect(app.interactiveZoneC.werticalDivider - this.graphData.plant.maxWidth /2, app.interactiveZoneC.botsideDivider - this.graphData.plant.maxHeight, this.graphData.plant.maxWidth, this.graphData.plant.maxHeight);
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
            this.interactiveZoneC.posX = (canvas.ctx.canvas.width/2 - this.interactiveZoneC.width /2);
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