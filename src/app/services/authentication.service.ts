import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User, UserProfile } from '../models/user';
import { AccessToken } from '../interfaces/access-token';
import { ProfileService } from './profile.service';
import { RegisterData } from '../interfaces/register-data';
import { RegisterResponse } from '../interfaces/register-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private profile: ProfileService) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(
      user && JSON.parse(user)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string) {
    try {
      const token = await firstValueFrom(
        this.http.post<AccessToken>(`${environment.apiUrl}/users/login`, {
          username,
          password
        })
      );

      const userProfile = await firstValueFrom(
        this.http.get<UserProfile>(`${environment.apiUrl}/users/profile`, {
          headers: {
            Authorization: 'Bearer ' + token.access_token
          }
        })
      );

      const loggedInUser = { ...userProfile, token: token.access_token };
      localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      this.currentUserSubject.next(loggedInUser);
      return undefined;
    } catch (err: any) {
      if (err?.status === 500) {
        return 404;
      }
      if (err?.status == 401) {
        return 401;
      }
      return false;
    }
  }

  async register(registerData: RegisterData) {
    const data = {
      userName: registerData.userName,
      lastName: registerData.lastName,
      firstName: registerData.firstName,
      password: registerData.password
    };
    try {
      const registerResult = await firstValueFrom(
        this.http.post<RegisterResponse>(`${environment.apiUrl}/users`, data)
      );

      await this.login(registerResult.userName, data.password);
      return 200;
    } catch (err: any) {
      if (err?.status === 500) {
        return 500;
      }
      throw err;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null as unknown as User);
  }

  setNewProf(user: UserProfile) {
    const curs = localStorage.getItem('currentUser');
    if (curs) {
      const curr = this.currentUserValue;
      const newU = { ...curr, cart: user.cart };
      localStorage.setItem('currentUser', JSON.stringify(newU));
      this.currentUserSubject.next(newU);
    }
  }
}
