import { useFetchWithCache } from './hooks/useFetchWithCache';
import { type User } from "./UserInterface";

interface AuthorProps {
  id: number;
}
export default function Author({ id }: AuthorProps) {
  const { data: author, loading, error } = useFetchWithCache<User>(
    `author-${id}`,
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  if (loading) return <p>Завантаження автора...</p>;
  if (error) return <p>Не вдалося завантажити автора: {error}</p>;

  if (author) {
    return (
      <div className="author">
        <p><strong>Автор:</strong> {author.name}</p>
        <p><strong>Email:</strong> {author.email}</p>
      </div>
    );
  }

  return null;
}