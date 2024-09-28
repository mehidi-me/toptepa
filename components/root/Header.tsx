import Image from "next/image";
import userImage from "@/public/images/user.png";

export default function Header({}) {
  return (
    <header>
      <div className="container">
        <div className="greetings">
          <p>
            Hi <span>Mehidi</span>,
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
