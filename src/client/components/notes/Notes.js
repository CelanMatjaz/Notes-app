import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//Components
import Navbar from '../layout/Navbar';

const Notes = ({ isEmpty, history: { push } }) => {
    if(isEmpty) push('/register');
    return (
        <div>
            <Navbar/>
            <main>

            </main>
        </div>
    );
};

const mapStateToProps = state => ({
    isEmpty: state.auth.isEmpty
});

export default connect(mapStateToProps)(Notes);