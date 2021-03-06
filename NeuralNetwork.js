
// activation function
function sigmoid(x) {
   // Non-linear function
   return 1/(1 + Math.exp(-x));
}

function dsigmoid(x) {
   // derivative of sigmoid
   return sigmoid(x) * (1 - sigmoid(x));
}

class NeuralNetwork {
   // creates a Neural Network with 1 Input x hidden layers and 1 output layer
   // each with y nodes
   constructor(numOfInputs, numOfHiddenArr, numOfOutputs) {
      this.input_nodes = numOfInputs;
      this.hidden_nodes = numOfHiddenArr;
      this.output_nodes = numOfOutputs;
      this.numLayers = 1 + numOfHiddenArr.length + 1;

      this.weights = [];
      this.biases = [];
      this.zs = [];
      this.activations = [];
      this.lr = 1;

      //initilize each weight and bias randomly

      let weight = new Matrix(this.hidden_nodes[0], this.input_nodes);
      weight.randomize();
      let bias = new Matrix(this.hidden_nodes[0], 1);
      bias.randomize();

      this.weights.push(weight);
      this.biases.push(bias);

      for (let i=1;i<this.hidden_nodes.length;i++) {
         weight = new Matrix(this.hidden_nodes[i], this.hidden_nodes[i-1]);
         weight.randomize();
         bias = new Matrix(this.hidden_nodes[i], 1);
         bias.randomize();

         this.weights.push(weight);
         this.biases.push(bias);
      }

      let last_hidden = this.hidden_nodes.length-1;
      weight = new Matrix(this.output_nodes, this.hidden_nodes[last_hidden]);
      weight.randomize();
      bias = new Matrix(this.output_nodes, 1);
      bias.randomize();

      this.weights.push(weight);
      this.biases.push(bias);
   }


   feedforward(input_arr) {
      // takes in input and returns the output according to the current weights and biases
      let activation = Matrix.fromArray(input_arr);
      let z;
      this.zs = [];
      this.activations=[activation];
      for (let i=0; i<this.numLayers-1; i++) {
         z = Matrix.dot(this.weights[i], activation);
         z.add(this.biases[i]);
         this.zs.push(z);
         activation = Matrix.map(z, sigmoid);
         this.activations.push(activation);
      }
      let output = activation;
      return output.matrix;
   }

   train(input, target) {
      // adjusts the weights and biases with supervised learning
      this.feedforward(input);
      // backpropagation
      let output = this.activations[this.activations.length-1];
      let y = Matrix.fromArray(target);
      let z = this.zs[this.zs.length-1];
      let dsz = Matrix.map(z, dsigmoid);

      let delta = Matrix.subtract(output, y);
      delta.mult(dsz);
      delta.mult(this.lr);

      let delta_biases = delta;
      this.biases[this.biases.length-1].subtract(delta_biases);

      let a_prev_T = Matrix.transpose(this.activations[this.activations.length-2]);

      let delta_weights = Matrix.dot(delta, a_prev_T);
      this.weights[this.weights.length-1].subtract(delta_weights);

      let w_T, layer;
      for (let i=2; i<this.numLayers; i++) {
         layer = this.zs.length-i;
         z = this.zs[layer];
         dsz = Matrix.map(z, dsigmoid);
         layer=this.weights.length-i;
         w_T = Matrix.transpose(this.weights[layer+1]);
         delta= Matrix.dot(w_T, delta);
         delta.mult(dsz);
         delta.mult(this.lr);

         layer=this.biases.length-i;
         delta_biases = delta;
         this.biases[layer].subtract(delta_biases);

         layer=this.activations.length-i;
         a_prev_T = Matrix.transpose(this.activations[layer-1]);

         layer=this.weights.length-i;
         delta_weights = Matrix.dot(delta, a_prev_T);
         this.weights[layer].subtract(delta_weights);

      }
   }
   // displays current values of weights
   showWeights(){
      for(let weight of this.weights){
         weight.show();
      }
      console.log("##############################################################");
   }

   // displays current values of biases
   showBiases(){
      for(let bias of this.biases){
         bias.show();
      }
      console.log("##############################################################");
   }
}
