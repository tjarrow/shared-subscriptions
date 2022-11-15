import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CheckSavedOffer } from '@store/app/app.actions';
import { ExternalLogin } from '@store/auth/auth.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public alive$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store,) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.alive$)).subscribe(params => {
      if (!params['at']) {
        this.router.navigate(['/']);
      } else {
        this.store.dispatch(new ExternalLogin(params['at'])).subscribe(() => {
          this.store.dispatch(new CheckSavedOffer());
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }
}
