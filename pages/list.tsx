import React, { useEffect } from "react";
import { REMOTE_URL } from "../util";

const List = () => {
  const [breeds, setBreeds] = React.useState([]);
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    fetch(`${REMOTE_URL}/api/breeds/list/all`)
      .then((r) => r.json())
      .then((data) => Object.keys(data.message))
      .then(async (breeds) => {
        console.log(breeds);
        return [
          breeds,
          await Promise.all(
            breeds.map((b) =>
              fetch(`${REMOTE_URL}/api/breed/${b}/images/random`)
                .then((r) => r.json())
                .then((data) => data.message)
            )
          ),
        ];
      })
      .then(([breeds, images]) => {
        setBreeds(breeds);
        setImages(images);
      });
  }, []);

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
      <div className="grid">
        {images.map((i) => (
          <img key={i} alt={i} src={i} />
        ))}
      </div>
    </div>
  );
};

export default List;
