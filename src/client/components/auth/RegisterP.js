import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Message from '../layout/Message';

const RegisterContainer = props => {
    const { email, password, passwordRepeat, name } = props.data;
    const { handleChange: { setEmail, setPassword, setPasswordRepeat, setName }, handleSubmit, errors, message } = props;
    return (
        <div className="form form-auth">
            <form onSubmit={handleSubmit}>
                {errors && errors.length > 0 && errors.map((error, i) => <Message type="danger" message={error} key={i}/>)}
                {message && <Message type="success" message={message}/>}
                <h1>Register</h1>                
                <label htmlFor="email">Email</label> <br/>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                /><br/>

                <label htmlFor="name">Display name</label> <br/>
                <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required
                /><br/>
                
                <label htmlFor="password">Password</label> <br/>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                /><br/>

                <label htmlFor="passwordRepeat">Repeat password</label> <br/>
                <input 
                    type="password" 
                    id="passwordRepeat" 
                    value={passwordRepeat} 
                    onChange={e => setPasswordRepeat(e.target.value)} 
                    required
                /><br/>
                <button>Register</button>
                <br/> <br/>
                <Link to="/login">Or login</Link>
            </form>
        </div>
    );
};

export default RegisterContainer;