import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id: gameId } = params; // Extract the game ID from the route parameters
        const { userId } = await req.json(); // Extract the user ID from the request body

        // Validate input
        if (!gameId || !userId) {
            return NextResponse.json({ error: "Game ID and User ID are required" }, { status: 400 });
        }

        // Check if the game exists
        const game = await prisma.game.findUnique({
            where: { id: gameId },
        });
        if (!game) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Add the user to the game
        const userOnGame = await prisma.usersOnGames.create({
            data: {
                gameId,
                userId,
                assignedBy: userId, // Assuming the user is assigning themselves
            },
        });

        return NextResponse.json(userOnGame, { status: 201 });
    } catch (error) {
        console.error("Error adding user to game:", error);
        return NextResponse.json({ error: "Failed to add user to game" }, { status: 500 });
    }
}