import React from 'react';
import { Provider } from 'react-redux';
import { Navigator } from './navigation';

import store from './store';
import StatusBar from './components/StatusBar';

class App extends React.Component {
    render () {
        return (
            <>
                <StatusBar />
                <Provider store={store}>
                    <Navigator />
                </Provider>
            </>
        );
    }
}

export default App;