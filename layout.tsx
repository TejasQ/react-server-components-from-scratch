import React from "react";

const Layout = ({ children, bgColor }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Teju RSC</title>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body
        style={{
          backgroundColor: bgColor,
          color: bgColor === "black" ? "white" : "black",
          transition: "all .3s ease",
        }}
      >
        <header>
          <span className="logo" key="span">
            🐶
          </span>
          <a href="/list?test">RSC Thingy</a>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
