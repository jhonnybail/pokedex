import { createStore, combineReducers, applyMiddleware } from 'redux';
import { navReducer, middleware } from './navigation';

const rootReducer = combineReducers({
    nav: navReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(middleware),
);

export default store;