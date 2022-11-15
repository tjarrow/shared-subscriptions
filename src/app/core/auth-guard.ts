import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { ModalService } from '@shared/services/modal/modal.service';
import { ModalPath } from '@core/modal/modal-routes.model';
import { SaveRedirectAfterLoginUrl } from '@store/auth/auth.actions';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store,
              private modalService: ModalService,) {
    }
    public canActivate(route: ActivatedRouteSnapshot): boolean {
      const urlWhereUserWantToGo = route.pathFromRoot.reduce((prev, current) =>
        `${prev}${current.url.reduce((prev, current) => `${prev}/${current.path}`, '')}`, '');
      this.store.dispatch(new SaveRedirectAfterLoginUrl({
        redirectAfterLoginUrl: urlWhereUserWantToGo
      }));

      const isAuthenticated = this.store.selectSnapshot(AuthGetterState.isAuthenticated);
      if (!isAuthenticated) {
        this.modalService.openModal$(ModalPath.SignIn, 'Sign In');
      }
      return isAuthenticated;
    }
}
