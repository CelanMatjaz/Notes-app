import React from 'react';
import { Link } from 'react-router-dom';
import { useAppState } from '../../state/state.context';

const Navbar = ({ name }) => {
    const { state, dispatch } = useAppState();

    const logout = e => {
        e.preventDefault();
        dispatch({type: 1});
    }

    return (
        <div className="navbar">
            <div className="container">
                <div className="right">
                    <Link to="new-note">New note</Link>
                    <a onClick={logout} href="#" >Logout</a>
                </div>
            </div>
        </div>
    );
};
export default Navbar;