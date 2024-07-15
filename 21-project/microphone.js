//make OBLECT class to capture data from mic
//goal make many bars which we give to update() in visualizer.js

class microphone {
  constructor() {
    this.initialized = false;//to wait until mic data comes in then i set it to TRUE.
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
      this.audioContext = new AudioContext();//WebAudio API brought in.
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512; //btwn 2^5 - 2^15 eg 32,64,128,256,512,1024,2048,4096,8192,16384,32768.  to know how many BINS of audio i have.
      const bufferLength = this.analyser.frequencyBinCount; //always half the value of fftsize value
      this.dataArray = new Uint8Array(bufferLength); //to convert audio data into 8 bit array 0-255.
      //dataArray will have 256 arrays =>from bufferlength and each audio sample will be rep by value btwn 0 -255[bit size]
      this.microphone.connect(this.analyser);//connect=> direct audio node from one area to another
      this.initialized = true;
    }.bind(this)).catch(function(err){
      alert(err);
    });
  }
  getSample() {//return an array of audio samples for visualizer
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSample = [...this.dataArray].map(e => e/128 - 1); //output a range from [0 - 1]
    return normSample;
  }
  getValue() {//return a single average of current audio volume 
    this.analyser.getByteTimeDomainData(this.dataArray);
    let normSample = [...this.dataArray].map(e => e/128 - 1);
    let sum = 0;
    for(let i =0; i< normSample.length; i++){
      sum += normSample[i]*normSample[i];//squre each value.
    }
    let volume =math.sqrt(sum / normSample.length);//get avg value
    return volume;
  }
}
