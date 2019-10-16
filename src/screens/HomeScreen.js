import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pokedex } from 'pokeapi-js-wrapper/src/index';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation'

import PokemonCard from '../components/PokemonCard';
import PokeballLoader from '../components/PokeballLoader';

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 5
    },
    item: {
        marginTop: 10
    }
});

class HomeScreen extends React.Component {

    pokedex = new Pokedex();

    state = {
        pokemons: [],
        page: 0,
        isLoading: false
    }

    static get propTypes() {
        return {
            navigation: PropTypes.object
        };
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

    renderFooter = () => {
        if (!this.state.isLoading) return null;
          return (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                  <PokeballLoader />
              </View>
        );
    };

    openDetail = name => {
        return this.props.navigation.dispatch(
            NavigationActions.navigate({ 
                routeName: 'pokemonDetail',
                params: {
                    name
                }
            })
        );
    };

    renderItem = (item) => (
        <TouchableOpacity
            onPress={() => this.openDetail(item.name)}>
            <Animatable.View animation="fadeInUp" iterationCount={1}>
                <PokemonCard name={item.name} style={styles.item} />
            </Animatable.View>
        </TouchableOpacity>
    )

    render () {
        return (
              <FlatList
                  contentContainerStyle={styles.list}
                  data={this.state.pokemons}
                  renderItem={({item}) => this.renderItem(item)}
                  keyExtractor={item => item.name}
                  onEndReached={() => this.fetchPokemons()}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={this.renderFooter}
              />
        );
    }

}

export default connect()(HomeScreen);