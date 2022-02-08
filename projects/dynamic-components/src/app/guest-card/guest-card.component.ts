import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'projects/dynamic-components/src/app/services/profile.service';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html' 
})
export class GuestCardComponent  {
  constructor(private profileService: ProfileService) {}

  login() {
    this.profileService.login();
  }
}
