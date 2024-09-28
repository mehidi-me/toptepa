import Footer from "@/components/root/Footer";
import "@/app/css/profile.css";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <main className="mt-2">
        <div className="container">
          <h2 className="title">Profile Settings</h2>
          <div className="gap-1">
            <div className="block">
              <div className="profile-input">
                <label className="profile-pic" htmlFor="pic-up">
                  <img src="images/user.png" alt="" />
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
            <button className="alert">Logout</button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
