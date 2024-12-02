# React Native Camera Component with Server-Side Image Recognition Functionality

See a demo of this application in action on YouTube [here](https://youtu.be/lfskUzg-Bxg?si=4ggcHiTG0BetBsge)

This application was built for my portfolio to showcase a Mobile-Net trained neural network ([GitHub for that project](https://github.com/chambers5710/Keras_Pokemon_CNN.git))that recognizes images of Pokemon. The user may snap a photo in real time of a character and the app will pass it to the development server where a prediction is made. The app then returns a basic set of data for that particular Pokemon from the PokeAPI. 

## Installation

To run this app in development mode, there are several installation prerequisites:
### NodeJS, Expo for iOS or Android, and Python with the following libraries installed: Flask, OpenCV, Pickle, Numpy, and TensorFlow

With the prerequisites installed, open the folder in a terminal and run ```npm install```.

## Usage

In order to use this app, the server must be started in conjunction with the app itself.

### serve_app.py
This is the server which passes uploaded photos taken within the app to a Keras Convolutional Neural Network trained on images of the first generation
of Pokemon. 

ensure the following libraries are properly imported:
```python
import os
import base64
from flask import Flask, request, jsonify
import cv2
import pickle
import numpy as np
from tensorflow import keras
```
then press "Run". The server will initialize and begin listening for input from the application. 

### React Native App

Assuming you have Expo installed on a mobile device, run ```npx expo start``` to initialize the app. Scan the QR code. Once the app is loaded, a splash screen should be displayed. 


## License

[MIT](https://choosealicense.com/licenses/mit/)
