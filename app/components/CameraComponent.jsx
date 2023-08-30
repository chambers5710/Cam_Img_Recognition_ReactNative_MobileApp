import {Camera} from "expo-camera";
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import {useRef, useState} from 'react';
import { StyleSheet, TextInput, ImageBackground, ScrollView, Platform, Keyboard,
         Text, View, TouchableOpacity, Pressable, Button, KeyboardAvoidingView, 
         TouchableWithoutFeedback, ActivityIndicator } from 'react-native';


export default function CameraComponent({onPrediction, PokemonStats}) {
  const [status, requestPermission] = Camera.useCameraPermissions ();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const cameraRef = useRef(null);

  if (!status?.granted) {
    return (
      <View style={styles.container}>
        <Text>
          We need access to your camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    )};
  
  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setLastPhotoURI(null);
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  const sendImageToServer = async (imageData) => {
    try {
      const response = await fetch('http://192.168.1.229:5000/upload/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image_data: imageData }),
      });

      const data = await response.json();
      console.log('Server Response:', data);
      if (data && data.prediction[0]) {
        onPrediction(data.prediction[0]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Camera style={{flex: 1, backgroundColor: 'transparent'}} type={type} ref={cameraRef}>
          <View>
            <TextInput
              style={{top: 100,alignSelf:'center', display: 'flex', 
                      height: 40, width: '60%', borderWidth: 1, borderColor: '#fff',
                      borderRadius: 5, textAlign: 'center', fontSize: 15}}
              placeholder='Search'
              autoCorrect={false}
              onSubmitEditing={(event) => onPrediction(event.nativeEvent.text)}
            />
            <Text style={{top: 150,alignSelf:'center', display: 'flex', color: 'white',
                      height: 40,textAlign: 'center', fontSize: 30}}>Photograph a Pokemon!</Text>
          </View>
          <View style={{top: 725,  flexDirection: 'row', justifyContent: 'space-around', padding:0,}}>
            <Pressable
              onPress={ () => {
                setType(
                  type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                );
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                },
                styles.pressWrapper,
              ]}>
              {({pressed}) => (
                <Text style={styles.text}>{pressed ? 'FLIP!' : 'FLIP'}</Text>
              )}
            </Pressable> 
             <Pressable
              onPress={async () => {
                if (cameraRef.current) {
                  let photo = await cameraRef.current.takePictureAsync({ base64: true});
                  setLastPhotoURI(photo.uri);

                  const resizedImage = await ImageManipulator.manipulateAsync(
                    photo.uri, 
                    [
                      { resize: { width: 224, height: 224 } } // This will maintain the aspect ratio
                    ],
                    { compress: 0.01, format: ImageManipulator.SaveFormat.JPEG }
                  );
                  
              
                  // Convert the compressed image data to base64
                  const base64Image = await FileSystem.readAsStringAsync(resizedImage.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
              
                  sendImageToServer(base64Image);
                  //console.log('Image Data:', photo.base64);
                }
              }}
              style={({pressed}) => [
                {
                  backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                },
                styles.pressWrapper,
              ]}>
              {({pressed}) => (
                <Text style={styles.text}>{pressed ? 'SNAP!' : 'SNAP'}</Text>
              )}
            </Pressable>
          </View>
          </Camera>
    
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    top: 13,
  },
  pressWrapper: {
    height: 50,
    width: '30%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 100,
    alignContent: 'center',
  
    
  }
});
