import { Injectable } from "@angular/core";
import { Actions, OnInitEffects, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, switchMap, tap } from "rxjs";

import { AppStore } from "@models/common";
import { User } from "@models/user";
import { createUser, deleteUser, loadUsers, saveUsers, updateUser } from "@store/users/users.actions";

@Injectable()
export class UserEffects implements OnInitEffects {
  saveUsers$ = createEffect(() => this.actions$.pipe(
    ofType(createUser, updateUser, deleteUser),
    switchMap(() => this.store.select('users')),
    tap((users) => {
      localStorage.setItem('userList', JSON.stringify(users.userList));
    })
  ), { dispatch: false });

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() => {
      const users = JSON.parse(localStorage.getItem('userList') ?? '[]') as User[];
      return of(saveUsers({ users }));
    }),
  ));

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>
  ) { }

  ngrxOnInitEffects() {
    return loadUsers();
  }
}
