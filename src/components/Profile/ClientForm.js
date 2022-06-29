import { useEffect, useState } from "react"

export const ClientForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updateProfile] = useState({
        address: "1234 random address 56789 city name, state",
        phoneNumber: "(123)456-7890",
        userId: 0
    })

    const localUser = localStorage.getItem("bmh_user")
    const bmhUserObject = JSON.parse(localUser)

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // TO DO: Get client profile info from API and update state
    useEffect(
        () => {
            fetch(`http://localhost:8088/clients?userId=${bmhUserObject.id}`)
                .then(response => response.json())
                .then((data) => {
                    const clientObject = data[0]
                    updateProfile(clientObject)
                })
        },
        [bmhUserObject.id]
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

        fetch(`http://localhost:8088/clients/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Profile successfully saved!")
            })
    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
        {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number: xxx-xxx-xxxx</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                }}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}