import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the type for the request body
type RecipeRequestBody = {
  title?: string;
  ingredients?: string;
  instructions?: string;
  photoUrl?: string;
};

// Define the PUT method handler for recipe update
export async function PUT(
  request: Request,
  { params }: { params: { recipeId: string } }
) {
  try {
    // Validate and parse the recipeId parameter
    const recipeId = parseInt(params.recipeId, 10);
    if (isNaN(recipeId)) {
      return NextResponse.json({ success: false, message: 'Invalid recipe ID' }, { status: 400 });
    }

    // Parse the request body
    const body: RecipeRequestBody = await request.json();

    // Update the recipe
    const updatedRecipe = await prisma.recipe.update({
      where: { id: recipeId },
      data: {
        title: body.title,
        ingredients: body.ingredients,
        instructions: body.instructions,
        photoUrl: body.photoUrl,
        updatedAt: new Date(),
      },
    });

    // Send a success response with the updated recipe data
    return NextResponse.json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}