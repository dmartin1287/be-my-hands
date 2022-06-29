import { useEffect, useState } from "react"
import { Interpreter } from "./Interpreter"
import "./Interpreters.css"

export const InterpreterList = () => {
    const [interpreters, setInterpreters] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((interpreterArray) => {
                    setInterpreters(interpreterArray)
                })
        },
        []
    )

    return <article className="interpreters">
        {
            interpreters.map(interpreter => <Interpreter key={`interpreter--${interpreter.id}`}  
                id={interpreter.id} 
                fullName={interpreter.fullName} 
                email={interpreter.email} 
                />)
        }
    </article>
}