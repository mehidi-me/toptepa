import Image from "next/image";
import Client1 from "@/public/images/client.png";
import Client2 from "@/public/images/client2.gif";
import Client3 from "@/public/images/client3.png";
import "./CharValue.css";
import settings from "@/data/settings";

type Props = {};

export default function CharValue({}: Props) {
  return (
    <div className="block">
      <div className="grid-3">
        <div className="chr-profile alert">
          <div className="round-pic">
            <Image src={Client2} alt="Client2" />
          </div>
          <span>=</span>
          {settings?.clientProperties?.client2?.orders}
        </div>
        <div className="chr-profile">
          <div className="round-pic" style={{ background: "#00FFCC" }}>
            <Image src={Client3} alt="Client3" />
          </div>
          <span>=</span>+{settings?.clientProperties?.client3?.orders}
        </div>
        <div className="chr-profile">
          <div className="round-pic">
            <Image src={Client1} alt="Client2" />
          </div>
          <span>=</span>+{settings?.clientProperties?.client1?.orders}
        </div>
      </div>
    </div>
  );
}
