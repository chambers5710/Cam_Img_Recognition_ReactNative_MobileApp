import os
import base64
from flask import Flask, request, jsonify
import cv2
import pickle
import numpy as np
from tensorflow import keras

app = Flask(__name__)

 # Load the saved model
model = keras.models.load_model('app/model_save')

# Load the label encoder object
with open('app/model_save/label_encoder.pk1', 'rb') as f:
    label_encoder = pickle.load(f)

# Serve image upload function
@app.route('/upload/', methods=['POST'])
def upload():
    image_data_dict = request.get_json()
    image_data = image_data_dict.get('image_data')
    image_bytes = base64.b64decode(image_data)

    # Save the image to a file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    save_path = os.path.join(current_dir, 'cache')
    os.makedirs(save_path, exist_ok=True)  # Create the directory if it doesn't exist
    image_path = os.path.join(save_path, 'captured_image.jpg')
    with open(image_path, 'wb') as file:
        file.write(image_bytes)

    # Load and preprocess the input image
    input_image = cv2.imread(image_path, cv2.IMREAD_COLOR)
    input_image = cv2.resize(input_image, (224, 224))
    input_image = input_image.astype('float32') / 255.0

    # Reshape and expand the dimensions of the preprocessed image to match the model's input shape
    input_image = np.expand_dims(input_image, axis=0)

    # Pass the preprocessed image to the trained model
    predictions = model.predict(input_image)

    predicted_label = label_encoder.inverse_transform([np.argmax(predictions)]).tolist()

    print("Prediction:", predicted_label)

    # Return image interpretation
    response = {'message': 'Image uploaded successfully', 'prediction': predicted_label}
    print('Response:', response)
    return jsonify(response)
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
