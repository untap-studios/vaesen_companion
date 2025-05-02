import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Extract the user ID from the route parameters

        // Fetch the user by ID and include related character sheets
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                characterSheets: true, // Include related character sheets
            },
        });

        // Handle case where user is not found
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return the user data
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}