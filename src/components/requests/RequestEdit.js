import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const RequestEdit = () => {
    const [request, update] = useState({
        description: "",
        urgent: false
    })
    const { requestId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/serviceRequests/${requestId}`)
            .then(response => response.json())
            .then((data) => {
                update(data)
            })
    }, [requestId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceRequests/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/requests")
            })
    }


    return <form className="requestForm">
        <h2 className="requestForm__title">Request Interpreter</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={request.description}
                    onChange={
                        (evt) => {
                            const copy = { ...request }
                            copy.description = evt.target.value
                            update(copy)
                        }
                    }>{request.description}</textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="name">Urgent:</label>
                <input type="checkbox"
                    checked={request.urgent}
                    onChange={
                        (evt) => {
                            const copy = { ...request }
                            copy.urgent = evt.target.checked
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
       
    </form>
}