import { useState } from "react"
import { RequestList } from "./RequestList"
import { RequestSearch } from "./RequestSearch"

export const RequestContainer = () => {
    //this is the parent component that will maintain state of requestList and requestSearch
    //two sibling components cannot talk directly to each other

    const [searchTerms, setSearchTerms] = useState("")

    //props - passing a value to a child component (like an argument)
    //this component manages search bar state, so you send setSearchTerms to the search component
    //send searchTerms variable to requestList so these two are now communicating
    //what comes before = is the name of key, use setterFunction or searchTermState in other components
    return <>
        <RequestSearch setterFunction = {setSearchTerms}/>
        <RequestList searchTermState = {searchTerms}/>
    </>
}