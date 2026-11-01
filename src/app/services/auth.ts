import { Service, signal } from '@angular/core';

@Service()
export class Auth {
  private readonly admin = signal(true);
  isAdmin = this.admin.asReadonly();
  toggle() {
    this.admin.update((a) => !a);
  }
}
