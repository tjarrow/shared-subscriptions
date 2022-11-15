import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ModalService } from '@shared/services/modal/modal.service';
import { ModalPath } from '@core/modal/modal-routes.model';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  public tabWidths: number[] = [];
  public activeTab: number;
  public isTabReadyForTransition: boolean;
  public isTabMeasured: boolean;
  public leftPosition: number;
  public rightPosition: number;
  public alive$: Subject<void> = new Subject();

  @ViewChild('tabs') tabBox: ElementRef;

  @Select(AuthGetterState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  constructor(private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeTab = this.getActiveTab(this.route.snapshot.children[0].data);

    this.router.events.pipe(takeUntil(this.alive$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeTab = this.getActiveTab(this.route.snapshot.children[0].data);
        this.highlightTab();
      }
    });

    this.redirectToHomepageForNonLoggedInUsers();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

  ngAfterViewInit(): void {
    if (!this.tabBox && !this.tabBox.nativeElement.children) {
      return;
    }

    setTimeout(() => {
      Array.from(this.tabBox.nativeElement.children).forEach((element: HTMLElement) => {
        if (element.classList.contains('tabs__item')) return this.tabWidths.push(element.offsetWidth);
      });

      if (this.tabWidths.length) {
        this.highlightTab();
      }
    }, 100);


  }

  handleSignOut() {
    this.modalService.openModal$(ModalPath.SignOut, "Sign Out");
  }

  getActiveTab(data: Object) {
    return data.hasOwnProperty('activeTab') ? <number>data['activeTab'] : null;
  }

  highlightTab() {
    this.leftPosition = 17;
    this.rightPosition = 17;

    if (this.activeTab == 0) {
      this.rightPosition = this.tabWidths[1] + 17;
    } else {
      this.leftPosition = this.tabWidths[0] + 17;
    }
    this.isTabMeasured = true;

    setTimeout(() => {
      this.isTabReadyForTransition = true;
    }, 50);
  }

  redirectToHomepageForNonLoggedInUsers() {
    this.isAuthenticated$.pipe(takeUntil(this.alive$)).subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }
}
