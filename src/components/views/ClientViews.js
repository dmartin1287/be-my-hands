import { Outlet, Route, Routes } from "react-router-dom"
import { Profile } from "../Profile/Profile"
import { RequestDetails } from "../requests/RequestDetails"
import { RequestEdit } from "../requests/RequestEdit"
import { RequestForm } from "../requests/RequestForm"
import { RequestList } from "../requests/RequestList"
// import { RequestSearch } from "../requests/RequestSearch"
// import { HomePage } from "../Home/Homepage"



export const ClientViews = () => {
	return (
    <Routes>
      <Route
        path="/"
        element={
          <>
           
            <h1>Be My Hands</h1>
           <img className="bmh" src={"/image/bmh.png"} alt="be my hands" />
            <div>
              {" "}
              <em>
                Bringing communication access to the Deaf and Hard of Hearing
                communities
              </em>
             
            </div>

            <Outlet />
          </>
        }
      >
        <Route
          path="requests"
          element={
            <>
              {/*These cannot communicate with one another until they are wrapped in a parent
                    
                    <RequestList /> 
                    They will now be returned in RequestContainer.js
                    */}
              <RequestList />
            </>
          }
        />
        {/* <Route path="Home" element={ < HomePage />} />  */}
        <Route path="request/create" element={<RequestForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="requests/:requestId" element={<RequestDetails />} />
        <Route path="requests/:requestId/edit" element={<RequestEdit />} />
      </Route>
    </Routes>
  );
}