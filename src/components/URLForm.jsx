import React, { useState } from "react";
const BACKEND_HOST = import.meta.env.VITE_BACKEND_URL;

const URLForm = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const isValidUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!isValidUrl(url)) {
      setError("Full url is not a valid url");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_HOST}/short_urls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_url: url }),
      });

      const data = await response.json();
      if (response.ok) {
        const short_url = `${BACKEND_HOST}/${data.short_code}`
        setShortUrl(short_url);
        setUrl("");
      } else {
        const message =
        Array.isArray(data.errors) && data.errors.length > 0
          ? data.errors.join(", ")
          : data.errors || "Something went wrong.";
        setError(message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Shorten a URL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter a Full URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Shorten
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {shortUrl && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          Shortened URL: <a href={shortUrl} target="blank" className="text-blue-700">{shortUrl}</a>
        </div>
      )}
    </div>
  );
};

export default URLForm;
