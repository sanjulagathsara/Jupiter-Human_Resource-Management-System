import{ useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Employee.css';

const Employee = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('') 
    function handleSubmit(event){
        event.preventDefault();
    }

    return ( 
        <div className='login-container'>
            <div className='form-group'>
                <form onSubmit={handleSubmit}>
                    <div>
                    <label for='username'>Username</label>
                    <input type='text' id='username' name='username' placeholder='username' />
                    onChange={(e) => setEmail(e.target.value)}
                    </div>
                    <div>
                    <label for='password'>Password</label>
                    <input type='password' id='password' name='password' placeholder='password' />
                    onChange={(e) => setPassword(e.target.value)}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
     );
}
 
export default Employee;