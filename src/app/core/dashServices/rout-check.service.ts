import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutCheckService {
  constructor() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  hasRole(...roles: string[]): boolean {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && user.role) {
      return roles.includes(user.role);
    }
    return false;
  }

  accessTo(): boolean {
    return this.hasRole('admin', 'super-admin', 'field-staff');
  }
}
