import { memo, useEffect, useMemo, useState } from "react";
import { User } from "../types/User";

type UserItemProps = {
  user: User;
  isFavourite: boolean;
  onToggleFavourite: (id: number) => void;
};

export const UserItem = memo(function UserItem({
  user,
  isFavourite,
  onToggleFavourite,
}: UserItemProps) {
  console.log("UserItem rendered:", user.name);

  return (
    <div>
      <p>
        {user.name} - {user.email}
      </p>
      <button onClick={() => onToggleFavourite(user.id)}>
        {isFavourite ? "Remove from favourites" : "Add to favourites"}
      </button>
    </div>
  );
});

export default UserItem;
