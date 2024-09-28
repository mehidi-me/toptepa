import Footer from "@/components/root/Footer";
import "@/app/css/leaderboard.css";

type Props = {};

export default function page({}: Props) {
  return (
    <>
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
                      <img src="images/user.png" alt="" />
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
                      <img src="images/user.png" alt="" />
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
                      <img src="images/user.png" alt="" />
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
                      <img src="images/user.png" alt="" />
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
                      <img src="images/user.png" alt="" />
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
    </>
  );
}
