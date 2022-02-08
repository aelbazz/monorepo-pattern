import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private isLoggedIn = new BehaviorSubject(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private cfr: ComponentFactoryResolver) {}

  login() {
    this.isLoggedIn.next(true);
  }

  logout() {
    this.isLoggedIn.next(false);
  }

  async loadComponent(vcr: ViewContainerRef, isLoggedIn: boolean) {
    const { GuestCardComponent } = await import(
      'projects/dynamic-components/src/app/guest-card/guest-card.component'
    );

    const { UserCardComponent } = await import(
      'projects/dynamic-components/src/app/user-card/user-card.component'
    );

    vcr.clear();
    let component: any = isLoggedIn ? UserCardComponent : GuestCardComponent;

    return vcr.createComponent(this.cfr.resolveComponentFactory(component));
  }
}
