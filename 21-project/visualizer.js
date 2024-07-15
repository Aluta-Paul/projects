function main() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //cz of SCOPE we bring the below code in this function.

    
  // Class are good to make related/SIMILAR objects: 
        //we want many bars that will make up our audio visualze.
  class Bar{
    constructor(x,y,width,height,color) {//must for all classes... creates one new object and property on how we call it
      //all the object will hv same properties :eg.x,y positions but their values may be different like every bar will have different x&y positions
      //constructor will expect 5 properties.
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.color = color;

    }
    update(micInput){//handle audio data + calculate position and sizes. eg height of bars = micInput....=>this.height=micinput.
      this.height = micInput * 1000;

    }
    draw(context){// will take data and give shape + color

      context.fillStyle = this.color//coz our canvas bg is black
      context.fillRect(this.x,this.y,this.width,this.height)//to draw rectange to rep the audio bar.
    }
  }
  //creating bar that will be build by line 12


  const microphone1 = new microphone();
  /*console.log(microphone1)
  const samples = microphone1.getSample();
  console.log(samples);*/

  let bars = [];
  let barWidth =canvas.width/256 //256 = length of mmy array
  function creatBar(){
    for (let i = 0; i<256; i++){
      let color = "hsl('+i+',100% 50%)";//0 = Hue,100=saturation(full color) 50%=lightnes..0 lightness-black, 100% is white, 50%-original.
      bars.push(new Bar(i*barWidth,canvas.height/2,1,100,color));
    }
  }
  
  creatBar()
  console.log(bars)


  //ANIMATION LOOPE to call update() + draw() on all the bar object.
  function animate() {
  if (microphone.initialized) {
      ctx.clearRect(0,0,canvas.width,canvas.height);//clear old paint from old paint. ... from coords 0,0 to canvas width and height.
  
      //generate audio sample from microphone
      const samples = microphone1.getSample();
      //console.log(samples);

      //animate bar based on microphone data
      bars.forEach(function(bars, i){
        bars.update(samples[i]);
        bars.draw(ctx);
      });
    }
            //console.log('animate') --- shows the LOOPS
    requestAnimationFrame(animate);//use build in req..method to create endless animation loop
  }
  animate();

}
