"use client";
import React from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import toast from 'react-hot-toast';

const Captcha = () => {
    const [token, setToken] = React.useState<string | null>(null)
    const handleCaptcha = async () => {
        const res = await fetch("/api/captcha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });
        if (res) {
            const data = await res.json();
            if (data.status === 200) {
                toast.success(data.msg)
                window.location.href = "/"
            } else {
                toast.error(data.msg)
            }
        }
    }
    return (
        <div className="text-center flex 2xl:max-w-5xl mx-auto flex-col gap-10 h-screen items-center justify-center p-5">
            <h1 className="font-bold text-4xl">Captcha</h1>
            <Turnstile onSuccess={(token) => {
                setToken(token)
            }} siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!} />
            <button onClick={handleCaptcha} className="hover:text-white hover:bg-gray-600 border-2 border-gray-600 px-5 py-2">Send Request</button>
        </div>
    )
}

export default Captcha
