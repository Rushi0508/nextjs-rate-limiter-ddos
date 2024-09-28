"use client";

import toast from "react-hot-toast";

export default function Home() {
  const handleClick = async () => {
    const res = await fetch("/api/limited");
    const data = await res.json();
    if (data.status === 200) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  }
  return (
    <div className="text-center flex flex-col gap-10 h-screen items-center justify-center p-5">
      <h1 className="font-bold text-4xl">Rate Limiter Demo</h1>
      <p>
        Click the button below to send a request to the server. The server will
        rate limit the requests to 5 request every 60 seconds.
      </p>
      <button className="hover:text-white hover:bg-gray-600 border-2 border-gray-600 px-5 py-2" onClick={handleClick} >Send Request</button>
    </div>
  );
}
