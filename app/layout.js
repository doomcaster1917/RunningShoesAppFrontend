import "/GlobalStyles/global.css";

export const metadata = {
    title: "Running Shoes Mini App",
    description: "Telegram Mini App для магазина обуви",
};

export default function RootLayout({ children }) {
    return (
        <html>
        <head>
            <title>Shoes app</title>
            {/*<script src="https://telegram.org/js/telegram-web-app.js" async></script>*/}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>{children}</body>
        </html>
    );
}