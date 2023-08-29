import React, { useState, useEffect } from 'react';
import { Keyboard, View, Pressable, TouchableWithoutFeedback, TextInput, Button, Text, StyleSheet, Image, Dimensions } from 'react-native';

const HomeScreen = ({onSwitch}) => {
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 20,fontSize:33, fontWeight:'bold', textAlign:'center'}}>
        Trained Keras CNN Pokemon Image Interpreter
      </Text>
      <Text style={{marginTop: 60, fontSize:20, textAlign:'center'}}>Designed for portfolio use by</Text>
      <Text style={{marginTop: 10, marginBottom: 60, fontSize:30, fontWeight:'bold', textAlign:'center'}}>Eric Chambers</Text>
      <Button style={styles.button} title="Open Camera to Start" onPress={onSwitch} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    
  },
  searchBar: {
    width: '130%',
    height: 50,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    marginTop: 0,
  },
  pressWrapper: {
    
    height: 50,
    width: '30%',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 100,
  
    
  },
  container: {
    flex: 1,
    backgroundColor: '#f3ffe3',
    alignItems: 'center',
    textAlignVertical: 'center',
    padding: 75,
  },

  image: {
    resizeMode: 'contain',
    marginTop: 35,
    marginBottom: 35,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 10,
  },
  chartTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
  },

});

export default HomeScreen;
