function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

 const przyspiesz = 2.0

class Plant{
    constructor(){
        this.root = {
            size: 5,
            maxSize: 63,
            growRate: 0.06,
            cost: 0.05,
        };
        this.leafs = {
            size: 1,
            growRate: 0.01,
            cost: 0.075
        };
        this.flowers = {
            size: 0,
            quantity: 0,
            growRate: 0.0125,
            cost: 0.15
        };
        this.assimilationPower = 0.1;
        this.carbohydrates = 2.5;
        this.maxCarbohydrates = 10;

        this.waterSupply = 5;
        this.maxWaterSupply = 10;
        this.watered = true;
    }

    growRoot(){
        if(this.root.size < this.root.maxSize){
            if(this.carbohydrates > 0.1){
                sounds.playSound('root');
                this.carbohydrates -= this.root.cost;
                this.root.size = this.root.size + this.root.growRate;
            }else{
                sounds.playSound('bad');
                canvas.graphData.ui.danger = true;
            }
        }else{
            canvas.graphData.plant.rootMaxAlert = true;
        }
        DevOutput.renderOutput();
    }

    growLeafs(){
        if(this.carbohydrates > 0.1){
            sounds.playSound('leafs');
            this.carbohydrates -= this.leafs.cost;
            this.leafs.size = this.leafs.size + +this.leafs.growRate;
        }else{
            canvas.graphData.ui.danger = true;
            sounds.playSound('bad');
        }
        DevOutput.renderOutput();   
    }

    growFlowers(){
        if(!canvas.graphData.plant.growPoints[0].ready || canvas.graphData.plant.activeFlowerGrowPoint === null){
            canvas.graphData.plant.flowerNotAllowedAlert = true;
            canvas.graphData.ui.danger = true;
            sounds.playSound('bad');
        }else{
            if(this.carbohydrates > 0.1){
                sounds.playSound('flowers');
                this.carbohydrates -= this.flowers.cost;
                this.flowers.size = this.flowers.size + +this.flowers.growRate;
                this.flowers.quantity = Math.floor(this.flowers.size); 
            }else{
                canvas.graphData.ui.danger = true;
                sounds.playSound('bad');
            }
        }
        DevOutput.renderOutput();   
    }
}

class Habitat{
    constructor(){
        this.day = 1;
        this.maxDay = 200;

        this.weather = 'rainy';

        this.waterLevel = -2;
        this.minWeterLevel = -63;

       this.dayInterval =setInterval( () =>this._dayPass(), 1000 /przyspiesz ); // one day - 1s
    }

    _randomWeather(){
        const randomNumber =random(1, 11);
        if(this.day <= 40){
           if(randomNumber <= 5){
                this.weather = 'rainy';
           }else if(randomNumber >= 7){
                this.weather = 'cloudy';
           }else{
                this.weather = 'sunny';
           }
        }else if(this.day > 40 && this.day < 100){
            if(randomNumber <= 4){
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
        if(this.waterLevel < this.minWeterLevel){
            this.waterLevel = this.minWeterLevel;
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
            if(plant.waterSupply < plant.maxWaterSupply){
                plant.waterSupply += 1
            } 
        }else{
            if(plant.waterSupply > 0){
                plant.waterSupply -=1;
            }
        }
        if(plant.waterSupply < 1){
            app.gameOver('water');
        }
        console.log(habitat.day);

        //data for drawing weather marker
            if(habitat.day < habitat.maxDay /7){
                canvas.graphData.weather.posX += 1.5;
                canvas.graphData.weather.posY -= 1;
            }else if((habitat.day < (habitat.maxDay /7) *2 )){
                canvas.graphData.weather.posX += 2;
                canvas.graphData.weather.posY -= 1;
            }else if((habitat.day < (habitat.maxDay /7) *3 )){
                canvas.graphData.weather.posX += 1.5;
                canvas.graphData.weather.posY -= 0.5;
            }else if((habitat.day < (habitat.maxDay /7) *4 )){
                canvas.graphData.weather.posX += 1;
            }else if((habitat.day < (habitat.maxDay /7) *5 )){
                canvas.graphData.weather.posX += 1.5;
                canvas.graphData.weather.posY += 0.5;
            }else if((habitat.day < (habitat.maxDay /7) *6 )){
                canvas.graphData.weather.posX += 2;
                canvas.graphData.weather.posY += 1;
            }else if((habitat.day < (habitat.maxDay /7) *7 )){
                canvas.graphData.weather.posX += 1.5;
                canvas.graphData.weather.posY += 1;
            }
        
        if (this.day < this.maxDay){
            this.day+=1;
        }else{
            app.gameOver('time');
        }
        //start play music -synchronzie with day pass
        sounds.playMusic();
        
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

class GrowPoint{
    constructor(frame, x, y){
        this.id = GrowPoint.incrementId(),
        this.frame = frame,
        this.x = x,
        this.y = y,
        this.ready = false,
        this.leaf =  {
            started: false,
            done: false,
            size: 0,
            encounteredFrame : null,
            endPoint: random(50, 98)
        },
        this.flower = {
            started: false,
            done: false,
            size: 0
        }
    }

    static incrementId() {
        return canvas.graphData.plant.growPoints.length;
    }
}

class Canvas{
    constructor() {
        this.canvas = document.querySelector('canvas#main');
        this.ctx = this.canvas.getContext('2d');

        this.moonCanvas = document.querySelector('canvas#moon');
        this.ctxMoon = this.moonCanvas.getContext('2d');

        this.skyCanvas = document.querySelector('canvas#bg-sky');
        this.ctxSky = this.skyCanvas.getContext('2d' , { alpha: false });

        this.soilCanvas = document.querySelector('canvas#bg-soil');
        this.ctxSoil = this.soilCanvas.getContext('2d');

        this.canvases = [this.canvas, this.moonCanvas, this.skyCanvas, this.soilCanvas]
        this.canvasesCtx = [this.ctx, this.ctxMoon, this.ctxSky, this.ctxSoil];

        this.graphData ={
            plant:{
                maxWidth : 500,
                maxHeight: 550,
                rootMaxAlert : false,
                flowerNotAllowedAlert: false,
                stalkWidth: 96,
                stalkHeight: 106,
                rootHeight: 66,
                leafsWidth: 26,
                leafsHeight: 12,
                flowerWidth: 20,
                flowerHeight: 18,
                lastFlowerQuanity: 0,
                activeFlowerGrowPoint: 0,
                growPoints: []
            },
            ui:{
                topLine: 0,
                rightLine : 0,
                width: 0,
                barHeight: 0,
                danger: false
            },
            weather:{
                posX : 0,
                posY : 0,
                cloudPassingInterval: null,
                cloudFrame: 0,
                rainInterval: null,
                rainFrame: 0
            },
            colors:{
                skyblue :'#3d575c',
                soilBrown: '#24272b',
                gold: '#D1B000',
                plantGreen: '#447629',
                waterBlue: '#4986ad'
            },

            asetScale: 4,
            wideAsetWidth : 3456,
            wideAsetHeight : 1276,
            asetsMainWidth: 384,
            asetsMainHeight: 688,
        
            fontBg: new FontFace("pixel", "url(./asets/fonts/Pixel-Madness.ttf)"),
            fontSm: new FontFace("pixelSm", "url(./asets/fonts/m3x6.ttf)")
            
        }

        this.preGameAsets ={}

        this.preGameAsetsPromises = [];

        this.preGameAsets.lilChiefPanel = new Image(2000, 2000);
        this.preGameAsets.lilChiefPanel.src = './asets/pngs/logobig.png';

        this.preGameAsets.menu = new Image(2000, 2000);
        this.preGameAsets.menu.src = './asets/pngs/hints.png';

        Object.values(this.preGameAsets).forEach(img => {
            const promise = new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })
            this.preGameAsetsPromises.push(promise);
        });

        this.asets ={}

        this.asetsPromises = [];

        this.asets.pauseGrid = new Image(100, 100);
        this.asets.pauseGrid.src = './asets/pngs/pausegrids_96x172.png';

        this.asets.grid = new Image(100, 100);
        this.asets.grid.src = './asets/pngs/sheet96x172.png';

        this.asets.imgBgBot = new Image(100, 100);
        this.asets.imgBgBot.src = './asets/pngs/backgrnd-bot.png';

        this.asets.imgBgStars = new Image(100, 100);
        this.asets.imgBgStars.src = './asets/pngs/stars_3456x1376.png';

        this.asets.imgBar = new Image(100, 100);
        this.asets.imgBar.src = './asets/pngs/bar24x100.png';

        this.asets.imgRoot = new Image(100, 100);
        this.asets.imgRoot.src = './asets/pngs/root_96x66.png';

        this.asets.imgStalk1 = new Image(100, 100);
        this.asets.imgStalk1.src = './asets/pngs/stalk_96x106_1.png'

        this.asets.imgLeafs = new Image(100, 100);
        this.asets.imgLeafs.src = './asets/pngs/leafes_26x12_1.png'

        this.asets.imgFlower = new Image(100, 100);
        this.asets.imgFlower.src = './asets/pngs/flower_20x18_1.png';

        this.asets.moon = new Image(100, 100);
        this.asets.moon.src = './asets/pngs/mooncycles20x16.png';

        this.asets.imgClouds = new Image(100, 100);
        this.asets.imgClouds.src = './asets/pngs/clouds3456x1376.png';

        this.asets.rain = new Image(100, 100);
        this.asets.rain.src = './asets/pngs/rain3456x1376.png';

        Object.values(this.asets).forEach(img => {
            const promise = new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })
            this.asetsPromises.push(promise);
        });


        this.adjustCanvasToScreen();
    }

    adjustCanvasToScreen(){
        //check if is need to add horizontal or vertical space to fill screen
        let fillScreen;

        if(window.screen.height * (384/688) < window.screen.width){
            fillScreen = "horizontal";
        }else{
            fillScreen = "vertical";
        }
           
        this.canvasesCtx.forEach(canvas =>{
            if(fillScreen === "horizontal"){
                const ratio = document.querySelector('html').clientWidth / document.querySelector('html').clientHeight
                canvas.canvas.getContext('2d').canvas.height = 688//1280;
                canvas.canvas.getContext('2d').canvas.width  =  (canvas.canvas.getContext('2d').canvas.height *ratio).toFixed();
            }else{
                const ratio = document.querySelector('html').clientHeight / document.querySelector('html').clientWidth;
                canvas.canvas.getContext('2d').canvas.width  =384 //720;
                canvas.canvas.getContext('2d').canvas.height =(canvas.canvas.getContext('2d').canvas.width *ratio).toFixed();
            }
            
            const scaleX = window.document.querySelector('html').clientWidth / canvas.canvas.getContext('2d').canvas.width;
            const scaleY = window.document.querySelector('html').clientHeight / canvas.canvas.getContext('2d').canvas.height;

            const scaleToFit = Math.min(scaleX, scaleY);
            const scaleToCover = Math.max(scaleX, scaleY);

            canvas.canvas.style.transformOrigin = "0 0"; //scale from top left
            canvas.canvas.style.transform = `scale(${scaleToFit})`;
        })

    }

    //this.ctxSoil.drawImage(this.asets.imgBgBot, this.canvas.width/2 - this.graphData.wideAsetWidth / 2 -250, this.canvas.height/2 - this.graphData.wideAsetHeight / 2 -73 , this.graphData.wideAsetWidth, this.graphData.wideAsetHeight)

    drawStartingPanels(){
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(this.preGameAsets.lilChiefPanel,  canvas.canvas.width /2 - 1500 /2,  canvas.canvas.height /2 -1216 /2, 1500, 1216);
        
        setTimeout(() => {
            this.drawMenu();
        }, 2000);
    }

    drawMenu(){
        this.ctx.save();
        this.ctx.fillStyle = this.graphData.colors.skyblue;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.restore()

        this.ctx.save()
        this.ctx.fillStyle = this.graphData.colors.soilBrown;
        this.ctx.fillRect(0, app.interactiveZoneC.botsideDivider, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.restore()

        this.ctx.drawImage(this.preGameAsets.menu, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, app.interactiveZoneC.height);

        document.querySelector('#start-menu').style.display = 'flex';
    }

    drawInit(){
        this.ctx.imageSmoothingEnabled = false;
        this.ctxMoon.imageSmoothingEnabled = false;
        this.ctxSky.imageSmoothingEnabled = false;
        this.ctxSoil.imageSmoothingEnabled = false;
        

        this.graphData.fontBg.load().then(font => {
            document.fonts.add(font);
        });
        this.graphData.fontSm.load().then(font => {
            document.fonts.add(font);
        });
        this.ctx.font = "normal 40px pixel"
        this.setGrowPoints(); 
        
        //draw statics
        this._drawBgStars();
        this._drawBgBot();
        this._drawMinimalWaterLevel(); 

        requestAnimationFrame(this.drawGame.bind(this))
    }

    drawGame(){
        this._clearCanvas();
        this.drawMoon();
        this.drawClouds();
       //this._drawGrid()
        this.drawWaterLevel();
        this.drawLeafs();
        this.drawRoot();
        this.drawFlowers()
        this.drawRain()
        this.drawUI();
        //this._drawDividers();
       // this._drawInteractiveZone();
        this._drawPauseGrid();

        requestAnimationFrame(this.drawGame.bind(this));
    }

    setGrowPoints(){
        this.graphData.plant.growPoints = [];
        this.graphData.plant.growPoints.push(new GrowPoint(47, 44, 34));
        this.graphData.plant.growPoints.push(new GrowPoint(58, 28, 25));
        this.graphData.plant.growPoints.push(new GrowPoint(89, 47, 53));
        this.graphData.plant.growPoints.push(new GrowPoint(104, 23, 44));
        this.graphData.plant.growPoints.push(new GrowPoint(115, 52, 22));
        this.graphData.plant.growPoints.push(new GrowPoint(139, 21, 59));
 	    this.graphData.plant.growPoints.push(new GrowPoint(142, 49, 64));
        this.graphData.plant.growPoints.push(new GrowPoint(207, 9, 70));
        this.graphData.plant.growPoints.push(new GrowPoint(209, 16, 81));
        this.graphData.plant.growPoints.push(new GrowPoint(209, 32, 73));
	    this.graphData.plant.growPoints.push(new GrowPoint(209, 48, 87));
        this.graphData.plant.growPoints.push(new GrowPoint(209, 63, 77));
        this.graphData.plant.growPoints.push(new GrowPoint(209, 64, 47));
    }

    drawCredits(){
        //black bg for html credits
        if(app.credits === true){
            this.ctx.save();
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
    }


    drawUI(){
        this.graphData.ui.barHeight = 100;
        this.graphData.ui.barWidth = 24;
        this.graphData.ui.width = this.graphData.ui.barWidth + 4;
        this.graphData.ui.posX = app.interactiveZoneC.posX + this.graphData.asetsMainWidth - this.graphData.ui.width;
        this.graphData.ui.posY = app.interactiveZoneC.posY + 12;

        //carbohydrates bar

        this.ctx.drawImage(this.asets.imgBar, this.graphData.ui.posX, this.graphData.ui.posY, this.graphData.ui.barWidth, this.graphData.ui.barHeight)
        
        this.ctx.save();
        const carboBarRange = +((plant.carbohydrates * (this.graphData.ui.barHeight - 16)) /plant.maxCarbohydrates).toFixed(); 
        this.ctx.fillStyle = '#549c5d';
        this.ctx.fillRect(this.graphData.ui.posX +8, this.graphData.ui.posY + this.graphData.ui.barHeight - carboBarRange -8, this.graphData.ui.barWidth - 16, carboBarRange)
        this.ctx.restore();
        
        if(this.graphData.ui.danger){
            this.ctx.fillStyle = 'rgba(209, 82, 82, 1)';
            this.ctx.fillRect(this.graphData.ui.posX +8, this.graphData.ui.posY +8, this.graphData.ui.barWidth - 16, this.graphData.ui.barHeight - 16)
            this.ctx.restore();
        }
        
        // //water supply bar

        this.ctx.drawImage(this.asets.imgBar, this.graphData.ui.posX, this.graphData.ui.posY + this.graphData.ui.barHeight + 4, this.graphData.ui.barWidth, this.graphData.ui.barHeight);

        this.ctx.save();
        const waterBarRange = (plant.waterSupply * (this.graphData.ui.barHeight -16)) /plant.maxWaterSupply; 
        this.ctx.fillStyle = '#3b74ad';
        this.ctx.fillRect(this.graphData.ui.posX +8, this.graphData.ui.posY + 2 * this.graphData.ui.barHeight - waterBarRange - 4, this.graphData.ui.barWidth - 16, waterBarRange)
        this.ctx.restore();
    }


    drawWaterLevel(){
        this.ctx.save()
        this.ctx.strokeStyle = '#3b74ad';
        this.ctx.lineWidth = 1 * this.graphData.asetScale;
        this.ctx.globalAlpha = 0.6;

        this.ctx.beginPath();
        this.ctx.moveTo(0, app.interactiveZoneC.botsideDivider -habitat.waterLevel *this.graphData.asetScale);
        this.ctx.lineTo(this.ctx.canvas.width, app.interactiveZoneC.botsideDivider -habitat.waterLevel *this.graphData.asetScale);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(0, app.interactiveZoneC.botsideDivider - habitat.waterLevel *this.graphData.asetScale, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "rgba(56, 112, 217, 0.3)";
        this.ctx.fill();
        this.ctx.restore()

        // if(plant.watered){
        //     this._drawHydrated();
        // }
    };

    drawRoot(){

       const totalFrames = 124;
       const rootFrame = (plant.root.size / plant.root.maxSize  * totalFrames).toFixed(0) -1; 
       this.ctx.drawImage(this.asets.imgRoot, rootFrame *this.graphData.plant.stalkWidth, 0, this.graphData.plant.stalkWidth, this.graphData.plant.rootHeight, app.interactiveZoneC.posX, app.interactiveZoneC.botsideDivider, app.interactiveZoneC.width, this.graphData.plant.rootHeight * this.graphData.asetScale);
        
    //  this.ctx.save()
    //  this.ctx.strokeStyle = 'brown';
    //  this.ctx.lineWidth = 16;
    //  this.ctx.beginPath();
    //  this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
    //  this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider + plant.root.size * this.graphData.asetScale);
    //  this.ctx.stroke();
    //  this.ctx.restore()

        
        // if(plant.watered){
        //     this._drawHydrated();
        // }
        if(this.graphData.plant.rootMaxAlert){
            this.ctx.save()
            this.ctx.font = "normal 50px pixelSm"
            this.ctx.fillStyle = "#d15252";
            this.ctx.fillText(`Root reached`, app.interactiveZoneC.werticalDivider , app.interactiveZoneC.posY + app.interactiveZoneC.height -83)
            this.ctx.fillText(`maximum size!`, app.interactiveZoneC.werticalDivider, app.interactiveZoneC.posY + app.interactiveZoneC.height -50)
            this.ctx.restore()
        }
    }

    drawLeafs(){
        this.ctx.save()
        //stalk
        //probably max leaf size = 25
        const frame = Math.floor(plant.leafs.size *45) - 45;
        this.ctx.drawImage(this.asets.imgStalk1, frame < 208 ? frame *this.graphData.plant.stalkWidth : 208 *this.graphData.plant.stalkWidth, 0, this.graphData.plant.stalkWidth, this.graphData.plant.stalkHeight, app.interactiveZoneC.posX , app.interactiveZoneC.posY, app.interactiveZoneC.width, this.graphData.plant.stalkHeight * this.graphData.asetScale);

        //leaf
        let nowGrowingPoints = 0;

        this.graphData.plant.growPoints.forEach(growPoint => {
            if(growPoint.leaf.started && !growPoint.leaf.done){
                nowGrowingPoints++;
            }
        })

        this.graphData.plant.growPoints.forEach(growPoint => {
            if(!growPoint.ready){
                if(frame >= growPoint.frame){
                    growPoint.ready = true;
                    if(growPoint.id === 0){
                        growPoint.leaf.started = true;
                        growPoint.leaf.encounteredFrame = frame;
                    }
                }
            }

            if(growPoint.leaf.started && !growPoint.leaf.done){
                growPoint.leaf.size = frame - growPoint.leaf.encounteredFrame;
                if(growPoint.leaf.size >= growPoint.leaf.endPoint){{
                    growPoint.leaf.done = true;
                }}
            }

            if(growPoint.leaf.started){
                const leafFrame = growPoint.leaf.size; 
                const xPosition = app.interactiveZoneC.posX + (growPoint.x - this.graphData.plant.leafsWidth /2)*this.graphData.asetScale;
                const yPosition = app.interactiveZoneC.posY +(this.graphData.plant.stalkHeight - growPoint.y - this.graphData.plant.leafsHeight +1) *this.graphData.asetScale;
    
                this.ctx.drawImage(this.asets.imgLeafs, leafFrame *this.graphData.plant.leafsWidth, 0, this.graphData.plant.leafsWidth, this.graphData.plant.leafsHeight,  xPosition, yPosition, this.graphData.plant.leafsWidth *this.graphData.asetScale, this.graphData.plant.leafsHeight * this.graphData.asetScale);
            }
            
        })

        if(nowGrowingPoints < 3){
            const growPointsToStart= this.graphData.plant.growPoints.filter(growPoint =>
                growPoint.leaf.started === false && growPoint.ready === true
            )
            if(growPointsToStart.length > 0){
                const index = random(0, growPointsToStart.length -1);
                growPointsToStart[index].leaf.started = true;
                growPointsToStart[index].leaf.encounteredFrame = frame;
            }
          }

        this.ctx.restore();  
    }

    randomNextGrowPoint(){
        const avabliveGrowPoints = this.graphData.plant.growPoints.filter(growPoint =>
            growPoint.ready === true && growPoint.flower.done === false
        )
        if(avabliveGrowPoints.length > 0){
            const index = random(0, avabliveGrowPoints.length -1);
            const id = avabliveGrowPoints[index].id;
            return id;
        }else{
            return null;
        }
    }

    drawFlowers(){
        this.ctx.save();

        if(this.graphData.plant.flowerNotAllowedAlert){
            this.ctx.save()
            this.ctx.fillStyle = "#d15252";
            this.ctx.font = "normal 50px pixelSm"
            this.ctx.fillText(`Grow more leafs`, app.interactiveZoneC.posX +20, app.interactiveZoneC.posY +330)
            this.ctx.fillText(`before start`, app.interactiveZoneC.posX +20, app.interactiveZoneC.posY +365)
            this.ctx.fillText(`growing flowers!`, app.interactiveZoneC.posX +20, app.interactiveZoneC.posY +395)
            this.ctx.restore()
        }

        this.graphData.plant.growPoints.forEach(growPoint => {
            if(this.graphData.plant.activeFlowerGrowPoint === growPoint.id){
                    growPoint.flower.size = plant.flowers.size - plant.flowers.quantity;
  
                    if(plant.flowers.quantity !== this.graphData.plant.lastFlowerQuanity){
                        this.graphData.plant.lastFlowerQuanity = plant.flowers.quantity;
                        growPoint.flower.done = true;
                       growPoint.flower.size = 1; 

                        this.graphData.plant.activeFlowerGrowPoint = this.randomNextGrowPoint();
                    }
            }else if(this.graphData.plant.activeFlowerGrowPoint === null){
                if(growPoint.ready && !growPoint.flower.done){
                    this.graphData.plant.activeFlowerGrowPoint = growPoint.id;
                }
            }

            if(growPoint.flower.done || this.graphData.plant.activeFlowerGrowPoint === growPoint.id){
                const totalFrames = 94;
                const flowerFrame = (growPoint.flower.size * totalFrames).toFixed(0) -1; 
                const xPosition = app.interactiveZoneC.posX + (growPoint.x - this.graphData.plant.flowerWidth /2)*this.graphData.asetScale;
                const yPosition = app.interactiveZoneC.posY + (this.graphData.plant.stalkHeight - growPoint.y  - this.graphData.plant.flowerHeight +1)*this.graphData.asetScale;
    
                this.ctx.drawImage(this.asets.imgFlower, flowerFrame *this.graphData.plant.flowerWidth, 0, this.graphData.plant.flowerWidth, this.graphData.plant.flowerHeight,  xPosition, yPosition, this.graphData.plant.flowerWidth *this.graphData.asetScale, this.graphData.plant.flowerHeight * this.graphData.asetScale);
            }
            
        })

        this.ctx.restore();  
    }

    drawMoon(){
        this.ctxMoon.save()
        const totalFrames = 15;
        const frame = (habitat.day/habitat.maxDay * totalFrames).toFixed(0); 
        const width = 20;
        const height = 16;
        this.ctxMoon.drawImage(this.asets.moon, frame * width, 0, width, height, this.graphData.weather.posX, this.graphData.weather.posY, width * this.graphData.asetScale, height* this.graphData.asetScale, width* this.graphData.asetScale);
        this.ctxMoon.restore()  
    }

    drawClouds(){
        let pass;
        let alpha;
        
        switch (habitat.weather){
            case 'sunny':
                
            break;
            case 'cloudy':
                pass = true;
                alpha = 0.5;
            break;    
            case 'rainy':
                alpha = 0.6;
                pass = true;
            break;
        } 

        if(pass){
            this.ctx.save()
            this.ctx.globalAlpha = alpha;

            this.ctx.drawImage(this.asets.imgClouds, this.canvas.width/2 - this.graphData.wideAsetWidth / 2, this.canvas.height/2 - this.graphData.wideAsetHeight / 2 - 20, this.graphData.wideAsetWidth, this.graphData.wideAsetHeight)
            this.ctx.restore()
        }
    }

    drawRain(){
        if(habitat.weather === 'rainy'){
            if(!this.graphData.weather.rainInterval){
                this.graphData.weather.rainInterval = setInterval(() => {
                    if(this.graphData.weather.rainFrame > 2){
                        this.graphData.weather.rainFrame =0;
                    }else{
                        this.graphData.weather.rainFrame ++;
                       
                    }  
                }, 100);
            }

            this.ctx.save()
            this.ctx.globalAlpha = 0.3;
            this.ctx.drawImage(this.asets.rain, this.graphData.weather.rainFrame * this.graphData.wideAsetWidth, 0, this.graphData.wideAsetWidth, this.graphData.wideAsetHeight,  this.canvas.width/2 - this.graphData.wideAsetWidth / 2, this.canvas.height/2 - this.graphData.wideAsetHeight / 2, this.graphData.wideAsetWidth, this.graphData.wideAsetHeight)
            this.ctx.restore()
        }
    }

    _drawBgBot(){
        this.ctxSoil.save()
        this.ctxSoil.drawImage(this.asets.imgBgBot, this.canvas.width/2 - this.graphData.wideAsetWidth / 2 -250, this.canvas.height/2 - this.graphData.wideAsetHeight / 2 -73 , this.graphData.wideAsetWidth, this.graphData.wideAsetHeight)
        this.ctxSoil.restore()
    }

    _clearCanvas(){
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctxMoon.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    _drawHydrated(){
        this.ctx.save()
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider);
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider + plant.root.size * this.graphData.asetScale);
        this.ctx.stroke();
        this.ctx.restore()
    }


    _drawBgStars(){
        this.ctxSky.save()
        this.ctxSky.drawImage(this.asets.imgBgStars, this.canvas.width/2 - this.graphData.wideAsetWidth / 2, this.canvas.height/2 - this.graphData.wideAsetHeight / 2 - 20, this.graphData.wideAsetWidth, this.graphData.wideAsetHeight)
        this.ctxSky.restore()
    }


    _drawMinimalWaterLevel(){
        this.ctxSoil.save()
        this.ctxSoil.fillStyle = '#000';
        this.ctxSoil.fillRect(0, app.interactiveZoneC.botsideDivider - habitat.minWeterLevel * this.graphData.asetScale, this.canvas.width, this.canvas.height);
        this.ctxSoil.restore()
    }
    
    _drawInteractiveZone(){
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        if(app.interactiveZoneC.rest === 'horizontal'){
            this.ctx.rect(app.interactiveZoneC.posX +1, 1, app.interactiveZoneC.width -1, app.interactiveZoneC.height -1);
        }else{
            this.ctx.rect(1, app.interactiveZoneC.posY +1, app.interactiveZoneC.width -1, app.interactiveZoneC.height -1);
        }
        this.ctx.stroke();
        this.ctx.restore()
    }

    _drawDividers(){
        //for dev needs
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
    }

    _drawGrid(){
        this.ctx.save()
        this.ctx.drawImage(this.asets.grid, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, app.interactiveZoneC.height)
        this.ctx.restore()
    }

    _drawPauseGrid(){
        if(app.pause.paused){
            this.ctx.save()
            this.ctx.drawImage(this.asets.pauseGrid, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, app.interactiveZoneC.height);
            this.ctx.restore()
        }
    }

}

class Sounds{
    constructor(){
        this.bad = new Audio('./asets/sounds/bad.mp3');
        this.bad.playbackRate = 2.8;
        this.bad.volume = 1;

        this.root = new Audio('./asets/sounds/root.mp3');
        this.root.playbackRate = 2.8;
        this.root.volume =  0.8;

        this.leafs = new Audio('./asets/sounds/leafs.mp3');
        this.leafs.playbackRate = 2.8;
        this.leafs.volume = 0.8;

        this.flowers = new Audio('./asets/sounds/flowers.mp3');
        this.flowers.playbackRate = 2.8;
        this.flowers.volume =  0.8;

        this.music= {
            mp3 : new Audio('./asets/sounds/quercus.mp3'),
            musicPlaying : false,
            loaded : false
        }
        this.music.mp3.addEventListener("canplaythrough", () => {
            sounds.music.loaded = true;
          });

        this.soudData = {
            soundIntervalDuration: 250,
            soundPlaying : false
        }
    }

    playMusic(){
        if(this.music.musicPlaying === false && this.music.loaded === true){
            this.music.musicPlaying = true;
            this.music.mp3.play();
        }
    }

    playSound(sound){
        let soundToPlay;
        switch (sound) {
            case 'root' :
                soundToPlay = this.root;
            break;
            case 'leafs' : 
                soundToPlay = this.leafs;
            break;
            case 'flowers':
                soundToPlay = this.flowers;
            break;
            case 'bad':
                soundToPlay = this.bad;
            break;
        }

        if(this.soudData.soundPlaying === false){
            this.soudData.soundPlaying = true
            soundToPlay.play();
            setTimeout(() => {
                this.soudData.soundPlaying = false
            }, this.soudData.soundIntervalDuration);
        }
        
        
    }

    stopSounds(){
        sounds.bad.pause();
        sounds.leafs.pause();
        sounds.root.pause();
        sounds.flowers.pause();
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
            width : 0,
            height : 0,
            rest : '',
            botsideDivider : 0,
            werticalDivider: 0,
        }
        this.grow = false;
        this.pause = {
            paused: false,
            btn: document.querySelector('#pause-btn')
        }
        this.credits = false;
        this._adjustinteractiveZoneC();
        this._adjustControls();
    }

    gameOver(cause){
        app.pause.btn.style.display = 'none';
        const overlay = document.querySelector('.overlay');
        const notification = document.querySelector('.notification div');

        clearInterval(habitat.dayInterval);
        clearInterval(app.grow);
        overlay.style.display = 'flex';
        if(cause === 'time'){
            if(plant.flowers.quantity === 0){
                notification.innerText= `Winter has come and you died. Sadly, didn't make any flowers, and your genes will not survive!`;
            }else{
                notification.innerText= `Winter has come and you died. Fortunately, you managed to grow ${plant.flowers.quantity} flowers.`;
            }
        }else{
            notification.innerText= `You died for lack of water.`;
        }
        sounds.music.mp3.volume = 0.05;
    }

    pauseGame(){
        if(!app.pause.paused){
            clearInterval(habitat.dayInterval);
            app.pause.paused = true;
            app.pause.btn.innerHTML = '>';
            sounds.music.mp3.pause();
        }else{
            habitat.dayInterval =setInterval( () =>habitat._dayPass(), 1000 /przyspiesz);
            app.pause.paused = false;
            app.pause.btn.innerHTML = '|| / ?';
            sounds.music.mp3.play();
        }
    }

    resetGame(){
        document.querySelector('.overlay').style.display = 'none';
        plant = new Plant;
        habitat = new Habitat;
        canvas.setGrowPoints();
        canvas.graphData.plant.lastFlowerQuanity = 0;
        canvas.graphData.plant.activeFlowerGrowPoint = 0;
        canvas.graphData.weather.posX = this.interactiveZoneC.posX;
        canvas.graphData.weather.posY = this.interactiveZoneC.posY +250;
        app.pause.btn.style.display = 'block';
        DevOutput.renderOutput();
        sounds.music.mp3.currentTime = 0;
        sounds.music.mp3.volume = 0.08;
    }
    
    showCredits(){
        this.credits = true;
       requestAnimationFrame(canvas.drawCredits.bind(canvas));
        const startMenu = document.querySelector('#start-menu');
        startMenu.style.display = 'none';
        
        const credits = document.querySelector('#credits');
        credits.style.display = 'flex';
    }

    returnToMenu(){
        this.credits = false;
        canvas.drawMenu()
        const startMenu = document.querySelector('#start-menu');
        startMenu.style.display = 'flex';
        
        const credits = document.querySelector('#credits');
        credits.style.display = 'none';
    }

    _adjustinteractiveZoneC(){
                //check if is need to add horizontal or vertical space to fill screen
                let fillScreen;

                if(window.screen.height * (384/688) < window.screen.width){
                    fillScreen = "horizontal";
                }else{
                    fillScreen = "vertical";
                }

        if(fillScreen === 'horizontal'){
            this.interactiveZoneC.height = canvas.ctx.canvas.height; 
            this.interactiveZoneC.width = +(this.interactiveZoneC.height * (384/688)).toFixed();
            this.interactiveZoneC.posX = +(canvas.ctx.canvas.width/2 - this.interactiveZoneC.width /2).toFixed();
            this.interactiveZoneC.rest = 'horizontal';

            this.interactiveZoneW.height = window.innerHeight; //window.screen.height 
            this.interactiveZoneW.width = +(this.interactiveZoneW.height * (384/688)).toFixed();
            this.interactiveZoneW.posX = +(window.innerWidth /2 - this.interactiveZoneW.width /2).toFixed();
            this.interactiveZoneW.rest = 'horizontal';


        }else{
            this.interactiveZoneC.width = canvas.ctx.canvas.width;
            this.interactiveZoneC.height = +(this.interactiveZoneC.width * (688/384)).toFixed();
            this.interactiveZoneC.posY = +((canvas.ctx.canvas.height - this.interactiveZoneC.height) /2).toFixed();
            this.interactiveZoneC.rest = 'vertical';

            this.interactiveZoneW.width = window.innerWidth;
            this.interactiveZoneW.height = +(this.interactiveZoneW.width * (688/384)).toFixed();
            this.interactiveZoneW.posY = +(window.innerHeight /2 - this.interactiveZoneW.height /2).toFixed();
            this.interactiveZoneW.rest = 'vertical';
        }


        this.interactiveZoneC.botsideDivider = +(this.interactiveZoneC.height / (172 / 106)  + this.interactiveZoneC.posY).toFixed();
        this.interactiveZoneC.werticalDivider = +(this.interactiveZoneC.width / 2 + this.interactiveZoneC.posX).toFixed();

        this.interactiveZoneW.botsideDivider = +(this.interactiveZoneW.height / (172 / 106)  + this.interactiveZoneW.posY).toFixed();
        this.interactiveZoneW.werticalDivider = +(this.interactiveZoneW.width / 2 + this.interactiveZoneW.posX).toFixed();

        //set addtional values for canvas
        canvas.graphData.weather.posX = this.interactiveZoneC.posX ;
        canvas.graphData.weather.posY = this.interactiveZoneC.posY +250;

        console.log(this.interactiveZoneC);
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

        canvas.canvas.addEventListener('pointerdown', this._handleControls.bind(this), passiveSupported ? { passive: false } : false)
    }

    _handleControls(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.clientX < this.interactiveZoneW.posX || 
            e.clientX > this.interactiveZoneW.posX + this.interactiveZoneW.width || 
            e.clientY < this.interactiveZoneW.posY || 
            e.clientY > this.interactiveZoneW.posY + this.interactiveZoneW.height ||app.pause.paused){
            return
        }else{
            if(this.grow != false){
                clearInterval(this.grow);
            }
            if(e.clientY >= this.interactiveZoneW.botsideDivider){
                this.grow = setInterval(plant.growRoot.bind(plant), 50 / przyspiesz);
            }else if(e.clientY < this.interactiveZoneW.botsideDivider && e.clientX >  this.interactiveZoneW.werticalDivider){
                this.grow = setInterval(plant.growLeafs.bind(plant), 50 / przyspiesz);
            }else{
                this.grow = setInterval(plant.growFlowers.bind(plant), 50 / przyspiesz);
            }
            canvas.canvas.addEventListener('pointerup', ()=>{
                clearInterval(this.grow);
                canvas.graphData.ui.danger = false;
                //pause feedback sounds
                setTimeout(() => {
                    canvas.graphData.plant.rootMaxAlert = false;
                    canvas.graphData.plant.flowerNotAllowedAlert = false;
                }, 500);
                
            })
        }
        
    }
}

class MenusAndNotifications{
    constructor(){
        this.graphData = {
            colors: {}
        }
        const notification = document.querySelector('.notification');
        notification.querySelector('button').addEventListener('pointerdown', app.resetGame.bind(app));
        notification.style.maxWidth = `${app.interactiveZoneW.width}px`;
    }
}

let plant = new Plant;
let habitat;
const canvas = new Canvas;
const app = new App;
const sounds = new Sounds;
const menusAndNotifications = new MenusAndNotifications;

function init(){
    Promise.all(canvas.preGameAsetsPromises)
    .then(()=>{
        canvas.drawStartingPanels();
    })

    Promise.all(canvas.asetsPromises)
    .then(()=>{
        const startMenu = document.querySelector('#start-menu');
        const startBtn = document.querySelector('#start-menu button');

        startBtn.innerHTML = 'Start!'
        startBtn.addEventListener('pointerdown', ()=>{
            app.resetGame()
            canvas.drawInit();
            DevOutput.renderOutput();
            startMenu.style.display = 'none';
        })

        const creditsBtn = document.querySelector('.credits-btn');
        creditsBtn.addEventListener('pointerdown', ()=>{
            app.showCredits()
        })

        const returnBtn = document.querySelector('#return-btn');
        returnBtn.addEventListener('pointerdown', ()=>{
            app.returnToMenu()
        })

        const pauseBtn = document.querySelector('#pause-btn');
        pauseBtn.style.top = app.interactiveZoneW.posY + 10 + 'px';
        pauseBtn.style.left = app.interactiveZoneW.posX + 10 + 'px';
        pauseBtn.addEventListener('pointerdown', app.pauseGame);

    })
}

document.addEventListener('DOMContentLoaded', init);
