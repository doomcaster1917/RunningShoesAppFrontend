import { useRawInitData } from '@telegram-apps/sdk-react'
import React, {useEffect} from 'react';

export default function TelegramInitFunc() {
    const rawInitData = useRawInitData();
    useEffect(() => {
        if (rawInitData) {
            localStorage.setItem('token', rawInitData);
        }
    }, [rawInitData]);
}