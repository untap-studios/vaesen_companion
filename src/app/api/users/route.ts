import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url); // Extract query parameters
        const name = searchParams.get('name');

        if (!name) {
            return NextResponse.json({ error: 'Missing query parameters' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                name
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { name, email } = await req.json();

        const user = await prisma.user.create({
            data: {
                name,
                email,
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}