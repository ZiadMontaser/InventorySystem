import { Link, useNavigate} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    function handleLogOut(){
        navigate('/');
        sessionStorage.removeItem('authorization')
    }

    return ( 
        <div className="navbar">
            <h1>Inventory Managment System</h1>

            <div className="links">
                {/* <Link to="/inventory">Inventory</Link> */}
                {sessionStorage.getItem('authorization') && <button onClick={handleLogOut} >LogOut</button>}
            </div>
        </div>
     );
}
 
export default NavBar;