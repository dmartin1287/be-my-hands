import { Outlet, Route, Routes } from "react-router-dom"
import { ClientDetails } from "../clients/ClientDetails"
import { ClientList } from "../clients/ClientList"
import { InterpreterDetails } from "../interpreters/InterpreterDetails"
import { InterpreterList } from "../interpreters/InterpreterList"
import { Profile } from "../Profile/Profile"
import { RequestContainer } from "../requests/RequestContainer"
import { RequestDetails } from "../requests/RequestDetails"

export const InterpreterViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 > Be My Hands </h1> <img className = "bmh" src = { "image/bmh.png" }
                alt = "be my hands" />
                <div>
                <em>
                Bringing communication access to the Deaf and Hard of Hearing
                communities </em> </div> 

                    <Outlet />
                </>
            }>

                <Route path="requests" element={ 
                <>
                    {/*These cannot communicate with one another until they are wrapped in a parent
                    <RequestSearch />
                    <RequestList /> 
                    They will now be returned in RequestContainer.js
                    */}
                    <RequestContainer />
                </>
            } />
                <Route path="interpreters" element={ <InterpreterList /> } />
                <Route path="interpreters/:interpreterId" element={ <InterpreterDetails /> } />
                <Route path="clients" element={ <ClientList /> } />
                <Route path="clients/:clientId" element={ <ClientDetails /> } />
                <Route path="Profile" element={ <Profile /> } />
            </Route>
        </Routes>
    )
}