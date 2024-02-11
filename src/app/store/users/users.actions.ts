import { createAction, props } from "@ngrx/store";

import { User } from "@models/user";

export const loadUsers = createAction('[users] load');
export const saveUsers = createAction('[users] save', props<{ users: User[] }>());
export const createUser = createAction('[users] create', props<{ user: Partial<User> }>())
export const updateUser = createAction('[users] update', props<{ id: string, user: Partial<User> }>())
export const deleteUser = createAction('[users] delete', props<{ id: string }>())
