import React, { useEffect, useState } from "react";
const BACKEND_HOST = import.meta.env.VITE_BACKEND_URL;

const TopUrls = () => {
  const [topUrls, setTopUrls] = useState([]);

  useEffect(() => {
    const fetchTopUrls = async () => {
      try {
        const res = await fetch(BACKEND_HOST);
        const data = await res.json();
        setTopUrls(data.urls);
      } catch (err) {
        console.error("Failed to fetch top URLs", err);
      }
    };

    fetchTopUrls();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Top 100 Accessed URLs</h2>
      <ul className="divide-y border rounded bg-white">
        {topUrls.map((item, idx) => {
          const shortUrl = `${BACKEND_HOST}/${item.short_code}`;
          return (
            <li key={idx} className="p-3">
              <div className="text-sm text-gray-600">
                Full Url:{" "}
                <a
                  href={item.full_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {item.full_url}
                </a>
              </div>
              <div className="text-sm text-gray-600">
                Short URL:{" "}
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 hover:underline"
                >
                  {shortUrl}
                </a>
              </div>
              <div className="text-sm text-gray-800">
                Click Count: {item.click_count}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopUrls;
