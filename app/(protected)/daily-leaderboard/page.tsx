"use client";
export const dynamic = "force-dynamic";
import Footer from "@/components/root/Footer";
import Image from "next/image";
import loadingImage from "@/public/images/loading.gif";
import React, { useEffect, useRef, useState } from "react";
import { calculateRating } from "@/lib/utils";
import Link from "next/link";

type Props = {};

export default function page({}: Props) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);
  const [users, setUsers] = useState<
    {
      id: number;
      name: string;
      profilePicture: string;
      dailyCorrectTapCount: number;
    }[]
  >([]);
  const [winners, setWinners] = useState<
    {
      id: number;
      name: string;
      profilePicture: string;
      totalTap: number;
      updatedAt:string
    }[]
  >([]);

  const fetchItems = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch("/auth/daily-leaderboard", {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setWinners(data.winners);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for fetching data on mount and when page changes
  useEffect(() => {
    fetchItems(page);
  }, []);

  const [imagesFetched, setImagesFetched] = useState(false); // Track if images are fetched

  useEffect(() => {
    const updateUserProfilePicture = async (user:any) => {
      const res = await fetch(`/auth/user-image?id=${user.id}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
  
      // Update the user in the state with the profile picture
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, profilePicture: data.user?.profilePicture } : u
        )
      );
    };

    // Only run this effect once, when the users are first loaded
    if (users.length > 0 && !imagesFetched) {
      users.forEach(user => {
        updateUserProfilePicture(user);
      });
      setImagesFetched(true); // Set the flag to true after images are fetched
    }
  }, [users, imagesFetched]); 
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }
  

  
  return (
    <React.Fragment>
      <main className="mt-2 leaderboard">
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
            }}
          >
            <Image src={loadingImage} alt="Loading" width={200} height={200} />
          </div>
        )}
        <div className="container">
        <div className="toggle-btn">
                <Link href={'/leaderboard'}><button>Main Leader Board</button></Link>
                <Link href={'/daily-leaderboard'} ><button className="active">Daily Leader Board</button></Link>
            </div>
          <h2 className="title">Daily Leader board</h2>
          <div className="block" style={{overflowY: 'auto',
maxHeight: '80vh'}}>
            <table>
              <tbody>
                <tr className="header">
                  <th>Top</th>
                  <th>User</th>
                  {/* <th>Orders</th>
                  <th>Success</th> */}
                  <th>Correct Tap Count</th>
                </tr>
                {users &&
                  users?.map((user, index) => (
                    <tr>
                      <td>{index + 1}.</td>
                      <td className="user">
                        <div className="profile-pic">
                          <img
                            src={user.profilePicture || "images/avatar.png"}
                            alt=""
                            className="w-full h-full"
                          />
                        </div>{" "}
                        {user.name}
                      </td>
                      {/* <td>{Intl.NumberFormat().format(user.totalScore)}</td>
                      <td>{calculateRating(user.tapCount)}%</td> */}
                      <td>{user.dailyCorrectTapCount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>


          <h2 className="title">
        Daily Winner
      </h2>
<div className="contributor grid-2">

     {winners?.map(winner => (
       <div className="block">
       <div className="dprofile">
         <div className="user-profile">
           <img src={winner.profilePicture || "images/avatar.png"} alt="" />
         </div>
         <p>{formatDate(winner.updatedAt)}</p>
       </div>
       <div className="body">
         <h2>{winner.name}</h2>
         <p>{winner.totalTap}</p>
       </div>
     </div>
     ))}
</div>

         
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
