import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type UserProfileRequestBody = {
  bio?: string;
  profilePicture?: string;
};

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = parseInt(params.userId, 10);
    if (isNaN(userId)) {
      return NextResponse.json({ success: false, message: 'Invalid user ID' }, { status: 400 });
    }

    const body: UserProfileRequestBody = await request.json();
    const { bio, profilePicture } = body;

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const updatedProfile = await prisma.userProfile.update({
      where: { userId: userId },
      data: {
        bio: bio || undefined,
        profilePicture: profilePicture || undefined,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}