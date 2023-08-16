function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

 const przyspiesz = 1.5

class Plant{
    constructor(){
        this.root = {
            size: 5,
            maxSize: 63,
            growRate: 0.01,
            cost: 0.008,
        };
        this.leafs = {
            size: 1,
            growRate: 0.002,
            cost: 0.015
        };
        this.flowers = {
            size: 0,
            quantity: 0,
            growRate: 0.0025,
            cost: 0.03,
        };
        this.assimilationPower = 10//0.1;
        this.carbohydrates = 2.5;
        this.maxCarbohydrates = 10;

        this.waterSupply = 5;
        this.maxWaterSupply = 10;
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
            canvas.graphData.plant.rootMaxAlert = true;
        }
        DevOutput.renderOutput();
    }

    growLeafs(){
        if(this.carbohydrates > 0.1){
            sounds.leafs.play();
            this.carbohydrates -= this.leafs.cost;
            this.leafs.size = this.leafs.size + +this.leafs.growRate;
        }else{
            canvas.graphData.ui.danger = true;
            sounds.creak.play();
            sounds.leafs.pause();
        }
        DevOutput.renderOutput();   
    }

    growFlowers(){
        if(!canvas.graphData.plant.growPoints[0].ready || canvas.graphData.plant.activeFlowerGrowPoint === null){
            canvas.graphData.plant.flowerNotAllowedAlert = true;
            canvas.graphData.ui.danger = true;
            sounds.creak.play();
            sounds.leafs.pause();
        }else{
            if(this.carbohydrates > 0.1){
                sounds.leafs.play();
                this.carbohydrates -= this.flowers.cost;
                this.flowers.size = this.flowers.size + +this.flowers.growRate;
                this.flowers.quantity = Math.floor(this.flowers.size); 
            }else{
                canvas.graphData.ui.danger = true;
                sounds.creak.play();
                sounds.leafs.pause();
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
           // console.log('gameOver');
            app.gameOver('water');
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
        }else{
            app.gameOver('time');
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
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');

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
            asetScale: null,
            font: new FontFace("pixel", "url(./asets/fonts/Pixel-Madness.ttf)")
            
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

        this.asets ={
            
        }

        this.asetsPromises = [];

        this.asets.pauseGrid = new Image(100, 100);
        this.asets.pauseGrid.src = './asets/pngs/pausegrids_96x172.png';

        this.asets.grid = new Image(100, 100);
        this.asets.grid.src = './asets/pngs/sheet96x172.png';

        this.asets.imgBgBot = new Image(100, 100);
        this.asets.imgBgBot.src = './asets/pngs/bckgrnddown96x66_1.png';

        this.asets.imgBgTop = new Image(100, 100);
        this.asets.imgBgTop.src = './asets/pngs/bckgrndup96x106_1.png';

        this.asets.imgBgStars = new Image(100, 100);
        this.asets.imgBgStars.src = './asets/pngs/stars450x106.png';

        this.asets.imgBgMountains = new Image(100, 100);
        this.asets.imgBgMountains.src = './asets/pngs/mntns_450x106.png';

        this.asets.imgBgPlants = new Image(100, 100);
        this.asets.imgBgPlants.src = './asets/pngs/bckgrndplants96x106.png';

        this.asets.imgBgPlantsRoots = new Image(100, 100);
        this.asets.imgBgPlantsRoots.src = './asets/pngs/bg_plants_roots96x66.png';

        this.asets.imgBar = new Image(100, 100);
        this.asets.imgBar.src = './asets/pngs/bar4x32.png';

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

        this.asets.cloudPass = new Image(100, 100);
        this.asets.cloudPass.src = './asets/pngs/clouds.png';

        this.asets.rainCloudPass = new Image(100, 100);
        this.asets.rainCloudPass.src = './asets/pngs/rain_clouds450x106.png';

        this.asets.rain = new Image(100, 100);
        this.asets.rain.src = './asets/pngs/rain450x106.png';

        Object.values(this.asets).forEach(img => {
            const promise = new Promise((resolve, reject) => {
                img.onload = resolve
                img.onerror = reject
            })
            this.asetsPromises.push(promise);
        });

        this.adjustCanvasToScreen()

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

    drawStartingPanels(){
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.drawImage(this.preGameAsets.lilChiefPanel, -1500 + canvas.canvas.width /2,  -1216 + canvas.canvas.height /2, 3000, 2432);
        
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

        // this.ctx.save()
        // this.ctx.font = "48px pixel";
        // this.ctx.fillStyle = 'white';
        // this.ctx.fillText("Stellaria", app.interactiveZoneC.posX, app.interactiveZoneC.posY +);
        // this.ctx.restore()

        document.querySelector('#start-menu').style.display = 'flex';
    }

    drawInit(){
        this.ctx.imageSmoothingEnabled = false;
        this.graphData.font.load().then(font => {
            document.fonts.add(font);
        });
        this.ctx.font = "normal 40px pixel"
        this.setGrowPoints(); 
        requestAnimationFrame(this._drawHabitatTopside.bind(this));
        requestAnimationFrame(this._drawBgStars.bind(this));
        requestAnimationFrame(this.drawMoon.bind(this));
        requestAnimationFrame(this.drawClouds.bind(this));
        requestAnimationFrame(this._drawBgMountains.bind(this));
        requestAnimationFrame(this._drawHabitatBotside.bind(this));
        requestAnimationFrame(this._drawBgPlants.bind(this));
       //requestAnimationFrame(this._drawGrid.bind(this))
        requestAnimationFrame(this.drawWaterLevel.bind(this));
        requestAnimationFrame(this.drawLeafs.bind(this));
        requestAnimationFrame(this.drawRoot.bind(this));
        requestAnimationFrame(this.drawFlowers.bind(this))
        requestAnimationFrame(this.drawRain.bind(this))
        requestAnimationFrame(this.drawUI.bind(this));
        //requestAnimationFrame(this._drawDividers.bind(this));
        //requestAnimationFrame(this._drawInteractiveZone.bind(this));
        requestAnimationFrame(this._drawPauseGrid.bind(this));
        requestAnimationFrame(this._clearCanvas.bind(this));
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

    drawUI(){
        this.graphData.ui.width = 6 * canvas.graphData.asetScale;
        this.graphData.ui.barHeight = 20 * canvas.graphData.asetScale;
        this.graphData.ui.barWidth = 4 * canvas.graphData.asetScale;
        this.graphData.ui.posX = app.interactiveZoneC.posX + this.graphData.plant.stalkWidth * canvas.graphData.asetScale - this.graphData.ui.width;
        this.graphData.ui.posY = app.interactiveZoneC.posY + 3 * canvas.graphData.asetScale;

        //carbohydrates bar
        this.ctx.save();
        const carboBarRange = (plant.carbohydrates * this.graphData.ui.barHeight) /plant.maxCarbohydrates; 
        this.ctx.fillStyle = '#549c5d';
        this.ctx.fillRect(this.graphData.ui.posX +0.5 * canvas.graphData.asetScale, this.graphData.ui.posY + this.graphData.ui.barHeight - carboBarRange  +0.5* canvas.graphData.asetScale, 3 * canvas.graphData.asetScale, carboBarRange -0.5 * canvas.graphData.asetScale)
        this.ctx.restore();

        if(this.graphData.ui.danger){
            this.ctx.fillStyle = 'rgba(209, 82, 82, 1)';
            this.ctx.fillRect(this.graphData.ui.posX +0.5 * canvas.graphData.asetScale, this.graphData.ui.posY +0.5* canvas.graphData.asetScale, 3 * canvas.graphData.asetScale, this.graphData.ui.barHeight -1* canvas.graphData.asetScale)
            this.ctx.restore();
        }

        this.ctx.drawImage(this.asets.imgBar, this.graphData.ui.posX, this.graphData.ui.posY +5, this.graphData.ui.barWidth, this.graphData.ui.barHeight);
        
        //water supply bar
        this.ctx.save();
        const waterBarRange = (plant.waterSupply * this.graphData.ui.barHeight) /plant.maxWaterSupply; 
        this.ctx.fillStyle = this.graphData.colors.waterBlue;
        this.ctx.fillRect(this.graphData.ui.posX +0.5 * canvas.graphData.asetScale, this.graphData.ui.posY + 2* this.graphData.ui.barHeight - waterBarRange  +2.5* canvas.graphData.asetScale, 3 * canvas.graphData.asetScale, waterBarRange -0.5 * canvas.graphData.asetScale)
        this.ctx.restore();

        this.ctx.drawImage(this.asets.imgBar, this.graphData.ui.posX, this.graphData.ui.posY +5 + this.graphData.ui.barHeight + 2 * canvas.graphData.asetScale, this.graphData.ui.barWidth, this.graphData.ui.barHeight);


        requestAnimationFrame(this.drawUI.bind(this))
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
        this.ctx.rect(0, app.interactiveZoneC.botsideDivider - habitat.waterLevel *this.graphData.asetScale +5, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "rgba(56, 112, 217, 0.3)";
        this.ctx.fill();
        this.ctx.restore()

        // if(plant.watered){
        //     this._drawHydrated();
        // }
        requestAnimationFrame(this.drawWaterLevel.bind(canvas));
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
            this.ctx.fillStyle = "#d15252";
            this.ctx.fillText(`Root reached`, app.interactiveZoneC.werticalDivider + 40, app.interactiveZoneC.posY + app.interactiveZoneC.height -83)
            this.ctx.fillText(`maximum size!`, app.interactiveZoneC.werticalDivider + 40, app.interactiveZoneC.posY + app.interactiveZoneC.height -50)
            this.ctx.restore()
        }
        requestAnimationFrame(canvas.drawRoot.bind(canvas));
    }

    drawLeafs(){
        this.ctx.save()
        //stalk
        //probably max leaf size = 25
        const frame = Math.floor(plant.leafs.size *45) - 45;
        this.ctx.drawImage(this.asets.imgStalk1, frame < 208 ? frame *this.graphData.plant.stalkWidth : 208 *this.graphData.plant.stalkWidth, 0, this.graphData.plant.stalkWidth, this.graphData.plant.stalkHeight, app.interactiveZoneC.posX , app.interactiveZoneC.posY, app.interactiveZoneC.width, this.graphData.plant.stalkHeight * this.graphData.asetScale);

        //leaf
        const yebnięcieMateusza = -4;
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
        requestAnimationFrame(canvas.drawLeafs.bind(canvas));
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
        const yebnięcieMateusza = -4;

        if(this.graphData.plant.flowerNotAllowedAlert){
            this.ctx.save()
            this.ctx.fillStyle = "#d15252";
            this.ctx.fillText(`Grow more leafs before`, app.interactiveZoneC.posX +20, app.interactiveZoneC.posY +330)
            this.ctx.fillText(`start growing flowers!`, app.interactiveZoneC.posX +20, app.interactiveZoneC.posY +365)
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

        requestAnimationFrame(this.drawFlowers.bind(this))
    }

    drawMoon(){
        const totalFrames = 16;
        const frame = (habitat.day/habitat.maxDay * totalFrames).toFixed(0); 
        const width = 20;
        const height = 16;
        this.ctx.drawImage(this.asets.moon, frame * width, 0, width, height, this.graphData.weather.posX, this.graphData.weather.posY, 20 * this.graphData.asetScale, 16* this.graphData.asetScale, 20* this.graphData.asetScale)
        requestAnimationFrame(this.drawMoon.bind(this));
    }

    drawClouds(){
        let pass;
        switch (habitat.weather){
            case 'sunny':
                
            break;
            case 'cloudy':
                pass = this.asets.cloudPass;
            break;    
            case 'rainy':
                pass = this.asets.rainCloudPass;
            break;
        } 

        if(pass){
            if(!this.graphData.weather.cloudPassingInterval){
                this.graphData.weather.cloudPassingInterval = setInterval(() => {
                    if(this.graphData.weather.cloudFrame > 300){
                        this.graphData.weather.cloudFrame =0;
                    }else{
                        this.graphData.weather.cloudFrame ++;
                    }   
                }, 10);
            }
            this.ctx.save()
            this.ctx.globalAlpha = 0.5;
            const patternCanvas = document.createElement("canvas");
            const patternContext = patternCanvas.getContext("2d");
            

            patternCanvas.width = 450 * this.graphData.asetScale;
            patternCanvas.height = 172 * this.graphData.asetScale;
            patternCanvas.style.imageRendering = 'pixelated';
            patternContext.imageSmoothingEnabled = false;
            patternContext.drawImage(pass, 0, 0, patternCanvas.width, patternCanvas.height);

            const pattern = this.ctx.createPattern(patternCanvas, "repeat-x");
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(0, app.interactiveZoneC.posY, this.canvas.width, 172 *this.graphData.asetScale);
            this.ctx.restore()

        }
        requestAnimationFrame(this.drawClouds.bind(this))
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
            const patternCanvas = document.createElement("canvas");
            const patternContext = patternCanvas.getContext("2d");

            patternCanvas.width = 450 * this.graphData.asetScale;
            patternCanvas.height = 172 * this.graphData.asetScale;
            patternCanvas.style.imageRendering = 'pixelated';
            patternContext.imageSmoothingEnabled = false;
            patternContext.drawImage(this.asets.rain, this.graphData.weather.rainFrame * 450, 0, 450, 172,  0, 0, patternCanvas.width, patternCanvas.height);

            const pattern = this.ctx.createPattern(patternCanvas, "repeat-x");
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(0, app.interactiveZoneC.posY, this.canvas.width, 172 *this.graphData.asetScale);
            this.ctx.restore()
        }
        requestAnimationFrame(this.drawRain.bind(this))
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
        this.ctx.lineTo(app.interactiveZoneC.werticalDivider, app.interactiveZoneC.botsideDivider + plant.root.size * this.graphData.asetScale);
        this.ctx.stroke();
        this.ctx.restore()
    }

    _drawHabitatTopside(){
        this.ctx.save();
       this.ctx.fillStyle = this.graphData.colors.skyblue;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.drawImage(this.asets.imgBgTop, 0, 0, 96, 106, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, app.interactiveZoneC.botsideDivider)

        this.ctx.restore()
        requestAnimationFrame(this._drawHabitatTopside.bind(this));
    }

    _drawBgPlants(){
        //top
        this.ctx.save();
        this.ctx.drawImage(this.asets.imgBgPlants, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, this.graphData.plant.stalkHeight * this.graphData.asetScale)
        this.ctx.restore()

        //roots
        this.ctx.save();
        this.ctx.drawImage(this.asets.imgBgPlantsRoots, app.interactiveZoneC.posX, app.interactiveZoneC.botsideDivider, app.interactiveZoneC.width, this.graphData.plant.rootHeight  * this.graphData.asetScale)
        this.ctx.restore()
        requestAnimationFrame(this._drawBgPlants.bind(this));
    }

    _drawBgMountains(){
        this.ctx.save();
        this.ctx.drawImage(this.asets.imgBgMountains, this.canvas.width/2 - 225  * this.graphData.asetScale -120, app.interactiveZoneC.posY, 450* this.graphData.asetScale, this.graphData.plant.stalkHeight * this.graphData.asetScale)
        this.ctx.restore()
        requestAnimationFrame(this._drawBgMountains.bind(this));
    }

    _drawBgStars(){
        this.ctx.save()
            const patternCanvas = document.createElement("canvas");
            const patternContext = patternCanvas.getContext("2d");
            
            patternCanvas.width = 450 * this.graphData.asetScale;
            patternCanvas.height = 106 * this.graphData.asetScale;
            patternCanvas.style.imageRendering = 'pixelated';
            patternContext.imageSmoothingEnabled = false;
            patternContext.drawImage(this.asets.imgBgStars, 0, 0, patternCanvas.width, patternCanvas.height);

            const pattern = this.ctx.createPattern(patternCanvas, "repeat-x");
            this.ctx.fillStyle = pattern;
            this.ctx.fillRect(0, app.interactiveZoneC.posY, this.canvas.width, 172 *this.graphData.asetScale);
            this.ctx.restore()

        requestAnimationFrame(this._drawBgStars.bind(this));
    }

    _drawHabitatBotside(){
        this.ctx.save()
        this.ctx.fillStyle = this.graphData.colors.soilBrown;
        this.ctx.fillRect(0, app.interactiveZoneC.botsideDivider, this.ctx.canvas.width, this.ctx.canvas.height);

        //draw minimal water level
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, app.interactiveZoneC.botsideDivider - habitat.minWeterLevel * this.graphData.asetScale, this.ctx.canvas.width, this.ctx.canvas.height);
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

    _drawGrid(){
        this.ctx.save()
        this.ctx.drawImage(this.asets.grid, 0, 0, 96, 172, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, app.interactiveZoneC.height)
        this.ctx.restore()
        requestAnimationFrame(this._drawGrid.bind(this));
    }

    _drawPauseGrid(){
        if(app.pause.paused){
            this.ctx.save()
            this.ctx.drawImage(this.asets.pauseGrid, 0, 0, 96, 172, app.interactiveZoneC.posX, app.interactiveZoneC.posY, app.interactiveZoneC.width, app.interactiveZoneC.height);

            // this.ctx.font = "48px pixel";
            // this.ctx.fillStyle = 'black';
            // this.ctx.fillText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", app.interactiveZoneC.posX +20, app.interactiveZoneC.posY + 220), 200;

            this.ctx.restore()
        }

        requestAnimationFrame(this._drawPauseGrid.bind(this));
    }

}

class Sounds{
    constructor(){
        this.err = new Audio('/asets/sounds/erro.mp3');
        this.leafs = new Audio('/asets/sounds/leaves.mp3');
        this.leafs.playbackRate = 3;
        this.creak = new Audio('/asets/sounds/creak.mp3');
        this.creak.playbackRate = 6;
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
        this.grow = false;
        this.pause = {
            paused: false,
            btn: document.querySelector('#pause-btn')
        }
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
                notification.innerText= `Winter has come and you died. Hopefully, you managed to grow ${plant.flowers.quantity} flowers.`;
            }
        }else{
            notification.innerText= `You died for lack of water.`;
        }
    }

    pauseGame(){
        if(!app.pause.paused){
            clearInterval(habitat.dayInterval);
            app.pause.paused = true;
            app.pause.btn.innerHTML = '>';
        }else{
            habitat.dayInterval =setInterval( () =>habitat._dayPass(), 1000 /przyspiesz);
            app.pause.paused = false;
            app.pause.btn.innerHTML = '|| / ?';
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
        canvas.graphData.weather.posY = this.interactiveZoneC.posY +450;
        app.pause.btn.style.display = 'block';
        DevOutput.renderOutput();
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


        this.interactiveZoneC.botsideDivider = this.interactiveZoneC.height / (172 / 106)  + this.interactiveZoneC.posY;
        this.interactiveZoneC.werticalDivider = this.interactiveZoneC.width / 2 + this.interactiveZoneC.posX;

        this.interactiveZoneW.botsideDivider = this.interactiveZoneW.height / (172 / 106)  + this.interactiveZoneW.posY;
        this.interactiveZoneW.werticalDivider = this.interactiveZoneW.width / 2 + this.interactiveZoneW.posX;

        //set addtional values for canvas
        canvas.graphData.weather.posX = this.interactiveZoneC.posX ;
        canvas.graphData.weather.posY = this.interactiveZoneC.posY +450;;

        canvas.graphData.asetScale = this.interactiveZoneC.width / canvas.graphData.plant.stalkWidth
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
                this.grow = setInterval(plant.growRoot.bind(plant), 10 / przyspiesz);
            }else if(e.clientY < this.interactiveZoneW.botsideDivider && e.clientX >  this.interactiveZoneW.werticalDivider){
                this.grow = setInterval(plant.growLeafs.bind(plant), 10 / przyspiesz);
            }else{
                this.grow = setInterval(plant.growFlowers.bind(plant), 10 / przyspiesz);
            }
            canvas.canvas.addEventListener('pointerup', ()=>{
                clearInterval(this.grow);
                canvas.graphData.ui.danger = false;
                //pause feedback sounds
                sounds.leafs.pause();
                sounds.creak.pause();
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
            colors: {

            }
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
    .then( ()=>{
        const startMenu = document.querySelector('#start-menu');
        const startBtn = document.querySelector('#start-menu button');

        startBtn.innerHTML = 'Start!'
        startBtn.addEventListener('pointerdown', ()=>{
            app.resetGame()
            canvas.drawInit();
            DevOutput.renderOutput();
            startMenu.style.display = 'none';
        })
        const pauseBtn = document.querySelector('#pause-btn');
        pauseBtn.style.top = app.interactiveZoneW.posY + 10 + 'px';
        pauseBtn.style.left = app.interactiveZoneW.posX + 10 + 'px';
        pauseBtn.addEventListener('pointerdown', app.pauseGame);

    })
}

document.addEventListener('DOMContentLoaded', init);
