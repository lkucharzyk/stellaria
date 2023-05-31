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
            size: 5,
            maxSize: 40,
            growRate: 0.01,
            cost: 0.01,
        };
        this.leafs = {
            size: 1,
            growRate: 0.002,
            cost: 0.015
        };
        this.flowers = {
            size: 0,
            quantity: 0,
            growRate: 0.01,
            cost: 0.03,
        };
        this.assimilationPower = 0.1;
        this.carbohydrates = 2.5;
        this.maxCarbohydrates = 5;

        this.waterSupply = 5;
        this.watered = true;
    }

    growRoot(){
        if(this.root.size < this.root.maxSize){
            if(this.carbohydrates > 0.1){
                sounds.leafs.play();
                this.carbohydrates -= this.root.cost;
                this.root.size = this.root.size + this.root.growRate;
            }else{
                sounds.creak.play();
                sounds.leafs.pause();
                canvas.graphData.ui.danger = true;
            }
        }else{
            console.log('root max size');
        }
        DevOutput.renderOutput();
    }

    growLeafs(){
        if(this.carbohydrates > 0.1){
            sounds.leafs.play();
            this.carbohydrates -= this.leafs.cost;
            this.leafs.size = this.leafs.size + +this.leafs.growRate;
            canvas.graphData.plant.leafsHeight = plant.leafs.size * 60
            canvas.graphData.plant.leafRowsSize = canvas.graphData.plant.leafRowsSize.map(entry => {
                if (entry < 200){
                    return entry += 0.07
                }else{
                    return entry;
                }
            });
        }else{
            canvas.graphData.ui.danger = true;
            sounds.creak.play();
            sounds.leafs.pause();
        }
        DevOutput.renderOutput();   
    }

    growFlowers(){
        if(this.carbohydrates > 0.1){
            sounds.leafs.play();
            this.carbohydrates -= this.flowers.cost;
            this.flowers.size = this.flowers.size + +this.flowers.growRate;
            this.flowers.quantity = Math.floor(this.flowers.size / 10); 
        }else{
            canvas.graphData.ui.danger = true;
            sounds.creak.play();
            sounds.leafs.pause();
        }
        DevOutput.renderOutput();   
    }
}

class Habitat{
    constructor(){
        this.day = 1;
        this.maxDay = 200;

        this.weather = 'rainy'

        this.waterLevel = -2;
        this.minWeterLevel = -40;

       setInterval( () =>this._dayPass(), 1000); // one day - 1s
    }

    _randomWeather(){
        const randomNumber =random(1, 11);
        if(this.day <= 30){
           if(randomNumber <= 5){
                this.weather = 'rainy';
           }else if(randomNumber >= 8){
                this.weather = 'cloudy';
           }else{
            this.weather = 'sunny';
           }
        }else if(this.day > 30 && this.day < 100){
            if(randomNumber <= 3){
                this.weather = 'rainy';
           }else if(randomNumber >= 8){
                this.weather = 'cloudy';
           }else{
                this.weather = 'sunny';
           }    
        }else{
            if(randomNumber <= 2){
                this.weather = 'rainy';
           }else if(randomNumber >= 8){
                this.weather = 'cloudy';
           }else{
                this.weather = 'sunny';
            }
        }
        if(this.day <= 6 && this.weather === 'sunny'){
            this.weather = 'cloudy';
        }
    }

    _addCarbohydrates(){
        let weatherFactor;
        switch(this.weather){
            case 'rainy':
                weatherFactor = 1;
            break;
            case 'cloudy':
                weatherFactor = 1.5;
            break;
            case 'sunny':
                weatherFactor = 3;
            break;
        }
        if(plant.carbohydrates < plant.maxCarbohydrates){
            plant.carbohydrates = plant.carbohydrates + (plant.leafs.size * weatherFactor * plant.assimilationPower);
        }
        if(plant.carbohydrates > plant.maxCarbohydrates){
            plant.carbohydrates = plant.maxCarbohydrates;
        }
    }

    _setWaterLevel(){
        switch(this.weather){
            case 'rainy':
               if (this.waterLevel !== 0){
                this.waterLevel +=0.5;
               }
            break;
            case 'cloudy':
                if (this.waterLevel > this.minWeterLevel){
                    this.waterLevel -=0.5;
                } 
            break;
            case 'sunny':
                if (this.waterLevel > this.minWeterLevel){
                    this.waterLevel -=1;
                } 
            break;
        }
        if(plant.root.size + habitat.waterLevel >= 0){
            plant.watered = true;
        }else{
            plant.watered = false;
        }
    }

    _dayPass(){
        this._addCarbohydrates();
        this._setWaterLevel();
        if(plant.watered){
            if(plant.waterSupply < 5){
                plant.waterSupply += 1
            } 
        }else{
            if(plant.waterSupply > 0){
                plant.waterSupply -=1;
            }
        }
        if(plant.waterSupply < 1){
           // console.log('gameOver');
            app.gameOver();
        }
        

        //data for drawing weather marker
            if(habitat.day < habitat.maxDay /7){
                canvas.graphData.weather.posX += 3;
                canvas.graphData.weather.posY -= 2;
            }else if((habitat.day < (habitat.maxDay /7) *2 )){
                canvas.graphData.weather.posX += 4;
                canvas.graphData.weather.posY -= 2;
            }else if((habitat.day < (habitat.maxDay /7) *3 )){
                canvas.graphData.weather.posX += 3;
                canvas.graphData.weather.posY -= 1;
            }else if((habitat.day < (habitat.maxDay /7) *4 )){
                canvas.graphData.weather.posX += 2;
            }else if((habitat.day < (habitat.maxDay /7) *5 )){
                canvas.graphData.weather.posX += 3;
                canvas.graphData.weather.posY += 1;
            }else if((habitat.day < (habitat.maxDay /7) *6 )){
                canvas.graphData.weather.posX += 4;
                canvas.graphData.weather.posY += 2;
            }else if((habitat.day < (habitat.maxDay /7) *7 )){
                canvas.graphData.weather.posX += 3;
                canvas.graphData.weather.posY += 2;
            }
        
        if (this.day < this.maxDay){
            this.day+=1;
        }
        
        if(this.day % 5 === 0){
            this._randomWeather();
        }
        DevOutput.renderOutput()
    }

}

class DevOutput{
    static renderOutput(){
        const devOutputEl = document.querySelector('#dev-output');
       devOutputEl.innerHTML = `Root: ${plant.root.size.toFixed(2)}, Leafs: ${plant.leafs.size.toFixed(2)}, Flowers: ${plant.flowers.size.toFixed(2)}, Flowers Quanity: ${plant.flowers.quantity.toFixed(2)}  <br>
       Day: ${habitat.day} Weather: ${habitat.weather} Carbo: ${plant.carbohydrates.toFixed(2)} <br> WaterSupp: ${plant.waterSupply} Water lvl: ${habitat.waterLevel}`;
    }
}

class Canvas{
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.graphData ={
            plant:{
                leafsHeight : plant.leafs.size * 60,
                maxWidth : 500,
                maxHeight: 550,
                leafRowsSize : [50],
                leafSizeRatio: 0
            },
            ui:{
                topLine: 0,
                rightLine : 0,
                width: 0,
                height: 0,
                danger: false
            },
            weather:{
                posX : 0,
                posY : 0,
            },
            colors:{
                skyblue :'#2e778f',
                gold: '#D1B000',
                plantGreen: '#447629'
            }
        }

        this.asets ={
            
        }

        this.imgPromises = [];

        this.asets.emptyBottle = new Image(100, 100);
        this.asets.emptyBottle.src = './asets/img/water-bottle-empty.png';

        this.asets.fullBottle = new Image(100, 100);
        this.asets.fullBottle.src = './asets/img/water-bottle-full.png';

        this.asets.imgRoot = new Image(100, 100);
        this.asets.imgRoot.src = './asets/img/root.jpg';

        this.asets.imgLeafRight = new Image(100, 100);
        this.asets.imgLeafRight.src = './asets/img/leaf-right.png';
        
        this.asets.imgLeafLeft = new Image(100, 100);
        this.asets.imgLeafLeft.src = './asets/img/leaf-left.png';

        this.asets.flower = new Image(100, 100);
        this.asets.flower.src = './asets/img/flower.png';
        
        this.asets.sunny = new Image(100, 100);
        this.asets.sunny.src = './asets/img/sunny.png';

        this.asets.cloudy = new Image(100, 100);
        this.asets.cloudy.src = './asets/img/cloudy.png';

        this.asets.rainy = new Image(100, 100);
        this.asets.rainy.src = './asets/img/rainy.png';



        Object.values(this.asets).forEach(img => {
            const promise = new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })
            this.imgPromises.push(promise);
        });

        this.adjustCanvasToScreen()
       // ScreenOrientation.onchange = this.adjustCanvasToScreen.bind(this);

    }
    adjustCanvasToScreen(){
        //check if is need to add horizontal or vertical space to fill screen
        let fillScreen;

        if(window.screen.height * (9/16) < window.screen.width){
            fillScreen = "horizontal";
        }else{
            fillScreen = "vertical";
        }
        
        if(fillScreen === "horizontal"){
            const ratio = document.querySelector('html').clientWidth / document.querySelector('html').clientHeight
            this.ctx.canvas.height = 1280;
            this.ctx.canvas.width  =  this.ctx.canvas.height *ratio;
            this.canvas.style.height = `${document.querySelector('html').clientHeight}px`;
        }else{
            const ratio = document.querySelector('html').clientHeight / document.querySelector('html').clientWidth;
            this.ctx.canvas.width  = 720;
            this.ctx.canvas.height = this.ctx.canvas.width *ratio
            this.canvas.style.width = '100%'
        }
    }

    drawInit(){
        requestAnimationFrame(this._drawHabitatTopside.bind(this));
        requestAnimationFrame(this.drawDayAndWeather.bind(this));
        requestAnimationFrame(this._drawHabitatBotside.bind(this));
        requestAnimationFrame(this.drawWaterLevel.bind(this));
        requestAnimationFrame(this.drawLeafs.bind(this));
        requestAnimationFrame(this.drawRoot.bind(this));
        requestAnimationFrame(this.drawFlowers.bind(this))
        requestAnimationFrame(this.drawUI.bind(this));
        requestAnimationFrame(this._drawDividers.bind(this));
        requestAnimationFrame(this._drawInteractiveZone.bind(this));
        requestAnimationFrame(this._clearCanvas.bind(this));
    }

    drawUI(){
        this.graphData.ui.topLine = app.interactiveZoneC.posY + 20;
        this.graphData.ui.rightLine = app.interactiveZoneC.posX +  app.interactiveZoneC.width - 20;
        this.graphData.ui.width = 170;
        this.graphData.ui.height = 100;

        //water supplies
        function drawBottle(full, order){
            if(full){
                   this.ctx.drawImage(this.asets.fullBottle, this.graphData.ui.rightLine - order * 35, this.graphData.ui.topLine,  50, 50)
            }else{
                this.ctx.drawImage(this.asets.emptyBottle, this.graphData.ui.rightLine - order * 35, this.graphData.ui.topLine,  50, 50)
            }
        }

        for(let i = 1; i <= 5; i++){
            if(i + plant.waterSupply <= 5){
                drawBottle.bind(this, false, i)()
            }else{
               drawBottle.bind(this, true, i)()
            } 
        }

        //carbohydrates bar
        this.ctx.save()
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1
        this.ctx.beginPath();
        this.ctx.roundRect(this.graphData.ui.rightLine - this.graphData.ui.width , this.graphData.ui.topLine + 60,  this.graphData.ui.width, 30, 20)
        this.ctx.stroke();

        const barRange = (plant.carbohydrates * this.graphData.ui.width) /plant.maxCarbohydrates; 
        this.ctx.fillStyle = this.graphData.colors.gold;
        this.ctx.beginPath();
        this.ctx.roundRect(this.graphData.ui.rightLine - this.graphData.ui.width, this.graphData.ui.topLine + 60, barRange , 30, 20)
        this.ctx.fill();

        if(this.graphData.ui.danger){
            this.ctx.strokeStyle = "red";
            this.ctx.lineWidth = 3
            this.ctx.beginPath();
            this.ctx.roundRect(this.graphData.ui.rightLine- this.graphData.ui.width -3, this.graphData.ui.topLine + 60 -3,  this.graphData.ui.width +3, 33, 20)
            this.ctx.stroke();
        }
        this.ctx.restore()
        requestAnimationFrame(this.drawUI.bind(this))
    }

    drawWaterLevel(){
        this.ctx.save()
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth = 5;
        this.ctx.globalAlpha = 0.6;

        this.ctx.beginPath();
        this.ctx.moveTo(0, app.interactiveZoneC.botsideDivider -habitat.waterLevel *12 +5);
        this.ctx.lineTo(this.ctx.canvas.width, app.interactiveZoneC.botsideDivider - habitat.waterLevel *12 +5);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(0, app.interactiveZoneC.botsideDivider - habitat.waterLevel *12 +5, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "rgba(31, 41, 153, 0.3)";
        this.ctx.fill();
        this.ctx.restore()

        if(plant.watered){
            this._drawHydrated();
        }
        requestAnimationFrame(this.drawWaterLevel.bind(canvas));
    };

    //simple
    drawRoot(){
        this.ctx.drawImage(this.asets.imgRoot, app.interactiveZoneC.werticalDivider - 15, app.interactiveZoneC.botsideDivider, 30, plant.root.size * 12);
        if(plant.watered){
            this._drawHydrated();
        }
        requestAnimationFrame(canvas.drawRoot.bind(canvas));
    }

    drawLeafs(){
        //draw stalk
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.graphData.colors.plantGreen;
        this.ctx.lineWidth = 15;

        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafsHeight);
        this.ctx.stroke();
        this.ctx.restore()

        //draw leafs        
        if(this.graphData.plant.leafsHeight / 140  > this.graphData.plant.leafRowsSize.length ){
            this.graphData.plant.leafRowsSize.push(30);
        }    

        for (let i = 0; i < this.graphData.plant.leafRowsSize.length; i++){
            if(i === 0){
                this._drawSingleLeafRow(i, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafRowsSize[i] *0.625 - 20);
            }else{
                this._drawSingleLeafRow(i, app.interactiveZoneC.botsideDivider - i * 130 - this.graphData.plant.leafRowsSize[i] *0.625);
            }
        }
        requestAnimationFrame(canvas.drawLeafs.bind(canvas));

    }

    drawFlowers(){
        //draw divider betwen leafs an flowers
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(app.interactiveZoneC.posX, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafsHeight);
        this.ctx.lineTo(app.interactiveZoneC.posX + app.interactiveZoneC.width, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafsHeight);
        this.ctx.stroke();
        this.ctx.restore()

        //placeholder
        const flowerSize = plant.flowers.size *5 + 10;
        this.ctx.drawImage(this.asets.flower, app.interactiveZoneC.werticalDivider - flowerSize /2, app.interactiveZoneC.botsideDivider - this.graphData.plant.leafsHeight - flowerSize, flowerSize, flowerSize);
        
        this.ctx.save()
        this.ctx.font = "50px sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`${plant.flowers.quantity}`, app.interactiveZoneC.werticalDivider + 10, app.interactiveZoneC.botsideDivider- this.graphData.plant.leafsHeight - flowerSize - 10)
        this.ctx.restore()

        requestAnimationFrame(this.drawFlowers.bind(this))
    }

    drawDayAndWeather(){
        const imgSize = 100;
        
        let aset;
        switch (habitat.weather){
            case 'sunny':
                aset = this.asets.sunny;
            break;
            case 'cloudy':
                aset = this.asets.cloudy;
            break;    
            case 'rainy':
                aset = this.asets.rainy;
            break;
        }
        this.ctx.drawImage(aset, this.graphData.weather.posX, this.graphData.weather.posY, imgSize, imgSize)
        requestAnimationFrame(this.drawDayAndWeather.bind(this))
    }

    _clearCanvas(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    _drawHydrated(){
        this.ctx.save()
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider + plant.root.size *12);
        this.ctx.stroke();
        this.ctx.restore()
    }

    _drawHabitatTopside(){
        this.ctx.save()
       this.ctx.fillStyle = this.graphData.colors.skyblue;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.restore()
        requestAnimationFrame(this._drawHabitatTopside.bind(this));
    }

    _drawHabitatBotside(){
        this.ctx.save()
        this.ctx.fillStyle = "#332300";
        this.ctx.fillRect(0, app.interactiveZoneC.botsideDivider, this.ctx.canvas.width, this.ctx.canvas.height);

        //draw minimal water level
        this.ctx.fillStyle = '#1c1c1c';
        this.ctx.fillRect(0, app.interactiveZoneC.botsideDivider + 40 *12, this.ctx.canvas.width, this.ctx.canvas.height);
        requestAnimationFrame(this._drawHabitatBotside.bind(this))
        this.ctx.restore()
    }
    
    _drawInteractiveZone(){
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        if(app.interactiveZoneC.rest === 'horizontal'){
            this.ctx.rect(app.interactiveZoneC.posX +3, 3, app.interactiveZoneC.width -3, app.interactiveZoneC.height -3);
        }else{
            this.ctx.rect(3, app.interactiveZoneC.posY +3, app.interactiveZoneC.width -3, app.interactiveZoneC.height -3);
        }
        this.ctx.stroke();
        this.ctx.restore()
        requestAnimationFrame(this._drawInteractiveZone.bind(this));
    }

    _drawDividers(){
        //for dev needs and tutotrial
        this.ctx.save()
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.3;

        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZoneC.posX, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.posX + app.interactiveZoneC.width, app.interactiveZoneC.botsideDivider);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.posY);
        this.ctx.stroke();
        this.ctx.restore()
        requestAnimationFrame(this._drawDividers.bind(this));
    }

    _drawSingleLeafRow(id, leafsHeight){
        const leafSizeFactor = 1;

        this.ctx.save()
        this.ctx.drawImage(this.asets.imgLeafLeft, app.interactiveZoneC.werticalDivider - this.graphData.plant.leafRowsSize[id] * leafSizeFactor, leafsHeight, this.graphData.plant.leafRowsSize[id] * leafSizeFactor, this.graphData.plant.leafRowsSize[id] * leafSizeFactor *0.625);

         this.ctx.drawImage(this.asets.imgLeafRight, app.interactiveZoneC.werticalDivider, leafsHeight, this.graphData.plant.leafRowsSize[id] * leafSizeFactor, this.graphData.plant.leafRowsSize[id] * leafSizeFactor *0.625);
         this.ctx.restore()
    }

}

class Sounds{
    constructor(){
        this.err = new Audio('/asets/sounds/erro.mp3');
        this.leafs = new Audio('/asets/sounds/leaves.mp3');
        this.leafs.playbackRate = 3;
        this.creak = new Audio('/asets/sounds/creak.mp3');
        this.creak.playbackRate = 10;
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

    gameOver(){

    }

    _adjustinteractiveZoneC(){
                //check if is need to add horizontal or vertical space to fill screen
                let fillScreen;

                if(window.screen.height * (9/16) < window.screen.width){
                    fillScreen = "horizontal";
                }else{
                    fillScreen = "vertical";
                }

        if(fillScreen === 'horizontal'){
            this.interactiveZoneC.height = canvas.ctx.canvas.height; 
            this.interactiveZoneC.width = this.interactiveZoneC.height * (9/16);
            this.interactiveZoneC.posX = (canvas.ctx.canvas.width/2 - this.interactiveZoneC.width /2);
            this.interactiveZoneC.rest = 'horizontal';

            this.interactiveZoneW.height = window.innerHeight; //window.screen.height 
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
            this.interactiveZoneW.rest = 'vertical';
        }


        this.interactiveZoneC.botsideDivider = this.interactiveZoneC.height / (100 / 60)  + this.interactiveZoneC.posY;
        this.interactiveZoneC.werticalDivider = this.interactiveZoneC.width / 2 + this.interactiveZoneC.posX ;

        this.interactiveZoneW.botsideDivider = this.interactiveZoneW.height / (100 / 60)  + this.interactiveZoneW.posY;
        this.interactiveZoneW.werticalDivider = this.interactiveZoneW.width / 2 + this.interactiveZoneW.posX;

        //set addtional values for canvas
        canvas.graphData.weather.posX = this.interactiveZoneC.posX;
        canvas.graphData.weather.posY = this.interactiveZoneC.posY +750;
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
            }else{
                grow = setInterval(plant.growFlowers.bind(plant), 10);
            }
            window.addEventListener('pointerup', ()=>{
                clearInterval(grow);
                canvas.graphData.ui.danger = false;
                //pause feedback sounds
                sounds.leafs.pause();
                sounds.creak.pause();
            })
        }
        
    }
}



const plant = new Plant;
const habitat = new Habitat;
const canvas = new Canvas;
const sounds = new Sounds;
const app = new App;

document.addEventListener("scroll", (event) => { 
    window.scrollTo(document.querySelector('canvas').offsetWidth /2 - window.innerWidth /2, document.querySelector('canvas').offsetHeight /2 - window.innerHeight /2);
});

function init(){
    Promise.all(canvas.imgPromises)
    .then( ()=>{
         canvas.drawInit();
         DevOutput.renderOutput();
         //requestAnimationFrame(canvas.drawDayAndWeather.bind(canvas))
    })
}

document.addEventListener('DOMContentLoaded', init);
