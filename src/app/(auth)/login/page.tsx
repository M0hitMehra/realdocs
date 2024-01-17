import { useRouter } from 'next/router'
import React, { useState } from 'react'
'use client'
const LoginPage = () => {
    const router = useRouter()
    const [setsubmitError, setSetsubmitError] = useState('')
    return (
        <div>LoginPage</div>
    )
}

export default LoginPage