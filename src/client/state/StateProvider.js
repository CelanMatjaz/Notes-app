import React, { useReducer, useEffect } from 'react';
import { reducer } from './state.reducer';
import { StateContext } from './state.context';
 
const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { isEmpty: true });

    useEffect(() => {
      dispatch({ type: 2 });
    }, [])

    return (
        <StateContext.Provider value={{ state, dispatch }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;