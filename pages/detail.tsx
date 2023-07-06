import React, { useEffect, useState } from "react";
import { REMOTE_URL } from "../util";

const Detail = ({ breed }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`${REMOTE_URL}/api/breed/${breed}/images/random`)
      .then((r) => r.json())
      .then((data) => setImageUrl(data.message));
  }, []);

  return (
    <div>
      <h1>{breed}</h1>
      <p>This one is an especially good boi. Look how adorable it is!</p>
      <img alt={breed} src={imageUrl} />
    </div>
  );
};

export default Detail;
