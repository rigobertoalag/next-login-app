import { useState } from 'react'
import { useRouter } from 'next/router'

const Dashboard = () => {
    const [user, setUser] = useState({
        email: "",
        username: ""
    })

    const router = useRouter()

    const getProfile = async () => {
        try {
            const response = await fetch('/api/profile')
                .then(response => response.json())
                .then(data => setUser(data))
        } catch (error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(data => console.log(data))

            router.push('/login')
        } catch (error) {
            console.log(error)
            router.push('/login')
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
            <button onClick={() => getProfile()}>
                Get profile
            </button>

            <button onClick={() => logout()}>
                Logout
            </button>
        </div>
    )
}

export default Dashboard