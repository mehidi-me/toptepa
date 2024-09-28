import {
  BellIcon,
  ClipboardIcon,
  InfoIcon,
  ListIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="footer-menu">
      <div className="container">
        <Link href={"/level"}>
          <div className="ico">
            <InfoIcon />
          </div>
        </Link>
        <Link href={"/leaderboard"}>
          <div className="ico">
            {/* <i className="uil uil-list-ol-alt" /> */}
            <ListIcon />
          </div>
        </Link>
        <Link href={"/"}>
          <div className="ico order">
            {/* <i className="uil uil-clipboard-notes" /> */}
            <ClipboardIcon />
          </div>
        </Link>
        <Link href={"/notifications"}>
          <div className="ico">
            {/* <i className="uil uil-bell" /> */}
            <BellIcon />
            <div className="alert" />
          </div>
        </Link>
        <Link href={"/profile"}>
          <div className="ico">
            {/* <i className="uil uil-user" /> */}
            <UserIcon />
          </div>
        </Link>
      </div>
    </div>
  );
}
