import React from 'react';
import { useAppState } from '../../state/state.context';

const Navbar = ({ name }) => {
    const { state, dispatch } = useAppState();
    const { isEmpty } = state;

    const logout = () => {
        dispatch({type: 1});
    }

    return (
        <div className="navbar">
            <div className="container">
                <div className="left">{name || 'Anonymous'}</div>
                {!isEmpty && <button onClick={logout}>Logout</button>}
            </div>
        </div>
    );
};
export default Navbar;