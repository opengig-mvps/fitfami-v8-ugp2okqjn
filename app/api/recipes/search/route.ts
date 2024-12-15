import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ success: false, message: 'Query parameter is required' }, { status: 400 });
    }

    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { ingredients: { contains: query, mode: 'insensitive' } },
          { instructions: { contains: query, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        title: true,
        ingredients: true,
        instructions: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data: recipes,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}