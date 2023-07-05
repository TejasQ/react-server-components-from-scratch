"use client";

import React, { useState } from "react";

export const ClientForm = () => {
  const [name, setName] = useState("");
  return (
    <div>
      <form action="/" method="get">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
        />
        <button>Send</button>
      </form>
      Server time: {Date.now()}
      <h1>Hello from the client, {name}!</h1>
    </div>
  );
};
