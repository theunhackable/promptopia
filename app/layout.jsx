import React, { Children } from 'react';
import '@styles/globals.css';
import Nav from '@app/components/Nav';
import Provider from './components/Provider';

export const metadata =  {
    title: "Promptopia",
    description: "Discover & share AI  Prompts"
}
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <head>
      <link rel="shortcut icon" href="./logo.ico" sizes="32x32"/>

      </head>
        <body>
          <Provider>
            <div className="main">
                <div className="gradient">
                </div>
            </div>
            <main className="app">
              <Nav  />
              {children}
            </main>
          </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
