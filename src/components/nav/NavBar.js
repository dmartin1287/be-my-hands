
import { ClientNavBar } from "./ClientNav"
import { InterpreterNavBar } from "./InterpreterNav"
import "./NavBar.css"

export const NavBar = () => {

    const localUser = localStorage.getItem("bmh_user")
    const bmhUserObject = JSON.parse(localUser)

    if(bmhUserObject.staff) {
        //return Interpreter views
        return (
            <InterpreterNavBar />
        )
    }
    else {
        //return Client views
        return (
            <ClientNavBar />
        )
    }
}