import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params; // Extract the user ID from the route parameters

        // Fetch the sheet by ID and include related character sheets
        const sheet = await prisma.characterSheet.findUnique({
            where: { id }
        });

        // Handle case where user is not found
        if (!sheet) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Return the user data
        return NextResponse.json(sheet, { status: 200 });
    } catch (error) {
        console.error("Error fetching sheet:", error);
        return NextResponse.json({ error: "Failed to fetch sheet" }, { status: 500 });
    }
}