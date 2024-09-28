import * as Unicons from "@iconscout/react-unicons";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="footer-menu">
      <div className="container">
        <div className="ico">
          {/* <i className="uil uil-info-circle" /> */}
          <Unicons.UilInfoCircle />
        </div>
        <div className="ico">
          {/* <i className="uil uil-list-ol-alt" /> */}
          <Unicons.UilListOlAlt />
        </div>
        <div className="ico order">
          {/* <i className="uil uil-clipboard-notes" /> */}
          <Unicons.UilClipboardNotes />
        </div>
        <div className="ico">
          {/* <i className="uil uil-bell" /> */}
          <Unicons.UilBell />
          <div className="alert" />
        </div>
        <div className="ico">
          {/* <i className="uil uil-user" /> */}
          <Unicons.UilUser />
        </div>
      </div>
    </div>
  );
}
