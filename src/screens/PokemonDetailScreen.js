import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pokedex } from 'pokeapi-js-wrapper/src/index';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'

import PokeballLoader from '../components/PokeballLoader';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    image: {
        width: '100%',
        height: '50%',
        backgroundColor: '#F00'
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        textShadowOffset:{
            width: 1, 
            height: 1
        },
        textShadowRadius: 2
    },
    type: {
        fontSize: 15,
        marginTop: 10
    }
});

class PokemonDetailScreen extends React.Component {

    pokedex = new Pokedex();

    state = {
        pokemon: null,
        specie: null,
        isLoading: true
    }

    static get propTypes() {
        return {
            navigation: PropTypes.object,
            dispatch: PropTypes.func
        };
    }

    componentDidMount () {
        this.fetchPokemon(this.props.navigation.state.params.name);
    }

    async fetchPokemon (name) {
        this.setState({
            ...this.state,
            isLoading: true
        })
        try{
            const pokemon = await this.pokedex.getPokemonByName(name); 
            const specie  = await this.pokedex.getPokemonSpeciesByName(name);
            this.setState({
                ...this.state,
                pokemon,
                specie,
                isLoading: false
            });
        }catch(error){
            this.setState({
                ...this.state,
                isLoading: false
            });
            this.props.dispatch({
                type: 'error',
                message: error.message
            });
        }
    }

    renderContent = ({pokemon, specie}) => (
        <View>
            <Image 
                resizeMode="contain" 
                source={{ uri: pokemon.sprites.front_default }} 
                style={{...styles.image, backgroundColor: specie.color.name}} />
            <Text style={{...styles.name, textShadowColor: specie.color.name}}>{ pokemon.name.charAt(0).toLocaleUpperCase() + pokemon.name.substr(1) }</Text>
            <Text style={styles.type}>{ pokemon.types.sort((a, b) => a.slot - b.slot)[0].type.name }</Text>
            <Text style={styles.name}>Abilities</Text>
            {
                pokemon.abilities.map((ability, key) => <Text key={key}>{ ` => ${ability.ability.name}` }</Text>)
            }
        </View>
    );

    goBack = () => {
        return this.props.navigation.dispatch(
            NavigationActions.back()
        );
    };

    render () {
        const {pokemon, specie} = this.state
        return (
            <View style={styles.container}>
                <Button 
                    title="Go Back"
                    onPress={this.goBack}
                />
                {!this.state.isLoading
                    ?   this.renderContent({
                            pokemon,
                            specie
                        })
                    :   <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <PokeballLoader />
                        </View>
                }
            </View>
        );
    }

}

export default connect()(PokemonDetailScreen);