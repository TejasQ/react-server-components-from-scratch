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
          <div>
            <input placeholder="Your name is..." type="text" />
            <span>
              <strong>Server time:</strong>{" "}
              {Intl.DateTimeFormat("de-DE", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }).format(Date.now())}
            </span>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
