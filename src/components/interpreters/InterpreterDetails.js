import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const InterpreterDetails = () => {
    //only displays when route = interpreter/:interpreterId (some number)
    const {interpreterId} = useParams()
    const [interpreter, updateInterpreter] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/interpreters?_expand=user&_embed=interpreterRequests&userId=${interpreterId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleInterpreter = data[0]
                    updateInterpreter(singleInterpreter)
                })
        },
        [interpreterId]
    )

    return  <section className="interpreter">
                    <header className="interpreter__header">{interpreter?.user?.fullName}</header>
                    <div>Email: {interpreter?.user?.email}</div>
                    <div>Specialty: {interpreter.specialty}</div>
                    <div>Rate: {interpreter.rate}</div>
                    {interpreter.interpreterRequests ? <footer className="interpreter__footer">Currently working on {interpreter?.interpreterRequests?.length} requests.</footer>
                    : <footer className="interpreter__footer">Currently working on 0 requests.</footer>}
        </section>
}