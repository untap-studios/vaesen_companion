import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Extract the dynamic route parameter

        if (!id) {
            return NextResponse.json({ error: "Missing game ID" }, { status: 400 });
        }

        const game = await prisma.game.findUnique({
            where: {
                id: id,
            },
            include: {
                users: {
                    include: {
                        user: true, // Include the related user
                    },
                },
            },
        });

        if (!game) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 });
        }

        return NextResponse.json(game, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch game" }, { status: 500 });
    }
}
