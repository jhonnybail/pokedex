import { FluidNavigator } from 'react-navigation-fluid-transitions';

import HomeScreen from '../screens/HomeScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';

const Routes = FluidNavigator({
    home: { screen: HomeScreen },
    pokemonDetail: { screen: PokemonDetailScreen }
}, {
    initialRouteName: 'home'
});

export default Routes;