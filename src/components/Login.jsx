import React from 'react'
import axios from 'axios'
import { TextField } from '@material-ui/core'
import { UserContext } from '../Context'

export default function Login() {
    const [user,setUser] = useContext(UserContext)
    csont [password, setPassword] = useState("")
    return (
        <>
            <TextField label = "Username" value = {user.username} onChange = {(e)=>setUser({...user, username: e.target.value})} />
            <TextField label = "Password" value = {password} onChange = {(e)=>setPassword(e.target.value)} />
        </>
    )
}
