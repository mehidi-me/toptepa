"use client";

import Footer from "@/components/root/Footer";
import "@/public/css/profile.css";
import Image from "next/image";
import userImage from "@/public/images/user.png";
import { useRouter } from "next/navigation";

type Props = {};

export default function page({}: Props) {
  const route = useRouter();

  const logOutHandler = async () => {
    await fetch("/auth/logout", {
      method: "POST",
    });
    route.push("/login");
  };
  return (
    <>
      <main className="mt-2">
        <div className="container">
          <h2 className="title">Profile Settings</h2>
          <div className="gap-1">
            <div className="block">
              <div className="profile-input">
                <label className="profile-pic" htmlFor="pic-up">
                  <Image src={userImage} alt="" className="w-full h-full" />
                  <i className="uil uil-camera-plus" />
                </label>
                <input type="file" id="pic-up" />
              </div>
              <div className="user-name">
                <input type="text" disabled defaultValue="Mehidi Hasan" />
                <i className="uil uil-edit" />
              </div>
            </div>
          </div>
          <div className="block">
            <div className="flex">
              <p>Primary theme color</p>
              <div className="color-picker">
                <label htmlFor="color" style={{}} />
                <input type="color" id="color" />
              </div>
            </div>
          </div>
          <div className="action">
            <button>Save Changes</button>
            <button onClick={logOutHandler} className="alert">
              Logout
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
