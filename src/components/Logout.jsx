import React, {useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import { UserContext } from '../Context'

export default function Logout({baseURL}) {
    const endpoint = baseURL + 'api/logout/';
    const history = useHistory()
    const {setUser} = useContext(UserContext)
    
    useEffect(()=>{
        axios.post(endpoint, {
            refresh_token: localStorage.getItem('refresh_token')
        }).then(async (response)=>{
            console.log("Successfully Logged Out",response)
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            axios.defaults.headers['Authorization'] = null
            await setUser(null)
            // history.push('/')
            history.push('/')
        })
        .catch((err)=>{
            console.log(err.response)
            alert(err)
        })

    }, [history, setUser, endpoint])
    return (
        <>Logout</>
    )
}
