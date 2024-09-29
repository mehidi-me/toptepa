import {
  BellIcon,
  ClipboardIcon,
  InfoIcon,
  ListIcon,
  UserIcon,
} from "lucide-react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="footer-menu">
      <div className="container">
        <a href={"/level"}>
          <div className="ico">
            <InfoIcon />
          </div>
        </a>
        <a href={"/leaderboard"}>
          <div className="ico">
            {/* <i className="uil uil-list-ol-alt" /> */}
            <ListIcon />
          </div>
        </a>
        <a href={"/"}>
          <div className="ico order">
            {/* <i className="uil uil-clipboard-notes" /> */}
            <ClipboardIcon />
          </div>
        </a>
        <a href={"/notifications"}>
          <div className="ico">
            {/* <i className="uil uil-bell" /> */}
            <BellIcon />
            <div className="alert" />
          </div>
        </a>
        <a href={"/profile"}>
          <div className="ico">
            {/* <i className="uil uil-user" /> */}
            <UserIcon />
          </div>
        </a>
      </div>
    </div>
  );
}
