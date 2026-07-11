import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { supabase } from '../../../../../lib/supabase';
import { cookies } from 'next/headers';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sb-access-token')?.value;
  if (!token) return false;
  const { data: { user }, error } = await supabase!.auth.getUser(token);
  return !!user && !error;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, iconUrl, shareToken } = body;

    const creator = await prisma.creator.update({
      where: { id },
      data: { name, description, iconUrl, shareToken }
    });

    return NextResponse.json(creator);
  } catch (error) {
    console.error('Failed to update creator:', error);
    return NextResponse.json({ error: 'Failed to update creator' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { id } = await params;
    
    await prisma.creator.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete creator:', error);
    return NextResponse.json({ error: 'Failed to delete creator' }, { status: 500 });
  }
}
