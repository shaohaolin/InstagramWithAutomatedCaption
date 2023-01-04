import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {
  const [suggestions, setSuggestions] = useState<any>([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthday: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      id: i,
    }));

    console.log(suggestions);
    setSuggestions(suggestions);
  }, []);

  return (
    <div>
      {suggestions.map((profile: any) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
