import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pokedex } from 'pokeapi-js-wrapper/src/index';
import { FlatList, StyleSheet, View, TouchableOpacity, Button, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { NavigationActions } from 'react-navigation'

import PokemonCard from '../components/PokemonCard';
import PokeballLoader from '../components/PokeballLoader';

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 5,
        margin: 10
    },
    item: {
        marginTop: 10
    },
    errorView: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#e8d20f',
        paddingLeft: 10,
        alignItems: 'center',
        top: 0,
        left: 0
    }
});

class HomeScreen extends React.Component {

    pokedex = new Pokedex();

    state = {
        pokemons: [],
        page: 0,
        isLoading: false,
        error: null
    }

    static get propTypes() {
        return {
            navigation: PropTypes.object,
            error: PropTypes.object,
            dispatch: PropTypes.func
        };
    }

    componentDidMount() {
        this.fetchPokemons();
    }

    async fetchPokemons () {
        if(this.state.isLoading) return;
        const { error } = this.props;
        const { page } = this.state;
        this.setState({ ...this.state, isLoading: true });
        
        try{
            const pokemons = (await this.pokedex.getPokemonsList({
                limit: 10,
                offset: page * 10
            })).results;
            this.setState({
                pokemons: [ ...this.state.pokemons, ...pokemons ],
                page: page + 1,
                isLoading: false
            });
            if(error.message)
                this.props.dispatch({
                    type: 'error',
                    message: null
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

        const { error } = this.props;

        return (
            <View>
            {error.message
                ?   <View style={styles.errorView}>
                        <Text>{ error.message }</Text>
                    </View>
                :   null
            }
            {!this.state.isLoading && this.state.pokemons.length === 0
                ?   <Button
                        title="Reload"
                        onPress={() => this.fetchPokemons()}
                    />
                :   <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.pokemons}
                        renderItem={({item}) => this.renderItem(item)}
                        keyExtractor={item => item.name}
                        onEndReached={() => this.fetchPokemons()}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={this.renderFooter}
                    />
            }
            </View>
        );
    }

}

export default connect(state => ({error: state.error}))(HomeScreen);