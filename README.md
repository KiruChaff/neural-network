# neural-network
This is a silly javaScript library to create a neural network

I demonstrate the abilities of this code via a simple digit recognition.
The code is in-line documented -- for further information I used as reference a paper by Michael Nielsen
http://neuralnetworksanddeeplearning.com/chap2.html
and watched the YouTube series Neural Networks - The Nature of Code by Daniel Shiffmen
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6aCibgK1PTWWu9by6XFdCfh


The digit-rocognition is just for demonstration purposes to show the power of the Matrix.js and NeuralNetwork.js libraries.
I wrote silly into the description because that is what it is. It is impractical and just for my mere comprehension. That is why I decided to execute the program in the browser. Usually this is a bad idea because browser-executed programs are really slow. However the demonstration is simple enough to work just fine.
To start the actual learning process you have to await until 'ready..' is being logged in the console. Then you may enter 'run()' in the console and the learning process will start. You can stop at anytime with the 'stop()' method.
To view the current state of your neural network you can either use 'test()' of 'showProbability()'. Also you can log the 'learningCurve' to see the history of your neural network at every minute.


# please note -- this program has to be run in the Browser on a local server
also it might take quite a while to actually start -- read the documentation for further instructions

