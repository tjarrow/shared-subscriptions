import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { fromEvent, Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Select } from '@ngxs/store';
import { ModalService } from '@shared/services/modal/modal.service';
import { ModalPath } from '@core/modal/modal-routes.model';
import { UserInfo } from '@shared/models/user-info.model';
import { environment } from "src/environments/environment";
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {
  public isProfileMenuOpened: boolean;
  public alive$: Subject<void> = new Subject();
  public timeout: number;
  public headerBackgroundColor: string;
  public headerBorderColor: string;
  public headerShadow: string;
  private _isStatic: boolean;
  public apiUrl: string = environment.apiUrl;

  @Input() set isStatic(isStatic: boolean) {
    this._isStatic = isStatic;
    if (isStatic) this.clearHeaderBackgroundVisability();
  }
  get isStatic(): boolean {
    return this._isStatic;
  }

  @Select(AuthGetterState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  @Select(AuthGetterState.userInfo) userInfo$: Observable<UserInfo>;

  constructor(private modalService: ModalService,
              private window: Window) { }

  ngOnInit(): void {
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    fromEvent(this.window, 'scroll').pipe(
      filter(() => !this.isStatic),
      takeUntil(this.alive$)
    ).subscribe(() => {
      if (this.timeout) window.cancelAnimationFrame(this.timeout);
      this.timeout = window.requestAnimationFrame(() => {
        this.checkHeaderBackgroundVisability();
      });
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.window.removeEventListener('click', this.handleOutsideClick)
  }

  handleSignOut(e: MouseEvent) {
    e.preventDefault();
    this.handleCloseUserMenu(e);
    this.modalService.openModal$(ModalPath.SignOut, "Sign Out");
  }

  handleOpenUserMenu(e: MouseEvent) {
    e.stopPropagation();
    if (!this.isProfileMenuOpened) {
      this.isProfileMenuOpened = true;
      this.window.addEventListener('click', this.handleOutsideClick)
    }
  }

  handleCloseUserMenu(e: MouseEvent) {
    e.stopPropagation();
    this.isProfileMenuOpened = false;
  }

  handleBurgerClick(e: MouseEvent) {
    e.stopPropagation();
    this.isProfileMenuOpened = !this.isProfileMenuOpened;
  }

  handleOutsideClick() {
    this.isProfileMenuOpened = false;
    this.window.removeEventListener('click', this.handleOutsideClick)
  }

  checkHeaderBackgroundVisability() {
    const headerPosition = window.pageYOffset / 200;
    const headerBackgroundOpacity = (headerPosition < 1) ? headerPosition : 1;
    this.headerBackgroundColor = `rgba(255, 255, 255, ${headerBackgroundOpacity})`;
    this.headerBorderColor = `rgba(228, 229, 229, ${headerBackgroundOpacity})`;
    this.headerShadow = `0 3px 4px rgba(0, 0, 0, ${headerBackgroundOpacity * 0.03})`;
  }

  clearHeaderBackgroundVisability() {
    this.headerBackgroundColor = undefined;
    this.headerBorderColor = undefined;
    this.headerShadow = undefined;
  }

  handleSignInClick(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
  }

  handleSignUpClick(e: MouseEvent) {
    e.preventDefault();
    this.modalService.openModal$(ModalPath.SignUp, 'Sign Up');
  }

}
