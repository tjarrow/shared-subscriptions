import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInfo } from '@shared/models/user-info.model';
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '@shared/services/modal/modal.service';
import { ModalPath } from '@core/modal/modal-routes.model';
import { SetAvatar, ClearAvatarState } from '@store/auth/auth.actions';
import { AuthGetterState } from '@store/auth/auth-getter.state';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  public isAvatarMenuOpened: boolean;
  public alive$: Subject<void> = new Subject();
  public apiUrl: string = environment.apiUrl;
  public formGroup: FormGroup;
  public fileFormGroup: FormGroup;

  @Select(AuthGetterState.userInfo) userInfo$: Observable<UserInfo>;
  @Select(AuthGetterState.isAvatarLoading) isAvatarLoading$: Observable<UserInfo>;
  @Select(AuthGetterState.avatarSetSuccess) avatarSetSuccess$: Observable<boolean>;

  constructor(private store: Store,
              private window: Window,
              private formBuilder: FormBuilder,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.createForms();

    this.avatarSetSuccess$.pipe(takeUntil(this.alive$)).subscribe(isAvatarSetSuccessfully => {
      if (isAvatarSetSuccessfully) {
        this.store.dispatch(new ClearAvatarState());
      }
    });
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
    this.window.removeEventListener('click', this.handleOutsideClick);
  }

  createForms() {
    this.formGroup = this.formBuilder.group({
      password: ['**************']
    });

    this.fileFormGroup = this.formBuilder.group({
      avatar: ['']
    });
  }

  handleOpenAvatarMenu(e: MouseEvent) {
    e.stopPropagation();
    this.isAvatarMenuOpened = true;
    this.window.addEventListener('click', this.handleOutsideClick);
  }

  handleFileInputChange(file: File) {
    const formData = new FormData();
    formData.append('logo', file, file.name);
    this.store.dispatch(new SetAvatar({ formData: formData }));

  }

  handleDeleteAvatar(e: MouseEvent, isDisabled: boolean) {
    e.preventDefault();
    if (isDisabled) {
      e.stopPropagation();
    } else {
      this.modalService.openModal$(ModalPath.DeleteProfileImage, "Deleting Profile Image", 'user-profile');
    }
  }

  handleEditUserDetails() {
    this.modalService.openModal$(ModalPath.EditUserInfo, "Editing User Information", 'user-profile');
  }

  handleChangePassword() {
    this.modalService.openModal$(ModalPath.ChangePassword, "Changing Password", 'user-profile');
  }

  handleOutsideClick() {
    this.isAvatarMenuOpened = false;
    this.window.removeEventListener('click', this.handleOutsideClick);
  }
}
