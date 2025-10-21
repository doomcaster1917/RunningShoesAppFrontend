import { NextResponse } from 'next/server';

export function middleware(request) {
    const initData = request.nextUrl.searchParams.get('initData'); // Проверяем initData
    const url = request.nextUrl.href;
    const queryParams = Object.fromEntries(request.nextUrl.searchParams);
    const userAgent = request.headers.get('user-agent');

    // Логи для отладки (видны в терминале)
    console.log('Request URL:', url);
    console.log('Query Parameters:', queryParams);
    console.log('User-Agent:', userAgent);

    if (!initData) {
        console.log('Access denied: No initData provided');
    }

    return NextResponse.next();
}