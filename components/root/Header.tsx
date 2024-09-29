import Image from "next/image";
import userImage from "@/public/images/user.png";
import useTapStore from "@/store";

export default function Header({}) {
  const { user } = useTapStore((state) => state);
  return (
    <header>
      <div className="container">
        <div className="greetings">
          <p>
            Hi <span>{user.name}</span>,
          </p>
          <h1>Welcome back</h1>
        </div>
        <div className="profile-pic">
          <Image src={userImage} alt="" className="w-full h-full" />
        </div>
      </div>
    </header>
  );
}
