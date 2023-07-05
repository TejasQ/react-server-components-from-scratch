import React from "react";
import { ClientForm } from "./ClientForm";

const List: any = async ({ name }) => {
  const breeds = await fetch("http://localhost:3001/api/breeds/list/all")
    .then((res) => res.json())
    .then((data) => data.message)
    .then((breeds) => Object.keys(breeds));
  return (
    <div>
      <ClientForm />
      <form action="/" method="get">
        <input type="text" name="name" />
        <button>Send</button>
      </form>
      <h1>Hello from the server, {name}!</h1>
      <ul>
        {breeds.map((breed) => (
          <li key={breed}>
            <a href={"/breed?b=" + breed}>{breed}</a>
          </li>
        )) ?? null}
      </ul>
    </div>
  );
};

export default List;
