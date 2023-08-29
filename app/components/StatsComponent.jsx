import React, { useState, useEffect } from 'react';
import { Keyboard, View, TouchableWithoutFeedback, TextInput, Button, Text, StyleSheet, Image, Dimensions } from 'react-native';

const PokemonStats = ({ pokemonName, onSwitch }) => {
  const [search, setSearch] = useState("");
  const [pokemonStats, setPokemonStats] = useState(null);
  const [pokemonImage, setPokemonImage] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(pokemonName);


  useEffect(() => {
    fetchPokemonStats(currentPokemon.toLowerCase());
  }, [currentPokemon]);

  const handleSubmit = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    const trimmedSearch = search.trim().toLowerCase(); // Make sure the search string is in lower case

    setCurrentPokemon(capitalizeFirstLetter(trimmedSearch));
    fetchPokemonStats(trimmedSearch);
    setSearch("");
  };

  const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };


  const fetchPokemonStats = async (nameToSearch = pokemonName.toLowerCase()) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameToSearch}/`);
      if (!response.ok) {
        console.error('Error status:', response.status);
        return;
      }
      const data = await response.json();
      const pokemonTypes = data.types.map(typeObj => typeObj.type.name);
      const stats = data.stats;
      const hp = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const specialAttack = stats[3].base_stat;
      const specialDefense = stats[4].base_stat;
      const speed = stats[5].base_stat;

      const pokemonStats = {
        hp,
        attack,
        defense,
        specialAttack,
        specialDefense,
        speed,
      };

      setPokemonStats(pokemonStats);
      setPokemonTypes(data.types.map((type) => type.type.name.toUpperCase()));  // Convert type names to uppercase

      const spriteUrl = `https://img.pokemondb.net/sprites/black-white/anim/normal/${nameToSearch}.gif`;
      setPokemonImage(spriteUrl);
      
    } catch (error) {
      console.error('Error fetching Pokemon stats:', error);
    }

  };


  const getStatBarColor = (statValue) => {
    if (statValue <= 29) {
      return 'rgb(255, 51, 68)'; // Red
    } else if (statValue > 29 && statValue <= 59) {
      return 'rgb(255, 127, 15)'; // Orange
    } else if (statValue > 59 && statValue <= 89) {
      return 'rgb(255, 221, 87)'; // Yellow
    } else if (statValue > 89 && statValue <= 119) {
      return 'rgb(160, 229, 21)'; // Green  
    } else if (statValue > 119 && statValue <= 149) {
      return 'rgb(35, 205, 95)'; // Greenish
    } else if (statValue > 149 && statValue <= 200) {
      return 'rgb(0, 194, 184)'; // Blue    
    } else {
      return 'rgb(0, 0, 0)'; // Default color (black), in case the value is out of expected range
    }
  };
  
   

  const renderStatBar = (statValue) => {
    const statPercentage = (statValue / 200) * 100; // Calculate the percentage of the max value (200)
    const statBarColor = getStatBarColor(statValue);

    return (
      <View style={styles.statBarContainer}>
        <View style={[styles.statBar, { width: `${statPercentage}%`, backgroundColor: statBarColor }]} />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearch}
        value={search}
        onSubmitEditing={handleSubmit}
        placeholder="Search for a Pokemon"
        autoCorrect={false}
      />
      <Button title="Submit" style={styles.Buttons} onPress={handleSubmit} />
      {pokemonStats && pokemonImage && (
        <View style={styles.statsContainer}>
          <Image source={{ uri: pokemonImage }} style={styles.image} />
          <Text style={styles.chartTitle}>{capitalizeFirstLetter(currentPokemon)}</Text>
          <Text style={styles.Types}>{pokemonTypes.join(' / ')}</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>HP:</Text>
              <Text style={styles.tableValue}>{pokemonStats.hp}</Text>
              {renderStatBar(pokemonStats.hp)}
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Attack:</Text>
              <Text style={styles.tableValue}>{pokemonStats.attack}</Text>
              {renderStatBar(pokemonStats.attack)}
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Defense:</Text>
              <Text style={styles.tableValue}>{pokemonStats.defense}</Text>
              {renderStatBar(pokemonStats.defense)}
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Sp. Attack:</Text>
              <Text style={styles.tableValue}>{pokemonStats.specialAttack}</Text>
              {renderStatBar(pokemonStats.specialAttack)}
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Sp. Defense:</Text>
              <Text style={styles.tableValue}>{pokemonStats.specialDefense}</Text>
              {renderStatBar(pokemonStats.specialDefense)}
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableLabel}>Speed:</Text>
              <Text style={styles.tableValue}>{pokemonStats.speed}</Text>
              {renderStatBar(pokemonStats.speed)}
            </View>
          </View>
          <Button title="Back to Camera" onPress={onSwitch} />
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#f3ffe3',
    alignItems: 'center',
    padding: 75,
  },
  statsContainer: {
    marginTop: 0,
    alignItems: 'center',
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
  Types: {
    fontSize: 16,
    color: '#737373',
    marginBottom: 20,
  },
  tableContainer: {
    width: '150%',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tableLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 100,
    marginRight: -15,
  },
  tableValue: {
    fontSize: 16,
    textAlign: 'right',
    width: 50,
    marginRight: 8,
  },
  statBarContainer: {
    width: '40%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  statBar: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#ff6b6b',
  },
});

export default PokemonStats;
