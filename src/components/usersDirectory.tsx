import { useEffect, useMemo, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

function UsersDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getUsers() {
      const url = "https://jsonplaceholder.typicode.com/users";
      setLoading(true);
      try {
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setUsers(result);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return users;
    }

    return users.filter((user) =>
      user.name.toLowerCase().includes(searchValue),
    );
  }, [users, search]);

  return (
    <div>
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {filteredUsers.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersDirectory;
