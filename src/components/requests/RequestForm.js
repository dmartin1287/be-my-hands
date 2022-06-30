import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {} from "react"
export const RequestForm = () => {
  /*
        TODO: Add the correct default properties to the
        initial state object
    */
  const [request, update] = useState({
    userId: 1,
    clientName: "",
    companyName: "",
    location: "",
    description: "",
    eventTypeId: 0,
    urgent: false,
    dateCompleted: "",
  });
  const [eventTypes, setEventTypes] = useState(
    []
    // id:"",
    // eventType: ""
  );
  useEffect(() => {
    fetch(`http://localhost:8088/eventTypes`)
      .then((response) => response.json())
      .then((eventTypeArray) => {
        setEventTypes(eventTypeArray);
      });
  }, []);

  /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
  let navigate = useNavigate();

  const localUser = localStorage.getItem("bmh_user");
  const bmhUserObject = JSON.parse(localUser);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    // TODO: Create the object to be saved to the API
    let requestToSendToAPI = {
      userId:bmhUserObject.id,
      clientName: request.clientName,

      companyName: request.companyName,

      location: request.location,

      description: request.description,

      eventTypeId: parseInt(request.eventTypeId),

      emergency: request.emergency,

      dateCompleted: "",
    };

    // TODO: Perform the fetch() to POST the object to the API
    return fetch(
      "http://localhost:8088/serviceRequests?_embed=employeeRequests?_expand=eventType",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestToSendToAPI),
      }
    )
      .then((response) => response.json())
      .then(() => {
        navigate("/requests");
      });
  };

  return (
    <form className="requestForm">
      <h2 className="requestForm__title">New Service Request</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="clientName"> Deaf Client's Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Deaf Client's Name"
            value={request.clientName}
            onChange={(event) => {
              const copy = { ...request };
              copy.clientName = event.target.value;
              update(copy);
            }}
          />
          <label htmlFor="companyName">Company Name:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Company Name"
            value={request.companyName}
            onChange={(event) => {
              const copy = { ...request };
              copy.companyName = event.target.value;
              update(copy);
            }}
          />
          <label htmlFor="description">Description:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Brief description of problem"
            value={request.description}
            onChange={(event) => {
              const copy = { ...request };
              copy.description = event.target.value;
              update(copy);
            }}
          />
          <label htmlFor="location">Location:</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Location Address"
            value={request.location}
            onChange={(event) => {
              const copy = { ...request };
              copy.location = event.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventType">Event Type:</label>
          <select
            //value={request.eventTypeId}
            onChange={(evt) => {
              const copy = { ...request }; // Copy of existing state
              copy.eventTypeId = parseInt(evt.target.value); 
              update(copy); 
            }}
          >
            <option value={0}>Please Select One</option>
            {eventTypes.map((eventType) => {
              return (
                <option key={eventType.id} value={eventType.id}>
                  {/* {""} */}
                  {eventType.eventType}
                </option>
              );
            })}
          </select>
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Urgent:</label>
          <input
            type="checkbox"
            value={request.emergency}
            onChange={(event) => {
              const copy = { ...request };
              copy.emergency = event.target.checked;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary"
      >
        Submit Request
      </button>
    </form>
  );
};
