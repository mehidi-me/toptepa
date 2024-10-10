"use client";
export const dynamic = "force-dynamic";
import Footer from "@/components/root/Footer";
import Image from "next/image";
import loadingImage from "@/public/images/loading.gif";
import React, { useEffect, useRef, useState } from "react";
import { calculateRating } from "@/lib/utils";

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
      totalScore: number;
      tapCount: {
        correctTap: number;
        missedTap: number;
        wrongTap: number;
      };
    }[]
  >([]);

  const fetchItems = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch("/auth/leaderboard", {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
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
    const updateUserProfilePicture = async (user) => {
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
          <h2 className="title">Leader board</h2>
          <div className="block">
            <table>
              <tbody>
                <tr className="header">
                  <th>Top</th>
                  <th>User</th>
                  <th>Orders</th>
                  <th>Success</th>
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
                      <td>{Intl.NumberFormat().format(user.totalScore)}</td>
                      <td>{calculateRating(user.tapCount)}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
