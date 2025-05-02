"use client"

import Link from 'next/link';
import React, { useEffect } from 'react'

export default function User({ params }: { params: { id: string } }) {
    const [user, setUser] = React.useState<any>(null);
    const [userId, setUserId] = React.useState<string | null>(null);

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setUserId(resolvedParams.id);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (!userId) return; // Ensure `userId` is available before making the request
        const fetchUser = async () => {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const userData = await response.json();
                console.log('User:', userData);
                setUser(userData);
            } else {
                console.error('Failed to fetch user');
            }
        };
        fetchUser();
    }, [userId]);

    console.log('%csrc/app/users/[id]/page.tsx:16 user', 'color: #007acc;', user);
    return (
        <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>

            <h2 className="text-xl font-bold">Character Sheets</h2>
            {user?.characterSheets.map((sheet: any) => (
                <Link href={`/character-sheets/${sheet.id}`} key={sheet.id}>
                    <div key={sheet.id} className="flex flex-col gap-2">
                        <img src={sheet.image} alt={sheet.name} className="w-16 h-16 rounded-full" />
                        <h3 className="text-lg font-bold">{sheet.name}</h3>
                        <p>{sheet.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
