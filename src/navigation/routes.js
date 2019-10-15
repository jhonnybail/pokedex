import { FluidNavigator } from 'react-navigation-fluid-transitions';

import PokemonList from '../screens/PokemonList';

const Routes = FluidNavigator({
    home: { screen: PokemonList }
}, {
    initialRouteName: 'home',
    navigationOptions: {
        headerTintColor: '#FFF',
        headerStyle: {
            height: 50,
            marginTop: 2,
            backgroundColor: '#000'
        },
        headerForceInset: true
    }
});

export default Routes;