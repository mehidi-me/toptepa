import Footer from "@/components/root/Footer";
import "@/public/css/notification.css";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <main className="mt-2">
        <div className="container">
          <h2 className="title">Notifications</h2>
          <div className="block">
            <div className="header">
              <div className="flex">
                <p>About IFD 2024</p>
                <h3>24.09.2024</h3>
              </div>
            </div>
            <div className="body">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
                quas sint illo autem velit quisquam nobis beatae facere quod
                modi cumque placeat maxime consequatur exercitationem numquam
                temporibus porro a id.
              </p>
              <button>Get Rush Time</button>
            </div>
          </div>
          <div className="block">
            <div className="header">
              <div className="flex">
                <p>About IFD 2024</p>
                <h3>24.09.2024</h3>
              </div>
            </div>
            <div className="body">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa,
                quas sint illo autem velit quisquam nobis beatae facere quod
                modi cumque placeat maxime consequatur exercitationem numquam
                temporibus porro a id.
              </p>
              <button className="expired" disabled>
                Expired
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
