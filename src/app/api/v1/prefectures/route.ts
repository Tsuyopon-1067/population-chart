import { fetchHelper } from '@/app/lib/fetchHelper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest): Promise<NextResponse> => {
  try {
    const prefectures = await fetchHelper('/api/v1/prefectures');
    return NextResponse.json(prefectures);
  } catch (error) {
    console.error('Failed to fetch prefectures:', error);
    return NextResponse.json({ error: 'Failed to fetch prefectures' }, { status: 500 });
  }
};
