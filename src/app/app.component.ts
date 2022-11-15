import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Logout } from '@store/auth/auth.actions';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  public isMainPage: boolean;
  public alive$: Subject<void> = new Subject();
  private _previousUrl: string = '';

  @Select(AuthGetterState.isTokenExpired) isTokenExpired$: Observable<boolean>;

  constructor(private router: Router,
              private store: Store,
              @Inject(DOCUMENT) private document: Document, // for server-side rendering
              private window: Window,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((type: NavigationEnd) => type.url !== undefined && type instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe((event: NavigationEnd) => {
      {
        this.isMainPage = this.detectMainPage(event.url);

        if (this.isMainPage) {
          this.renderer.removeClass(this.document.body, "body--internal-page");
        } else {
          this.renderer.addClass(this.document.body, "body--internal-page");
        }

        if (!this.isModalRouteChanging(event.url)) {
          this.window.scrollTo(0, 0);
        }
      }
    });

    this.isTokenExpired$.pipe(takeUntil(this.alive$)).subscribe(isTokenExpired => {
      if (isTokenExpired) {
        this.store.dispatch(new Logout());
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

  detectMainPage(url: string): boolean {
    return url === '/' || (url[0] === '/' && url[1] === '('); // url === '/' || url contains modal route, starts from '/(' e.g. '/(modal:modal/signIn)' or '/my-subscriptions(modal:modal/signIn)'
  }

  isModalRouteChanging(currentUrl: string): boolean {
    const result = Boolean(~currentUrl.indexOf('(modal:modal') || ~this._previousUrl.indexOf('(modal:modal'));
    this._previousUrl = currentUrl;
    return result;
  }
}
