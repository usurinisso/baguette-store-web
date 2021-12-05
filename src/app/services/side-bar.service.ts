import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  private open = new BehaviorSubject<boolean>(false);

  constructor() {}

  public isOpen(): Observable<boolean> {
    return this.open.asObservable();
  }

  public toggle(value: boolean): void {
    this.open.next(value);
  }
}
