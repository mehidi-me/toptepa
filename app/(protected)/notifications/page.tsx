import Footer from "@/components/root/Footer";
// import "@/public/css/notification.css";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <main className="mt-2 notification">
        <div className="container">
          <h2 className="title">Notifications</h2>
          <div className="block">
            <div className="header">
              <div className="flex">
                <p>🏆 টপ টেপা গেম - ডেইলি কন্টেস্ট 🏆 </p>
                {/* <h3>24.09.2024</h3> */}
              </div>
            </div>
            <div className="body">
              <p>
                ৬ দিনে ৬ বিজয়ী! প্রতিদিন রাত ১২টা থেকে পরবর্তী রাত ১২টার মধ্যে
                সর্বোচ্চ আর্নিং করে পুরস্কার জিতে নিন! 🎁
                <br />
                <br />
                প্রতিদিন একজন করে বিজয়ী, তাই প্রতিদিন জেতার সুযোগ রয়েছে!
                <br />
                <br />
                এখনই অংশ নিন এবং জিতুন আকর্ষণীয় পুরস্কার!
                <br />
                <br />
                বি:দ্র: একজন ইউজার শুধুমাত্র একবারই পুরস্কার পাবে।
              </p>
              {/* <button>Get Rush Time</button> */}
            </div>
          </div>
          <div className="block">
            <div className="header">
              <div className="flex">
                <p>🏆 টপ টেপা গেম - বিশেষ ঘোষণা 🏆</p>
                {/* <h3>24.09.2024</h3> */}
              </div>
            </div>
            <div className="body">
              <p>
                ইন্টারন্যাশনাল ফ্রিল্যান্সার ডে উপলক্ষে, আমরা লিডারবোর্ডের টপ ১০
                খেলোয়াড়কে দিচ্ছি স্পেশাল গিফট 🎁
                <br />
                <br />
                এখনই খেলা শুরু করে বিশেষ পুরস্কার জিতে নিন! 🏅
              </p>
              {/* <button>Get Rush Time</button> */}
            </div>
          </div>
          <div className="block">
            <div className="header">
              <div className="flex">
                <p>প্রতিযোগিতার সময়সীমা</p>
                {/* <h3>24.09.2024</h3> */}
              </div>
            </div>
            <div className="body">
              <p>
                গেমটি চলছে ১৯ তারিখ পর্যন্ত ইন্টারন্যাশনাল ফ্রিল্যান্সার ডে
                উপলক্ষে, তাই এখনই অংশ নিন! লিডার বোর্ডে থাকা সর্বোচ্চ ১০ জন
                স্কোরার পাবেন আমাদের বিশেষ পুরস্কার!
              </p>
              {/* <button className="expired" disabled>
                Expired
              </button> */}
            </div>
          </div>
          <div className="block">
            <div className="header">
              <div className="flex">
                <p>ডেটা সুরক্ষা</p>
                {/* <h3>24.09.2024</h3> */}
              </div>
            </div>
            <div className="body">
              <p>
                ফোন নাম্বার শুধুমাত্র ভেরিফিকেশনের জন্য নেওয়া হচ্ছে, এটি কোন
                প্রকার প্রমোশনাল কাজে ব্যবহার করা হবে না। বিজয়ী ঘোষণার পর
                আমাদের ডেটাবেজ সম্পূর্ণভাবে ডিলিট করা হবে, সুতরাং আপনার ডাটা
                গোপনীয়তা বজায় থাকবে।
              </p>
              {/* <button className="expired" disabled>
                Expired
              </button> */}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
