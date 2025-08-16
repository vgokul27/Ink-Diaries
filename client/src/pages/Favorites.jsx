import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    api.get("/blogs/me/favorites").then(res => setBlogs(res.data));
  }, []);
  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map(b => (
        <div key={b._id} className="border rounded p-4">
          <h3 className="font-semibold">{b.title}</h3>
          <Link className="underline text-sm" to={`/blog/${b._id}`}>Open</Link>
        </div>
      ))}
    </div>
  );
}
