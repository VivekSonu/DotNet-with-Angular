import {
  HttpClient,
  httpResource,
  HttpResourceRef,
  HttpResourceRequest,
} from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../models/auth.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  user = signal<User | null>(null);
  router = inject(Router);

  loadUser(): HttpResourceRef<User | undefined> {
    return httpResource<User>(() => {
      const request: HttpResourceRequest = {
        url: `${environment.apiBaseUrl}/api/auth/me`,
        withCredentials: true,
      };

      return request;
    });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${environment.apiBaseUrl}/api/auth/login`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .pipe(tap((userResponse) => this.setUser(userResponse)));
  }

  logout() {
    //API auth/Logout

    this.http
      .post<void>(
        `${environment.apiBaseUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe({
        next: () => {
          //Clear out the user signal
          this.setUser(null);

          //redirect the user to home page
          this.router.navigate(['']);
        },
      });
  }

  setUser(updateUser: User | null) {
    // console.log('from login');
    // console.log(updateUser);
    if (updateUser) {
      this.user.set({
        email: updateUser.email,
        roles: updateUser.roles.map((r) => r.toLowerCase()),
      });
    } else {
      this.user.set(null);
    }
  }
}
