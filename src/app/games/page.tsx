import { prisma } from '@/lib/prisma'
import Link from 'next/link';
import React from 'react'

export default async function Games() {
    const games = await prisma.game.findMany({
        include: {
            users: true, // Include the related users
        },
    });
    console.log('%csrc/app/games/page.tsx:7 games', 'color: #007acc;', games);
    return (
        <div>
            {games.map((game) => (
                <div key={game.id} className="flex flex-col gap-2">
                    <Link href={`/games/${game.id}`}>
                        {game.image && <img src={game.image} alt={game.title} className="w-16 h-16 rounded-full" />}
                        <h1 className="text-2xl font-bold">{game.title}</h1>
                        <p>{game.description}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
