import { useState } from "react"

export const useForm = (callback, initialState = {}) => {

    const [values, setValues] = useState(initialState)


    const onChange = (event) => {
        //So, with this function we setValues, everytime it's summoned we spread the other values to leave them as they are,
        //and we set the Current mf that called the function ot the value we receive from the event.
        setValues({...values, [event.target.name]: event.target.value})
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return{
        onChange,
        onSubmit,
        values
    }
}