import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";

import { ModalPath } from "@core/modal/modal-routes.model";
import { SubscriptionType } from "@core/models/subscription-type.model";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  private title: string = null;
  private urlSegment: string = '';
  private modalType: ModalPath = null;
  private size: "sm" | "md" | "xl";
  private renderer: Renderer2;

  public cancelledItemType: SubscriptionType;
  public cancelledItemId: number;

  private modalCloseEvent$: Subject<any | null> = null;

  constructor(private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  public getCurrentModalTitle() {
    return this.title;
  }

  public getCurrentModalType() {
    return this.modalType;
  }

  public getDataForCancelSubscriptionOrOffer(id: number, type: SubscriptionType) {
    this.cancelledItemType = type;
    this.cancelledItemId = id;
  }

  public getModalSize() {
    return this.size;
  }

  public openModal$<T>(route: ModalPath, title: string = null, urlSegment: string = '', size: "sm" | "md" | "xl" = "sm"): Observable<T | null> {
    if (this.modalCloseEvent$ !== null) { // modal is opened already - we should close it before
      this.closeModal(null, () => {
        setTimeout(() => {
          this.openModal(route, title, urlSegment, size);
        }, 0);
      });
    } else { // Ok just open new modal;
      this.openModal(route, title, urlSegment, size);
    }

    return this.modalCloseEvent$.pipe(take(1));
  }

  private openModal(route: ModalPath, title: string, urlSegment: string, size: "sm" | "md" | "xl" = "sm") {
    this.title = title;
    this.size = size;
    this.urlSegment = urlSegment;
    this.modalType = route;

    this.modalCloseEvent$ = new Subject<any | null>();

    this.router.navigate([urlSegment, { outlets: { modal: `modal/${route}` } }], {
      skipLocationChange: true,
    });
  }

  public closeModal(model: any = null, runAtTheEnd: Function = null) {
    this.renderer.addClass(this.document.body, "modal-will-hide");
    setTimeout(() => {
      this.renderer.removeClass(this.document.body, "modal-shown");
      setTimeout(() => {
        this.renderer.removeClass(this.document.body, "modal-will-hide");
        this.router.navigate([this.urlSegment, { outlets: { modal: null } }], {
          skipLocationChange: true,
        });

        this.title = null;
        this.size = "sm";
        this.urlSegment = '';
        this.modalType = null;

        if (this.modalCloseEvent$ !== null) {
          this.modalCloseEvent$.next(model);
          this.modalCloseEvent$.complete();
          this.modalCloseEvent$ = null;
        }

        if (runAtTheEnd) runAtTheEnd();
      }, 350);
    }, 0);
  }
}
