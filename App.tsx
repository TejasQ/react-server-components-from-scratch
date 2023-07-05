import React, { Suspense } from "react";

const App: any = ({ bg, children }) => {
  return (
    <html>
      <head>
        <title>React SSR</title>
      </head>
      <body style={{ background: bg, transition: "all 3s ease" }}>
        <div key="sup">Server time: {Date.now()}</div>
        {children}
      </body>
    </html>
  );
};

export default App;
