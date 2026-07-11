import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    // 必要なフィールドだけを抽出して更新する（undefinedのものは更新されない）
    const updateData: any = {};
    if (body.reaction !== undefined) updateData.reaction = body.reaction;
    if (body.isRead !== undefined) updateData.isRead = body.isRead;

    const feedback = await prisma.feedbackRecord.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Failed to update feedback:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // 送られてきたフィールドのみを更新する
    const updateData: any = {};
    if (body.inputType !== undefined) updateData.inputType = body.inputType;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.q1 !== undefined) updateData.q1 = body.q1;
    if (body.q2 !== undefined) updateData.q2 = body.q2;
    if (body.q3 !== undefined) updateData.q3 = body.q3;
    if (body.isRead !== undefined) updateData.isRead = body.isRead;
    if (body.reaction !== undefined) updateData.reaction = body.reaction;

    const feedback = await prisma.feedbackRecord.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Failed to update feedback:', error);
    return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
  }
}
