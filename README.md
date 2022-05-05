# Music_Genre_Classification

## Overview

This project is about automatically classifying different musical genres from audio files. We are using the GTZAN Dataset, which comprises of ten genres with 100 audio files per genre and all of the audio files are 30 seconds long. 

## Approach
First, the audio files are converted to images using Pytorch and Librosa libraries. The images are then passed to the Convolutional Neural Network which is trained on 1.2 million images and can categorize images via transfer learning. Then the model will predict based on those photographs.


## Running the React project
The front-end of our project is built using React.js library. You can follow steps below to setup the project and get it running.

* To install the dependencies, navigate to the `mcg_frontend` directory in the terminal and type the following command.

> ```npm install```

* To run the project, use the following command and the project will start running on 3000 port.
> ```npm start```

## Running the Python project
The back-end of our project is built using Python and the flask framework. 

* To install the dependencies, navigate to the `mcg_backend` directory in the terminal and type

> ```pip install -r requirements.txt```

* And to run the project

> ```flask run```

The back-end project will start on port 5000.