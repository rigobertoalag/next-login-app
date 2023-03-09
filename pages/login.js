import { useRouter } from 'next/router'
import { useState } from 'react'
const LoginPage = () => {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const router = useRouter()

    const handleChange = (e) => {
        setCredentials({
            ...credentials, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        console.log('data to send', credentials)

        e.preventDefault()
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();

        if (!data.error) {
            router.push('/dashboard')
        }

        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email"
                    onChange={handleChange} />
                <input type="password" name="password" placeholder="Password"
                    onChange={handleChange} />
                <button>Send</button>
            </form>
        </div>
    )
}

export default LoginPage