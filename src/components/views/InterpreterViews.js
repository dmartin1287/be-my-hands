import { Outlet, Route, Routes } from "react-router-dom"
import { ClientDetails } from "../clients/ClientDetails"
import { ClientList } from "../clients/ClientList"
import { InterpreterDetails } from "../interpreters/InterpreterDetails"
import { InterpreterList } from "../interpreters/InterpreterList"
import { Profile } from "../Profile/Profile"
import { RequestList } from "../requests/RequestList"
// import { HomePage } from "../Home/Homepage"
import "./InterpreterViews.css";



export const InterpreterViews = () => {
        return ( <Routes>
            <Route path = "/"
            element = { <> {
                    /* <img
                                  className="bmh_logo"
                                  src={"image/logo.gif"}
                                  alt="be my hands logo"
                                /> */
                } <h1 > Be My Hands </h1> <img className = "bmh" src = { "image/bmh.png" }
                alt = "be my hands" />
                <div>
                <em>
                Bringing communication access to the Deaf and Hard of Hearing
                communities </em> </div> <Outlet/>
                </>
            } >
            <Route path = "requests"
            element = { <> { < RequestList /> } </>} />
                <Route path = "interpreters"
                element = { < InterpreterList /> }
                /> <Route path = "interpreters/:interpreterId"
                element = { < InterpreterDetails /> }
                /> <Route path = "clients"
                element = { < ClientList /> }
                /> <Route path = "clients/:clientId"
                element = { < ClientDetails /> }
                /> <Route path = "profile"
                element = { < Profile /> }
                /> 
             {/* <Route path= "Home" element = { < HomePage />} />  */}
                </Route>
          
                 </Routes>
            );
        }