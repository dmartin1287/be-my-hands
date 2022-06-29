import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const InterpreterNavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
             {/* <li className="navbar__item active">
                 <img className="logo" src={"/image/logo.jpeg"} alt ="logo" />
            </li> */}
           {/* <li className="navbar__item">
                <Link className="navbar__link__home" to="/home">Home</Link>
            </li> */}
            <li className="navbar__item active">
                <Link className="navbar__link" to="/requests">Requests</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/interpreters">Interpreters</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/clients">Clients</Link>
            </li>
             <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> 
            {
                localStorage.getItem("bmh_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("bmh_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}