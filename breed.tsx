import React from "react";

const Breed = async ({ b }) => {
  const url = await fetch(`http://localhost:3001/api/breed/${b}/images/random`)
    .then((response) => response.json())
    .then((data) => data.message);

  return (
    <div>
      <a href="/list?ha">go back</a>
      <h1>My favorite breed: {b}</h1>
      <img alt={b} src={url} />
      <form>
        <textarea>What I love about this breed is </textarea>
        <button>Save</button>
      </form>
    </div>
  );
};

export default Breed;
