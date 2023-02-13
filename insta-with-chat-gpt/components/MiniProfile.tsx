import { signIn, signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="rounded-full border p-[2px] w-16 h-16"
        src="https://i.pinimg.com/236x/d9/97/4c/d9974c818ebf4e514deceb4ce67fdfb0.jpg"
        alt=""
      />

      <div className="flex-1 mx-4">
        {/*@ts-ignore */}
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-400">I am a goofy ball.</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}

export default MiniProfile;
