import { createReducer, on } from "@ngrx/store";

import { createUser, deleteUser, saveUsers, updateUser } from "@store/users/users.actions";
import { initialState } from "@store/users/users.states";

export const userReducer = createReducer(initialState,
  on(createUser, (states, action) => {
    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      name: action.user.name ?? '',
      email: action.user.email ?? '',
      phone: action.user.phone ?? '',
    };
    const userList = [...states.userList, newUser];
    return { ...states, userList }
  }),
  on(updateUser, (states, action) => {
    return {
      ...states,
      userList: states.userList.map(u => u.id === action.id ? {
        id: action.id,
        name: action.user.name ?? '',
        email: action.user.email ?? '',
        phone: action.user.phone ?? '',
      } : u)
    }
  }),
  on(deleteUser, (states, action) => {
    return {
      ...states,
      userList: states.userList.filter(user => user.id !== action.id)
    }
  }),
  on(saveUsers, (states, action) => {
    return {
      ...states,
      userList: action.users
    }
  })
)
