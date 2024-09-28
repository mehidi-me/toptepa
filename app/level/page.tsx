import Footer from "@/components/root/Footer";
import "@/app/css/level.css";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <main>
        <div className="container">
          <div className="current-level-badge">
            <img src="images/new.svg" alt="" />
            <p>Newby</p>
          </div>
          <div className="level-flow">
            <div className="level active">
              <img src="images/new.svg" alt="" />
              <p>Newby</p>
            </div>
            <div className="level">
              <img src="images/tepa.svg" alt="" />
              <p>Tepa</p>
            </div>
            <div className="level">
              <img src="images/tepaking.svg" alt="" />
              <p>Tepa King</p>
            </div>
            <div className="level">
              <img src="images/top.svg" alt="" />
              <p>Top Tepa</p>
            </div>
          </div>
        </div>
      </main>
      <section>
        <div className="container">
          <div className="gap-1">
            <h2 className="title">Performance metrics</h2>
            <div className="block">
              <div className="header">
                <div className="flex">
                  <p>Tap Rating</p>
                  <h2>95%</h2>
                </div>
                <div className="bar-wraper">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "95%" }} />
                  </div>
                </div>
                <div className="placement">
                  <small>0%</small>
                  <small>70%</small>
                  <small>90%</small>
                  <small>100%</small>
                </div>
              </div>
              <div className="body">
                <div className="list">
                  <p>Maintain current level</p>
                  <p>Quality for next level</p>
                </div>
                <div className="block">
                  <i className="uil uil-check" />
                  <p>Qualified for next level</p>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="header">
                <div className="flex">
                  <p>Top Tepa Orders</p>
                  <h3>
                    <span>105,980</span> / 10,000
                  </h3>
                </div>
              </div>
              <div className="body">
                <div className="list">
                  <p>Maintain current level</p>
                  <p>Quality for next level</p>
                </div>
                <div className="block alert">
                  <i className="uil uil-multiply" />
                  <p>Qualified for next level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
