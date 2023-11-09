import { findAllUsers } from "@repository";
import { findByUUID, findByUsername } from "@service";
import { User } from "@types";

export const findUserController = async (
  _: any,
  args: Record<string, any>
) => {
  const users = (await findAllUsers()) as unknown as Array<User>;
  const { username, uuid } = args;
  if (uuid) return findByUUID(users, uuid);
  if (username) return findByUsername(users, username);
  return users;
};
