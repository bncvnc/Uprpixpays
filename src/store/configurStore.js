import { createStore, combineReducers, compose ,applyMiddleware} from 'redux';
import authReducers from './reducers/auth';
import uiReducers from './reducers/ui';
import pagesReducers from './reducers/pages';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user:authReducers,
    isLoading:uiReducers,
    BestImages:pagesReducers
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};


export default configureStore;