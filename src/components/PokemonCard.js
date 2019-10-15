import React from 'react';
import PropTypes from 'prop-types';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Pokedex } from 'pokeapi-js-wrapper/src/index';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

import PokeballLoader from '../components/PokeballLoader';

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
        alignItems: 'center'
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
        backgroundColor: '#FFF'
    },
    pokemonImage: {
        width: wp('100%'),
        height: hp('100%')
    },
    viewInfo: {
        flex: 1,
        height: 150
    }
});

class PokemonCard extends React.Component {

    pokedex = new Pokedex();
    name = null;

    state = {
        pokemon: null,
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
        this.setState({
            ...this.state,
            pokemon,
            isLoading: false
        });
    }

    renderInfo = () => (
        <View style={styles.container}>
            <View style={styles.viewImage}>
                
            </View>
            <View style={styles.viewInfo}>
                <Text>{this.name}</Text>
            </View>
        </View>
    );

    render() {
        const { style } = this.props;
        
        return (
            <TouchableOpacity>
                <View style={{...styles.card, ...style}}>
                {!this.state.isLoading
                    ?   this.renderInfo()
                    :   <PokeballLoader />
                }
                </View>
            </TouchableOpacity>
        );
    }

}

export default PokemonCard;