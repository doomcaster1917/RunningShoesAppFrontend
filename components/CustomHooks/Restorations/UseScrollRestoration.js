'use client';
import {useEffect, useLayoutEffect} from 'react';
import { usePathname } from 'next/navigation';

export function UseScrollRestoration({products}) {
    const pathname = usePathname();
    useLayoutEffect(() => {
        const savedScroll = sessionStorage.getItem(`${pathname}`);
        if (savedScroll) {
            const y = savedScroll;
            const timeout = setTimeout(() => window.scrollTo(0, y), 100);
            return () => clearTimeout(timeout);
        }
    }, [pathname, products]);

    // Сохранение скролла при прокрутке (с debounce)
    useEffect(() => {
        let timeout = null; // ← Просто let timeout = null;

        const handleScroll = () => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                sessionStorage.setItem(`${pathname}`, `${window.scrollY}`);
                timeout = null;
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeout) clearTimeout(timeout);
        };
    }, [pathname]);
}

