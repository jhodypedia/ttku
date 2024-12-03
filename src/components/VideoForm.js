import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faClock,
  faEye,
  faHeart,
  faComment,
  faShare,
  faMusic,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const Navbar = () => (
  <nav className="bg-blue-600 text-white py-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center px-4">
      <h1 className="text-lg font-bold">TikTok Downloader</h1>
      <ul className="flex space-x-4">
        <li>
          <a href="#home" className="hover:underline">
            Beranda
          </a>
        </li>
        <li>
          <a href="#about" className="hover:underline">
            Tentang
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:underline">
            Kontak
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-4 mt-8">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        Created by <span className="font-semibold" ><a href="https://t.me/whysir">JhodyXD</a></span>
      </p>
    </div>
  </footer>
);

const VideoForm = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setVideoData(null);

    toastr.clear();
    toastr.info("Menghubungkan ke server...", "Mohon tunggu");

    try {
      const response = await fetch("https://www.tikwm.com/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: videoUrl,
          count: 12,
          cursor: 0,
          web: 1,
          hd: 1,
        }),
      });

      const data = await response.json();

      if (data.code === 0 && data.data) {
        setVideoData(data.data);
        toastr.success("Video berhasil diproses!", "Sukses");
      } else {
        toastr.error("Gagal memproses video. Periksa URL.", "Kesalahan");
      }
    } catch (error) {
      toastr.error("Terjadi kesalahan saat menghubungi server.", "Kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow flex flex-col items-center">
        {!videoData ? (
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-8">
            <h1 className="text-xl font-bold text-center text-gray-800 mb-4">
              Download Video TikTok
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="videoUrl"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Masukkan URL Video:
                </label>
                <input
                  id="videoUrl"
                  type="url"
                  placeholder="https://www.tiktok.com/@user/video/1234567890"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center px-4 py-2 text-white rounded-md ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Memproses...
                  </>
                ) : (
                  "Unduh Video"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg mt-6 p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              <FontAwesomeIcon
                icon={faMusic}
                className="mr-2 text-blue-600"
              />
              {videoData.title}
            </h2>
            <div className="flex space-x-4 mt-2">
              <img
                src={`https://www.tikwm.com${videoData.cover}`}
                alt="Video Cover"
                className="rounded-lg w-1/3"
              />
              <div className="flex-1">
                <p className="text-gray-700">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="mr-2 text-green-500"
                  />
                  Durasi: {videoData.duration} detik
                </p>
                <p className="text-gray-700">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="mr-2 text-purple-500"
                  />
                  Dilihat: {videoData.play_count.toLocaleString()} kali
                </p>
                <p className="text-gray-700">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="mr-2 text-red-500"
                  />
                  Disukai: {videoData.digg_count.toLocaleString()} kali
                </p>
                <p className="text-gray-700">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="mr-2 text-blue-400"
                  />
                  Komentar: {videoData.comment_count.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <FontAwesomeIcon
                    icon={faShare}
                    className="mr-2 text-orange-500"
                  />
                  Dibagikan: {videoData.share_count.toLocaleString()}
                </p>
              </div>
            </div>

            <h3 className="text-gray-700 font-semibold mt-4 mb-2">
              Pilih Resolusi:
            </h3>
            <div className="space-y-2">
              <a
                href={`https://www.tikwm.com${videoData.play}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Unduh Resolusi SD
              </a>
              <a
                href={`https://www.tikwm.com${videoData.hdplay}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Unduh Resolusi HD
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default VideoForm;
