import {ClientForm } from "./ClientForm"
import { InterpreterForm } from "./InterpreterForm"

export const Profile = () => {

    const localUser = localStorage.getItem("bmh_user")
    const bmhUserObject = JSON.parse(localUser)

    if(bmhUserObject.staff) {
        //return interpreter views
        return (
            <InterpreterForm />
        )
    }
    else {
        //return client views
        return (
            <ClientForm />
        )
    }

}