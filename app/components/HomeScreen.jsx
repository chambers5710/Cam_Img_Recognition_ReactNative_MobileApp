import React, { useState, useEffect } from 'react';
import { Keyboard, View, Pressable, TouchableWithoutFeedback, TextInput, Button, Text, StyleSheet, Image, Dimensions } from 'react-native';

const sprite1 = `https://img.pokemondb.net/sprites/black-white/anim/normal/${'suicune'}.gif`;
const sprite2 = `https://img.pokemondb.net/sprites/black-white/anim/normal/${'entei'}.gif`;
const sprite3 = `https://img.pokemondb.net/sprites/black-white/anim/normal/${'raikou'}.gif`;



const HomeScreen = ({onSwitch}) => {
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 20,marginBottom: 100, fontSize:33, fontWeight:'bold', textAlign:'center'}}>
        Pokemon Image Interpreter
      </Text>
      <Text style={{marginTop: 20,marginBottom: 100, fontSize:33, fontWeight:'bold', textAlign:'center'}}>
        Pokemon Image Interpreter
      </Text>
      <View style={styles.imgContainer}>
      <Image source={{ uri: sprite1 }} style={[styles.image]} />
      <Image source={{ uri: sprite2 }} style={[styles.image]} />
      </View>
      <Image source={{ uri: sprite3 }} style={[styles.image]} />
      <Text style={{marginTop: 100, fontSize:20, textAlign:'center'}}>Designed for portfolio use by</Text>
      <Text style={{marginTop: 10, marginBottom: 45, fontSize:30, fontWeight:'bold', textAlign:'center'}}>Eric Chambers</Text>
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
  imgContainer: {
    flexDirection: 'row',
    padding: 0,
    marginVertical: 10,
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
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: -130,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 7,
  },
  chartTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

});

export default HomeScreen;
