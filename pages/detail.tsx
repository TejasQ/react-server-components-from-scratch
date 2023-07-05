import React from "react";
import { REMOTE_URL } from "../util";

const Detail = async ({ breed }) => {
  const imageUrl = await fetch(`${REMOTE_URL}/api/breed/${breed}/images/random`)
    .then((r) => r.json())
    .then((data) => data.message);

  return (
    <div>
      <h1>{breed}</h1>
      <p>This one is an especially good boi. Look how adorable it is!</p>
      <img alt={breed} src={imageUrl} />
    </div>
  );
};

export default Detail;
