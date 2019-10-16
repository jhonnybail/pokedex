import { FluidNavigator } from 'react-navigation-fluid-transitions';

import PokemonList from '../screens/PokemonList';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

const Routes = FluidNavigator({
    home: { screen: PokemonList },
    pokemonDetail: { screen: PokemonDetailScreen }
}, {
    initialRouteName: 'home'
});

export default Routes;