import { FormControl } from "@angular/forms"
import { NullableString } from "./common"

export interface User {
  id: string,
  name: NullableString,
  email: NullableString,
  phone: NullableString
}

export interface UserForm {
  name: FormControl<NullableString>,
  email: FormControl<NullableString>,
  phone: FormControl<NullableString>
}
