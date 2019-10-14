import {
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

export default (AppNavigator) => {
    const navReducer = createNavigationReducer(AppNavigator);
    const middleware = createReactNavigationReduxMiddleware(
        'root',
        state => state.nav,
    );
    return { navReducer, middleware };
};