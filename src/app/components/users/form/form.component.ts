import { NgClass } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppStore, NullableString } from '@models/common';
import { UserForm } from '@models/user';
import { createUser, updateUser } from '@store/users/users.actions';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() id!: string;
  #destroyRef = inject(DestroyRef);
  userForm = this.fb.group<UserForm>({
    name: this.fb.control<NullableString>('', [Validators.required]),
    email: this.fb.control<NullableString>('', [Validators.required, Validators.email]),
    phone: this.fb.control<NullableString>('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
  });

  get frm() {
    return this.userForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppStore>
  ) { }

  ngOnInit() {
    this.store.select('users')
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((res) => {
        const user = res.userList.find(user => user.id === this.id);
        user && this.userForm.patchValue(user)
      })
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.id) {
      this.store.dispatch(updateUser({
        id: this.id,
        user: this.userForm.value
      }))
    } else {
      this.store.dispatch(createUser({
        user: this.userForm.value
      }))
    }
    this.navBack();
  }

  navBack() {
    this.router.navigate(['/users']);
  }
}

