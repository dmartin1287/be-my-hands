import { Link } from "react-router-dom"

export const Interpreter = ({id, fullName, email}) => {
    return <section className="interpreter">
                    <div>
                        <Link to={`/interpreters/${id}`}>Name: {fullName}</Link>
                    </div>
                    <div>Email: {email}</div>
                </section>
}