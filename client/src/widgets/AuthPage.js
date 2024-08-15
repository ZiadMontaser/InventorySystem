import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import callEndPoint from '../hooks/useAPI'

const AuthPage = ({setIsAdminCallBack}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navaigate = useNavigate();

    const [isLogInPage, setIsLogInPage] = useState(false)
    
    async function LogIn(e)  {
        e.preventDefault();
        
        const encodedCred = window.btoa(`${username}:${password}`);
        sessionStorage.setItem('authorization', encodedCred)

        const res = await callEndPoint('GET', 'login');

        if(typeof res == "boolean" && !res){
            alert("Access denied");
            sessionStorage.removeItem('authorization')
            return;
        }

        console.log(`Logged in with admin set to ${res.isAdmin}`)
        sessionStorage.setItem('isAdmin', res.isAdmin ? 1 : 0)

        navaigate('/inventory')
    }

    return ( 
        <div className="authpage">
            <h2>Welcome back, Mr. ....</h2>
            <form onSubmit={LogIn}>
                <label>Username:</label>
                <input
                    type="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button> Log In</button>

                <a href="/signup">Don't have an account</a>
            </form>

            <p>
            For Admin testing use Username: admin, Password: 12345
            <br/>
            For Regular user testing use Username: user, Password: 12345
            </p>
        </div>



     );
}
 
export default AuthPage;