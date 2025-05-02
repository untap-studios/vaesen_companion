import { prisma } from '@/lib/prisma'
import Link from 'next/link';
import React from 'react'

export default async function page() {
    const users = await prisma.user.findMany({
        include: {
            characterSheets: true, // Include the related character sheets
        }
    });

    console.log('%csrc/app/Users/page.tsx:8 users', 'color: #007acc;', users);
    return (
        <div>
            {users.map((user) => (
                <Link href={`/users/${user.id}`} key={user.id}>
                    <div key={user.id} className="flex flex-col gap-2">
                        {user.image && user.name && <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />}
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                </Link>
            ))}

            <Link href="/users/create">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create User
                </button>
            </Link>
        </div>
    )
}
