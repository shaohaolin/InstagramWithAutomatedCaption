import Post from "./Post";

const posts = [
  {
    id: "123",
    username: "johndoe",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "This is a caption",
  },
  {
    id: "13",
    username: "johndoe",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "This is a caption",
  },
  {
    id: "23",
    username: "johndoe",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
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
