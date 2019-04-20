import { useContext, createContext } from 'react';

export const StateContext = createContext({
    isEmpty: true
});

export const useAppState = () => useContext(StateContext);