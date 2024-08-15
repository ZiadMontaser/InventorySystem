import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AuthPage from './AuthPage';
import NavBar from './NavBar';
import Inventory from './Inventory';
import { createContext } from 'react';

const App = () => {
    return ( 
            <BrowserRouter>
                <div className="App">
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<AuthPage />}></Route>
                        <Route path="/inventory" element={<Inventory/>}></Route>
                    </Routes>
                </div>
            </BrowserRouter>

     );
}
 
export default App;