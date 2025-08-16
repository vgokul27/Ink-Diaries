import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    api.get("/blogs").then(res => setBlogs(res.data));
  }, []);

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((b, i) => (
        <motion.div
          key={b._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="border rounded p-4 flex flex-col gap-2"
        >
          {b.image && <img src={b.image} alt="" className="h-40 w-full object-cover rounded" />}
          <h3 className="font-semibold text-lg">{b.title}</h3>
          <p className="text-sm line-clamp-3">{b.content}</p>
          <div className="mt-auto flex gap-3">
            <Link className="underline" to={`/blog/${b._id}`}>Read</Link>
            {user && <FavoriteButton blogId={b._id} initiallyFav={b.favorites?.includes(user.uid)} />}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FavoriteButton({ blogId, initiallyFav }) {
  const { user } = useAuth();
  const [fav, setFav] = useState(initiallyFav);

  const toggle = async () => {
    if (!user) return;
    if (fav) {
      await api.delete(`/blogs/${blogId}/favorite`);
      setFav(false);
    } else {
      await api.post(`/blogs/${blogId}/favorite`);
      setFav(true);
    }
  };

  return (
    <button onClick={toggle} className="text-xl">
      {fav ? "❤️" : "🤍"}
    </button>
  );
}
