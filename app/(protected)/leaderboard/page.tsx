import Footer from "@/components/root/Footer";
import "@/public/css/leaderboard.css";
import Image from "next/image";
import userImage from "@/public/images/user.png";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <React.Fragment>
      <main className="mt-2">
        <div className="container">
          <div className="block">
            <table>
              <tbody>
                <tr className="header">
                  <th>Top</th>
                  <th>User</th>
                  <th>Orders</th>
                  <th>Success</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td className="user">
                    <div className="profile-pic">
                      <Image src={userImage} alt="" className="w-full h-full" />
                    </div>{" "}
                    Mehidi Hsan
                  </td>
                  <td>10,000</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td className="user">
                    <div className="profile-pic">
                      <Image src={userImage} alt="" className="w-full h-full" />
                    </div>{" "}
                    Mehidi Hsan
                  </td>
                  <td>10,000</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td className="user">
                    <div className="profile-pic">
                      <Image src={userImage} alt="" className="w-full h-full" />
                    </div>{" "}
                    Mehidi Hsan
                  </td>
                  <td>10,000</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td className="user">
                    <div className="profile-pic">
                      <Image src={userImage} alt="" className="w-full h-full" />
                    </div>{" "}
                    Mehidi Hsan
                  </td>
                  <td>10,000</td>
                  <td>95%</td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td className="user">
                    <div className="profile-pic">
                      <Image src={userImage} alt="" className="w-full h-full" />
                    </div>{" "}
                    Mehidi Hsan
                  </td>
                  <td>10,000</td>
                  <td>95%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
