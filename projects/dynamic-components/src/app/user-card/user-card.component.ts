import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'projects/dynamic-components/src/app/services/profile.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  constructor(private profileService: ProfileService) {}

  logout() {
    this.profileService.logout();
  }
} 
