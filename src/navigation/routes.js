import { FluidNavigator } from 'react-navigation-fluid-transitions';

import HomeScreen from '../screens/Home';

const Routes = FluidNavigator({
    home: { screen: HomeScreen }
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