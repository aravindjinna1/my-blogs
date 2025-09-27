// app/layout.js

import './globals.css'
import Navbar from './components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Blog</title>
      </head>
      <body className='bg-black m-0 p-0'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
