import { User } from "./user";

export type NullableString = string | null;

export type AppStore = {
  users: {
    userList: User[]
  }
}
