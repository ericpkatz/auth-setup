import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import qs from 'qs';
const root = document.querySelector('#root');


const App = ()=> {
  const [auth, setAuth] = useState({ id: 123});

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      username,
      password
    };
  };

  const logout = ()=> {
    setAuth({});
  };

  return (
    <div>
      <h1>Auth App</h1>
      {
        !auth.id &&  (
          <form onSubmit={ onSubmit }>
            <h2>Login</h2>
            <div className='error'>{ error }</div>
            <input value={ username } onChange={ ev => setUsername(ev.target.value )}/>
            <input type='password' value={ password } onChange={ ev => setPassword(ev.target.value )}/>
            <button>Save</button>
          </form>
        )
      }
      {
        auth.id && <button onClick={ logout }>Logout { auth.username }</button>
      }
    </div>
  );
};

render(<App />, root); 
