import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { Navigator } from './navigation';

import store from './store';
import StatusBar from './components/StatusBar';

const styles = StyleSheet.create({
    pokedex: {
        width: '100%',
        padding: 20,
        paddingBottom: 20,
        backgroundColor: '#F00'
    },
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: 'black',
        shadowRadius: -10,
        shadowOpacity: 1,
        shadowOffset: {
          width: -5,
          height: -5
        }
    }
});

class App extends React.Component {

    state = {
        componentHeight: Dimensions.get('screen').height - 20
    }

    onLayout = () => {
        this.setState({
            ...this.state,
            componentHeight: Dimensions.get('screen').height - 20
        });
    }

    render () {

        const {componentHeight} = this.state;

        return (
            <>
                <StatusBar />
                <View 
                    onLayout={this.onLayout}
                    style={{...styles.pokedex, height: componentHeight}}>
                    <View style={styles.screen}>
                        <Provider store={store}>
                            <Navigator />
                        </Provider>
                    </View>
                </View>
            </>
        );
    }
}

export default App;