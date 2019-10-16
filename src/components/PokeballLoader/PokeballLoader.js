import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

import pokeballImage from '../../../assets/pokeball.png';

const styles = StyleSheet.create({
    pokeball: {
        width: 50,
        height: 50
    }
});

class PokeballLoader extends React.Component {

    render() {
        return (
            <Animatable.Image animation="rotate" iterationCount="infinite" source={pokeballImage} style={styles.pokeball} />
        );
    }

}

export default PokeballLoader;