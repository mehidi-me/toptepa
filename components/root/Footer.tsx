import * as Unicons from "@iconscout/react-unicons";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="footer-menu">
      <div className="container">
        <Link href={"/level"}>
          <div className="ico">
            <Unicons.UilInfoCircle />
          </div>
        </Link>
        <Link href={"/leaderboard"}>
          <div className="ico">
            {/* <i className="uil uil-list-ol-alt" /> */}
            <Unicons.UilListOlAlt />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="ico order">
            {/* <i className="uil uil-clipboard-notes" /> */}
            <Unicons.UilClipboardNotes />
          </div>
        </Link>
        <Link href={"/notifications"}>
          <div className="ico">
            {/* <i className="uil uil-bell" /> */}
            <Unicons.UilBell />
            <div className="alert" />
          </div>
        </Link>
        <Link href={"/profile"}>
          <div className="ico">
            {/* <i className="uil uil-user" /> */}
            <Unicons.UilUser />
          </div>
        </Link>
      </div>
    </div>
  );
}
