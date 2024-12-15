import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        ingredients: true,
        instructions: true,
        photoUrl: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                profilePicture: true,
              },
            },
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        likes: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data: recipes,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: error,
    }, { status: 500 });
  }
}