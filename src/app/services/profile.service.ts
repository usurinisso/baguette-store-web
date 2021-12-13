import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  async getUserProfile() {
    return await firstValueFrom(
      this.http.get<UserProfile>(`${environment.apiUrl}/users/profile`)
    );
  }
}
