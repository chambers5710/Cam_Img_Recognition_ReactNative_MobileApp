import React, {useState} from 'react';
import HomeScreen from "./components/HomeScreen"
import CameraComponent from "./components/CameraComponent";
import StatsComponent from "./components/StatsComponent"
import { StyleSheet } from 'react-native';

const App = () => {
  const[currentView, setCurrentView] = useState('HomeScreen'); 
  const [predictedPokemon, setPredictedPokemon] = useState('');

  const handlePrediction = (predictedLabel) => {
    console.log('Received prediction:', predictedLabel);
    setPredictedPokemon(predictedLabel);
    setCurrentView('StatsComponent');
  };

  const switchToCamera = () => {
    setCurrentView('CameraComponent');
  };

  if (currentView === 'HomeScreen') {
    return <HomeScreen onSwitch={switchToCamera}/>
  } else if (currentView === 'StatsComponent') {
    return <StatsComponent pokemonName={predictedPokemon} onSwitch={switchToCamera}/>
  } else if (currentView === 'CameraComponent') {
    return <CameraComponent onPrediction={handlePrediction}/>
  }
};


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
