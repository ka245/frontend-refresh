import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { User } from "../types/User";
import UserItem from "./userItem";

function UserSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const controller = new AbortController();

    async function getUsers() {
      const url = `https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(debouncedSearch)}`;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });
        if (response.ok) {
          const result = await response.json();
          setUsers(result);
        } else {
          throw new Error("Failed to fetch users");
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    getUsers();

    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchValue);

      const matchesFavourite =
        !showFavouritesOnly || favouriteIds.includes(user.id);

      return matchesSearch && matchesFavourite;
    });
  }, [users, search, showFavouritesOnly, favouriteIds]);

  const toggleFavourite = useCallback((id: number) => {
    setFavouriteIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((favouriteId) => favouriteId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  }, []);

  return (
    <div>
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label>
        Show favourites only{" "}
        <input
          type="checkbox"
          name="showFavourites"
          checked={showFavouritesOnly}
          onChange={(e) => setShowFavouritesOnly(e.target.checked!)}
        />
      </label>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div>
          {filteredUsers.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isFavourite={favouriteIds.includes(user.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
