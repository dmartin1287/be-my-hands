import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const RequestDetails = () => {
    //only displays when route = request/:requestId (some number)
    const {requestId} = useParams()
    const [request, updateRequest] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceRequests?_expand=user&id=${requestId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleRequest = data[0]
                    updateRequest(singleRequest)
                })
        },
        [requestId]
    )

    return  <section className="request">
                    <header className="request__header">Request {request.id}</header>
                    <div>Description: {request.description}</div>
                    <div>Urgent: {request.urgent ? "Yes" : "No"}</div>
                    <div>Submitted By: {request?.user?.fullName}</div>
                    {}
        </section>
}