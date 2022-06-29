import { ClientViews } from "./ClientViews"
import { InterpreterViews } from "./InterpreterViews"


export const ApplicationViews = () => {

    const localUser = localStorage.getItem("bmh_user")
    const bmhUserObject = JSON.parse(localUser)

    if (bmhUserObject.staff) {
        //return interpreter views
        return ( <InterpreterViews/>
        )
    } else {
        //return client views
        return (
             <ClientViews/>
        )
    }

}