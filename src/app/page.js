'use client'
import Banner from './Banner'
import Card from './Card'
import Overlay from './Overlay';
import Sidebar from './Sidebar';
import Home from './home/page';
import axios from 'axios';
import { useEffect,useState } from 'react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Home></Home>
      </body>
    </html>
  );
}




