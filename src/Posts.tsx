import { Link } from "react-router";
import { type Post } from "./PostInterface";
import { useFetch } from "./hooks/useFetch";

export default function Posts() {
  const { data: posts, loading, error } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");


  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Виникла помилка: {error}</p>;

  if (posts) {
    const postsElements = posts
      .map(post => (
        <li key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>

      ));
    return (
      <div className="posts">
        <h1>Завантажені пости:</h1>
        <ul>
          {postsElements}
        </ul>
      </div>
    );
  }
}