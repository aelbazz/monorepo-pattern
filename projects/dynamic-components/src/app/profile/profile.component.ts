import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfileHostDirective } from 'projects/dynamic-components/src/app/profile/profile-host.directive';
import { ProfileService } from 'projects/dynamic-components/src/app/services/profile.service';
import { Subject } from 'rxjs/internal/Subject';

import { mergeMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  template:`<ng-template appProfileHost></ng-template>`
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild(ProfileHostDirective, { static: true })
  profileHost!: ProfileHostDirective;
  private destroySubject = new Subject();

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    const viewContainerRef = this.profileHost.viewContainerRef;

    this.profileService.isLoggedIn$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isLoggedIn =>
          this.profileService.loadComponent(viewContainerRef, isLoggedIn)
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}