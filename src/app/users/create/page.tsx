"use client"
import { prisma } from '@/lib/prisma'
import React, { useState } from 'react'

export default function CreateUser() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);

    const createUser = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log('User created:', user);
                setMessage('User created successfully!');
            } else {
                setMessage('Failed to create user.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred.');
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Create User</h1>
            <form onSubmit={createUser} className="flex flex-col gap-2">
                <input onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" className="border p-2" />
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" className="border p-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create User
                </button>
            </form>
            {message && <p>{message}</p>}

        </div>
    )
}
