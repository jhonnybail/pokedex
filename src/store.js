import { createStore, combineReducers, applyMiddleware } from 'redux';
import { navReducer, middleware } from './navigation';
import { error as errorReducer } from './reducer/error';

const rootReducer = combineReducers({
    nav: navReducer,
    error: errorReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(middleware),
);

export default store;