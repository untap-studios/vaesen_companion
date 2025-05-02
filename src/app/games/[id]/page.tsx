"use client";
import React, { useEffect, useState } from "react";

export default function Game({ params }: { params: Promise<{ id: string }> }) {
    const [game, setGame] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [gameId, setGameId] = useState<string | null>(null);

    // Unwrap the `params` Promise
    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setGameId(resolvedParams.id);
        };
        unwrapParams();
    }, [params]);

    const getGame = async () => {
        if (!gameId) return; // Ensure `gameId` is available before making the request
        try {
            const response = await fetch(`/api/games/${gameId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const gameData = await response.json();
                console.log("Game:", gameData);
                setGame(gameData);
            } else {
                console.error("Failed to fetch game");
            }
        } catch (error) {
            console.error("Error fetching game:", error);
        }
    };

    useEffect(() => {
        if (gameId) {
            getGame();
        }
    }, [gameId]);

    const getUsers = async () => {
        try {
            const response = await fetch("/api/users?name=Cameron Gunter", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const usersData = await response.json();
                console.log("Users:", usersData);
                setUser(usersData);
            } else {
                console.error("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    return (
        <div>
            <img
                src={game?.image}
                alt={game?.title}
                className="w-16 h-16 rounded-full"
            />
            <h1 className="text-2xl font-bold">{game?.title}</h1>
            <h1>{game?.description}</h1>

            <h1 className="text-2xl font-bold">Users</h1>
            <div>
                {game?.users?.map((user: any) => (
                    <div key={user.id} className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{user.user.name}</h1>
                        <p>{user.user.email}</p>
                    </div>
                ))}
            </div>

            <button onClick={() => setToggleSearch(!toggleSearch)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Search Users
            </button>
            {toggleSearch && (
                <div>
                    <h1 className="text-2xl font-bold">Search Users</h1>
                    <form className="flex flex-col gap-2">
                        <input type="text" name="name" placeholder="Name" className="border p-2" />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                getUsers();
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Search
                        </button>
                    </form>
                </div>
            )}

            {user && (
                <div>
                    <div key={user.id} className="flex flex-col gap-2">
                        <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                    <button
                        onClick={async () => {
                            try {
                                const response = await fetch(`/api/games/${gameId}/users`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ userId: user.id }),
                                });
                                if (response.ok) {
                                    console.log("User added to game");
                                } else {
                                    console.error("Failed to add user to game");
                                }
                            } catch (error) {
                                console.error("Error adding user to game:", error);
                            }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add User to Game
                    </button>
                </div>
            )}
        </div>
    );
}
