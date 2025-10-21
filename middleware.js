import { NextResponse } from 'next/server';

export function middleware(request) {
    const initData = request.nextUrl.searchParams.get('tgWebAppData');

    if (!initData) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    return NextResponse.next();
}
