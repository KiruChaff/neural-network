/*-------------------------Neural-Network--------------------------------*/
// constelation for digit-recognition (mnist)
// 784 input nodes
// two hidden layers each with 16 nodes
// 10 output nodes (0-9)
const nn = new NeuralNetwork(28*28, [16, 16], 10);

let start = false;
let offset = 0;
let offsetLr = 0;

let mnist_data_tr = [];
let mnist_data_te = [];
let probabilityCurve = [];
let img, folder, target;

// ugly temporary solution that compremises amount of images
// 'cause I donnot know js ;)
let maxTr = 5421;
let maxTe = 892;

//preload every image for computational sake
function preload() {
   for (let i = 0;i<10; i++) {
      mnist_data_tr.push([]);
      mnist_data_te.push([]);
      for (let j = 0; j<maxTr;j++)
         mnist_data_tr[i].push(loadImage("mnist_png/training/"+i+"/img"+j+".png"));
      for (let j = 0; j<maxTe;j++)
         mnist_data_te[i].push(loadImage("mnist_png/testing/"+i+"/img"+j+".png"));
   }
}

// returns accuracy of current state
function getProbability(num) {
   let wrong = 0;
   let right = 0
   for (let i=0;i<10000;i++) {
      folder = floor(random(10));
      let imgNr = num || floor(random(maxTe));
      img = mnist_data_te[folder][imgNr];
      img.loadPixels();
      let result = nn.feedforward(imgToData(img));
      if (result[folder] == max(result)) {
         right++;
      } else {
         wrong++;
      }
   }
   let probability = right / (wrong + right) * 100;
   return probability;
}

// formats previous function
function showProbability(num) {
   console.log("The accuracy is "+ getProbability(num) + "%");
}

// to format each image to processable data (array of brightness pixels)
function imgToData(img){
   let data = [];
   for (let i=0; i<img.pixels.length; i+=4) {
      data.push(color(img.pixels[i])._array[0]);
   }
   return data;
}

// chooses Image from a specific folder at random
function randomImageTraining(folder) {
   img = mnist_data_tr[folder][floor(random(maxTr))];
   img.loadPixels();
   return img;
}

// displays an arbitrary image to the screen and shows the algorithm's output
function test() {
   folder = floor(random(10));
   let imgNr = floor(random(maxTe));
   img = mnist_data_te[folder][imgNr];
   img.loadPixels();
   image(img, 0, 0);
   console.log(folder+":");
   console.table(nn.feedforward(imgToData(img)));
}

// starts the training process
function run() {
   start = true;
   offset = frameCount % 1440; // 1 minute
   offset++;
   offsetLr = frameCount % 14400; // 10 minutes
   return true;
}

// obviously stops the training process
function stop(){
   start = false;
   return true;
}

// standard p5 framework functions
function setup() {
   createCanvas(28, 28);
   background(0);
   frameRate(24);
   console.log("ready..");
}

// training process (code executed 24 frames a second)
function draw(){
   if (start){
      if ((frameCount - offset) % 1440 == 0)
         probabilityCurve.push(getProbability());
      if ((frameCount - offsetLr) % 14400 == 0)
         nn.lr/=2;
      let folder, img;
      for (let i=0;i<5;i++) {
         folder = floor(random(10));
         img = randomImageTraining(folder);
         target = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
         target[folder] = 1;
         nn.train(imgToData(img), target);
      }
   }
}
