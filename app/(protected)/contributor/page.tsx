'use client'
import Footer from '@/components/root/Footer'
import React from 'react'

function page() {
  return (
 <>
    <main className="mt-2 contributor">
    <div className="container">
      <h2 className="title">
        Credits
      </h2>
      <div className="block">
        <div className="dprofile">
          <div className="user-profile">
            <img src="images/zahidul.png" alt="" />
          </div>
          <p>Chadpur, Bangladesh</p>
        </div>
        <div className="body">
          <h2>MD Zahidul Islam</h2>
          <p>Mastermind, Fun Guru, Community Menager @Fiverr</p>
        </div>
      </div>
      <div className="block">
        <div className="dprofile">
          <div className="user-profile">
            <img src="images/user.png" alt="" />
          </div>
          <p>Savar, Bangladesh</p>
        </div>
        <div className="body">
          <h2>Mehidi Hasan</h2>
          <p>Designer, Developer, CEO</p>
        </div>
      </div>
      <div className="block">
        <div className="dprofile">
          <div className="user-profile">
            <img src="images/mohuda.png" alt="" />
          </div>
          <p>Savar, Bangladesh</p>
        </div>
        <div className="body">
          <h2>Mohua</h2>
          <p>Logo Design</p>
        </div>
      </div>
      <div className="block">
        <div className="dprofile">
          <div className="user-profile">
            <img src="images/foyzul.jpg" alt="" />
          </div>
          <p>Khulna, Bangladesh</p>
        </div>
        <div className="body">
          <h2>Foyzul Islam</h2>
          <p>Logo Design</p>
        </div>
      </div>
      <div className="block">
        <div className="dprofile">
          <div className="user-profile">
            <img src="images/hridoy.jpg" alt="" />
          </div>
          <p>Dhaka, Bangladesh</p>
        </div>
        <div className="body">
          <h2>Mohammad Hridoy</h2>
          <p>Animations</p>
        </div>
      </div>
    </div>
  </main>
  <Footer />
 </>
  )
}

export default page