import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStore } from '@models/common';
import { User } from '@models/user';
import { deleteUser } from '@store/users/users.actions';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html'
})
export class UsersComponent {
  users$ = this.store.select('users');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStore>
  ) { }

  addUser() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  editUser(user: User) {
    this.router.navigate(['./edit', user.id], { relativeTo: this.route });
  }

  deleteUser(id: string) {
    this.store.dispatch(deleteUser({ id }));
  }
}
