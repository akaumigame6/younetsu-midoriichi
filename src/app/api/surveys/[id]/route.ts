import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { inputType, content, q1, q2, q3, referralSource } = body;

    const survey = await prisma.surveyRecord.update({
      where: { id },
      data: {
        inputType,
        content: content || '',
        q1,
        q2,
        q3,
        referralSource,
      }
    });

    return NextResponse.json(survey);
  } catch (error) {
    console.error('Failed to update survey:', error);
    return NextResponse.json({ error: 'Failed to update survey' }, { status: 500 });
  }
}
