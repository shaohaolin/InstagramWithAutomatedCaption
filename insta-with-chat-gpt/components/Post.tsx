import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";

type PostProps = {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
};
function Post({ id, username, userImg, img, caption }: PostProps) {
  const { data: session } = useSession();
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/** Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      {/* img */}
      <img src={img} alt="" className="object-cover w-full" />

      {/* btns */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            <HeartIcon className="btn" />
            <ChatBubbleOvalLeftIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>

          <BookmarkIcon className="btn" />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {/* comments */}

      {/* input box */}
      {session && (
        <form className="flex items-center p-4" action="">
          <FaceSmileIcon className="h-7" />
          <input
            className="flex-1 border-none focus:ring-0 outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button className="font-semibold text-blue-400">Post</button>
        </form>
      )}
    </div>
  );
}

export default Post;
