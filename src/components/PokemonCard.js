import React from 'react';
import PropTypes from 'prop-types';
import { Pokedex } from 'pokeapi-js-wrapper/src/index';
import { View, Text, StyleSheet, Image } from 'react-native';

import PokeballLoader from '../components/PokeballLoader';
import pokeballImage from '../../assets/pokeball.png';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 150,
        backgroundColor: '#F00',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10 
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 150 
    },
    viewImage: {
        flex: 1,
        height: 150,
        backgroundColor: '#FFF',
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    pokemonImage: {
        width: '100%',
        height: '100%'
    },
    containerPokeball: {
        position: 'absolute',
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    pokeball: {
        width: 50,
        height: 50,
    },
    viewInfo: {
        flex: 1,
        height: 150,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    name: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'right', 
        alignSelf: 'stretch'
    }
});

class PokemonCard extends React.Component {

    pokedex = new Pokedex();
    name = null;

    state = {
        pokemon: null,
        specie: null,
        isLoading: false
    }

    static get propTypes () {
        return {
            name: PropTypes.string,
            style: PropTypes.object
        }
    }

    constructor ({name}) {
        super();
        this.name = name;
    }

    componentDidMount() {
        this.fetchPokemon(this.name);
    }

    async fetchPokemon (name) {
        this.setState({
            ...this.state,
            isLoading: true
        })
        const pokemon = await this.pokedex.getPokemonByName(name); 
        const specie  = await this.pokedex.getPokemonSpeciesByName(name);
        this.setState({
            ...this.state,
            pokemon,
            specie,
            isLoading: false
        });
    }

    renderInfo = ({pokemon, specie}) => (
        <View style={styles.container}>
            <View style={{...styles.viewImage, borderTopColor: specie.color.name, borderTopWidth: 5}}>
                <Image 
                    resizeMode="contain" 
                    source={{ uri: pokemon.sprites.front_default }} 
                    style={styles.pokemonImage} />
            </View>
            <View style={{...styles.viewInfo}}>
                <Text style={styles.name}>{ this.name.charAt(0).toLocaleUpperCase() + this.name.substr(1) }</Text>
                <Text style={styles.name}>{ pokemon.types.sort((a, b) => a.slot - b.slot)[0].type.name }</Text>
            </View>
            <View style={styles.containerPokeball}>
              <Image source={pokeballImage} style={styles.pokeball} />
            </View>
        </View>
    );

    render() {
        const { style } = this.props;
        const { pokemon, specie } = this.state;
        return (
            <View style={{...styles.card, ...style}}>
            {!this.state.isLoading && pokemon
                ?   this.renderInfo({pokemon, specie})
                :   <PokeballLoader />
            }
            </View>
        );
    }

}

export default PokemonCard;