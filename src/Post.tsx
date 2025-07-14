import { useParams } from "react-router";
import { useFetchWithCache } from './hooks/useFetchWithCache';
import Author from "./Author";
import { type Post } from "./PostInterface";

export default function Post() {
  const { postId } = useParams<{ postId: string }>();

  const { data: post, loading, error } = useFetchWithCache<Post>(
    `post-${postId}`,
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (loading) return <p>Завантаження поста...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!post) return <p>Пост не знайдено.</p>;

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Author id={post.userId} />
    </div>
  );
}