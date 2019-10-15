import React from 'react';
import { Pokedex } from 'pokeapi-js-wrapper/src/index';
import { FlatList, Text, StyleSheet } from 'react-native';

import PokemonCard from '../components/PokemonCard';
import PokeballLoader from '../components/PokeballLoader';

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 5
    },
    item: {
        marginTop: 10,
        borderRadius: 10
    }
});

class PokemonList extends React.Component {

    pokedex = new Pokedex();

    state = {
        pokemons: [],
        page: 0,
        isLoading: false
    }

    componentDidMount() {
        this.fetchPokemons();
    }

    async fetchPokemons () {
        if(this.state.isLoading) return;

        const { page } = this.state;
        this.setState({ ...this.state, isLoading: true });
        const pokemons = (await this.pokedex.getPokemonsList({
            limit: 10,
            offset: page * 10
        })).results;
        
        this.setState({
            pokemons: [ ...this.state.pokemons, ...pokemons ],
            page: page + 1,
            isLoading: false,
        });
    }

    render () {
        return (
            <FlatList
                contentContainerStyle={styles.list}
                data={this.state.pokemons}
                renderItem={({item}) => <PokemonCard name={item.name} style={styles.item} />}
                keyExtractor={item => item.name}
                onEndReached={this.loadRepositories}
                onEndReachedThreshold={0.1}
            />
        );
    }

}

export default PokemonList;