import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api.get(`/blogs/${id}`).then(res => setBlog(res.data));
  }, [id]);

  if (!blog) return null;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {blog.image && <img src={blog.image} className="w-full rounded mb-4" />}
      <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">by {blog.authorUid} • {new Date(blog.createdAt).toLocaleString()}</p>
      <div className="prose max-w-none whitespace-pre-wrap">{blog.content}</div>
    </div>
  );
}
