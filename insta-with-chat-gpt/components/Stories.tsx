import { faker } from "@faker-js/faker";
import { useEffect } from "react";

function Stories() {
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    console.log(suggestions);
  }, []);

  return (
    <div>
      <h1>Stories</h1>
    </div>
  );
}

export default Stories;
