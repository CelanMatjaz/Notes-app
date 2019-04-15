import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Navbar = ({ name }) => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="left">{name || 'Anonymous'}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.auth.userInfo.name || null
});

export default withRouter(connect(mapStateToProps)(Navbar));