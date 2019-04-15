import rootReducer from '../client/store/rootReducer';
import logger from 'redux-logger';
import { configureStore } from 'redux-starter-kit'

const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [logger]
});

export default store;