import { fetchHelper } from '@/app/lib/fetchHelper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const query = request.nextUrl.searchParams.get('prefCode');
  return await fetchHelper(`/api/v1/population/composition/perYear?prefCode=${query}`)
    .then((response) => {
      return NextResponse.json(response);
    })
    .catch((error) => {
      console.error('Failed to fetch composition:', error);
      return NextResponse.json({ error: 'Failed to fetch composition' }, { status: 500 });
    });
};
