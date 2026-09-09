import './globals.css'

export const metadata = {
  title: "Sifat's next js app",
  description: 'My next js app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>{children}</body>
    </html>
  );
}
