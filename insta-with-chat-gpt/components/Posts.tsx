import Post from "./Post";

const posts = [
  {
    id: "123",
    username: "johndoe",
    userImg:
      "https://i.pinimg.com/236x/d9/97/4c/d9974c818ebf4e514deceb4ce67fdfb0.jpg",
    img: "https://i.pinimg.com/564x/29/c9/ff/29c9ff4aa997eec17277bae61c21efee.jpg",
    caption: "This is a caption",
  },
  {
    id: "13",
    username: "johndoe",
    userImg:
      "https://i.pinimg.com/236x/d9/97/4c/d9974c818ebf4e514deceb4ce67fdfb0.jpg",
    img: "https://i.pinimg.com/564x/29/c9/ff/29c9ff4aa997eec17277bae61c21efee.jpg",
    caption: "This is a caption",
  },
  {
    id: "23",
    username: "johndoe",
    userImg:
      "https://i.pinimg.com/236x/d9/97/4c/d9974c818ebf4e514deceb4ce67fdfb0.jpg",
    img: "https://i.pinimg.com/564x/29/c9/ff/29c9ff4aa997eec17277bae61c21efee.jpg",
    caption: "This is a caption",
  },
];

function Posts() {
  return (
    <div>
      {/** Post */}
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Posts;
