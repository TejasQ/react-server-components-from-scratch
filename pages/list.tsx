import React from "react";
import { REMOTE_URL } from "../util";

const List = async () => {
  const breeds = await fetch(`${REMOTE_URL}/api/breeds/list/all`)
    .then((r) => r.json())
    .then((data) => Object.keys(data.message));

  return (
    <div>
      <h1>Welcome to my dog site!</h1>
      <p>
        Here are some of my favorite good bois. They are so good, the goodest. I
        love them. Please click on one to go to its page.
      </p>
      <ul>
        {breeds.map((breed) => (
          <li key={breed}>
            <a href={`/detail?breed=${breed}`}>{breed}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
