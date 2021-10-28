import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  private showMobileVersion = false;

  toggleMenu(): void {
    this.showMobileVersion = !this.showMobileVersion;
  }

  get mobileMenu(): string {
    return this.showMobileVersion ? 'navbar-section-mobile' : '';
  }
}

