import { Link } from "react-router-dom";

export const Request = ({ requestObject, userObject, interpreters, getRequests }) => {
  //find assigned interpreter for current request
  let assignedInterpreter = null;

  if (requestObject.interpreterRequests.length !== 0) {
    let requestInterpreterRelationship = requestObject.interpreterRequests[0];
    assignedInterpreter = interpreters.find(
      (interpreter) => interpreter.id === requestInterpreterRelationship.interpreterId
    );
  }

  let userInterpreter = interpreters.find(
    (interpreter) => interpreter.userId === userObject.id
  );

  //determines if current user can close request (if they are the one assigned to request)
  const canClose = () => {
    if (
      assignedInterpreter?.id === userInterpreter?.id &&
      requestObject.dateCompleted === ""
    ) {
      return (
        <button onClick={closeRequest} className="request__finish">
          Close Request
        </button>
      );
    } else {
      return "";
    }
  };

  //updates request with a new date completed
  const closeRequest = () => {
    const copy = {
      userId: requestObject.userId,
      clientName: requestObject.clientName,
      clientLastName: requestObject.clientLastName,
      companyName: requestObject.companyName,
      location: requestObject.location,
      serviceTypeId: requestObject.serviceTypeId,
      eventTypeId: requestObject.eventTypeId,
      description: requestObject.description,
        date: requestObject.date,
        time: requestObject.time,
        endtime: requestObject.endtime,
        timeZoneId: requestObject.timeZoneId,
      urgent: requestObject.urgent,
      dateCompleted: new Date(),
    };

    return fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(copy),
    })
      .then((response) => response.json())
      .then(getRequests);
  };

  const showCompletedDate = () => {
    if (requestObject.dateCompleted !== "") {
      return <div>Date Completed: {requestObject.dateCompleted}</div>;
    } else {
      return <div>Assigned to {assignedInterpreter?.user?.fullName}</div>;
    }
  };

  const deleteButton = () => {
    if (userObject.staff === false) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/serviceRequests/${requestObject.id}`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then(getRequests);
          }}
          className="request__delete"
        >
          Delete
        </button>
      );
    } else {
      return "";
    }
  };

  const allowEdit = () => {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = `http://localhost:3000/requests/${requestObject.id}/edit`;
        }}
      >
        Edit
      </button>
    );
  };

  //find employee profile object of current user

  return (
    <section className="request">
      <div>
        {userObject.staff ? (
          <header>Request {requestObject.id}</header>
        ) : (
          <>
            Request {requestObject.id}
            <br></br>
            <Link to={`/requests/${requestObject.id}`}>(Details)</Link>
          </>
        )}
      </div>
      <div>First Name: {requestObject.clientName}</div>
      <div>Last Name: {requestObject.clientLastName}</div>
      <div>Company Name: {requestObject.companyName}</div>
      <div>Location: {requestObject.location}</div>
      <div>Description: {requestObject.description}</div>
       <div> Service needed: {requestObject?.serviceType?.serviceType}</div> 
      <div> Event type: {requestObject?.eventType?.eventType}</div> 
      <div>Date needed: {requestObject.date}</div>
      <div>Start time: {requestObject.time}</div>
      <div>End time: {requestObject.endtime}</div>
      <div> Time Zone: {requestObject?.timeZone?.timeZone}</div> 
      <div>Urgent: {requestObject.urgent ? "⚠️" : "No"}</div>
      {userObject.staff ? (
        requestObject.interpreterRequests.length ? (
          <footer>
            {showCompletedDate()} {canClose()}
          </footer>
        ) : (
          <button
            onClick={() => {
              fetch(`http://localhost:8088/interpreterRequests`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  interpreterId: userInterpreter.id,
                  serviceRequestId: requestObject.id,
                }),
              })
                .then((response) => response.json())
                .then(() => {
                  //GET the updated state from the API again
                  getRequests();
                });
            }}
          >
            Claim
          </button>
        )
      ) : (
        <>
          {allowEdit()}
          {deleteButton()}
        </>
      )}
    </section>
  );
};
//ticketObject.eventType.eventType for line 120