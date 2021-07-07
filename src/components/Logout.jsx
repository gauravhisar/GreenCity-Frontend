import React, {useEffect, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../axios'
import { UserContext } from '../Context'

const baseURL = 'http://localhost:8000/'
export default function Logout() {
    const history = useHistory()
    const {setUser} = useContext(UserContext)

    useEffect(()=>{
        axios.post(baseURL+ 'api/logout/', {
            refresh_token: localStorage.getItem('refresh_token')
        }).then((response)=>{
            console.log("Successfully Logged Out",response)
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            axios.defaults.headers['Authorization'] = null
            setUser(null)
            // history.push('/')
            history.goBack()
        })
        .catch((err)=>{
            console.log(err.response)
            alert(err)
        })

    })
    return (
        <>Logout</>
    )
}
