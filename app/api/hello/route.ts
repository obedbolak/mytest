import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name') || 'Guest';
  
  return NextResponse.json({
    message: `Hello, ${name}! This came from the API route.`,
    method: 'GET',
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { a, b } = body;

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NextResponse.json(
        { error: 'Both a and b must be numbers' },
        { status: 400 }
      );
    }

    const result = a + b;

    return NextResponse.json({
      success: true,
      operation: `${a} + ${b}`,
      result: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
