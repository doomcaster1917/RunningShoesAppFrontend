import "/GlobalStyles/global.css";
import { ScrollRestoration } from 'next-scroll-restoration';

export const metadata = {
    title: "Running Shoes Mini App",
    description: "Telegram Mini App для магазина обуви",
};

export default function RootLayout({ children }) {
    return (
        <html>
        <head>
            <title>Shoes app</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <ScrollRestoration/>
        </head>
        <body>{children}</body>
        </html>
    );
}