import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from "@shared/services/modal/modal.service";
import { Store, Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { DeleteAvatar, ClearAvatarState } from '@store/auth/auth.actions';
import { takeUntil } from 'rxjs/operators';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-delete-profile-image',
  templateUrl: './delete-profile-image.component.html',
  styleUrls: ['./delete-profile-image.component.scss']
})
export class DeleteProfileImageComponent implements OnInit, OnDestroy {
  public alive$: Subject<void> = new Subject();

  @Select(AuthGetterState.isAvatarLoading) isLoading$: Observable<boolean>;
  @Select(AuthGetterState.avatarSetSuccess) avatarSetSuccess$: Observable<boolean>;
  @Select(AuthGetterState.avatarSetError) avatarSetError$: Observable<any>;

  constructor(private modalService: ModalService,
              private store: Store,) { }

  ngOnInit(): void {
    this.avatarSetSuccess$.pipe(takeUntil(this.alive$)).subscribe(isAvatarDeleteSuccessfully => {
      if (isAvatarDeleteSuccessfully) {
        this.modalService.closeModal();
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.store.dispatch(new ClearAvatarState());
  }

  handleDelete(): void {
    this.store.dispatch(new DeleteAvatar());
  }

  handleClose(): void {
    this.modalService.closeModal();
  }

}
