import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ClientDetails = () => {
    //only displays when route = client/:clientId (some number)
    const {clientId} = useParams()
    const [client, updateClient] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/clients?_expand=user&_embed=serviceRequests&userId=${clientId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleClient = data[0]
                    updateClient(singleClient)
                })
        },
        [clientId]
    )

    return  <section className="client">
                    <header className="client__header">{client?.user?.fullName}</header>
                    <div>Email: {client?.user?.email}</div>
                    <div>Phone Number: {client.phoneNumber}</div>
                    <div>Address: {client.address}</div>
                    {client.serviceRequests ? <footer className="client__footer">Currently has {client?.serviceRequests?.length} requests.</footer>
                    : <footer className="client__footer">Currently has 0 requests.</footer>}
        </section>
}