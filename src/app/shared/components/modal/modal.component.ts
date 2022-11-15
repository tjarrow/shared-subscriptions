import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { DOCUMENT } from '@angular/common';

import { ModalService } from "../../services/modal/modal.service";

@Component({
  // tslint:disable-next-line: component-selector
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("scrollbarMeasure") scrollbarMeasure: ElementRef;

  public title = this.modalService.getCurrentModalTitle();
  public size = this.modalService.getModalSize();
  public alive$: Subject<void> = new Subject();
  public isShown: boolean;
  public isClickStartOnModalShadow: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private window: Window,
    private modalService: ModalService,
    public route: ActivatedRoute,
    private host: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.isShown = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.renderer.addClass(this.document.body, "modal-shown");
    }, 10);

    fromEvent(this.element, "mousedown")
      .pipe(
        filter(() => this.isShown),
        takeUntil(this.alive$)
      )
      .subscribe(() => {
        this.isClickStartOnModalShadow = true;
      });

    fromEvent(this.element, "mouseup")
      .pipe(
        filter(() => this.isShown),
        takeUntil(this.alive$)
      )
      .subscribe(() => {
        if (this.isClickStartOnModalShadow === true) {
          this.closeModal();
        }
        this.isClickStartOnModalShadow = false;
      });

    fromEvent(this.window, "keydown")
      .pipe(
        filter((keyEvent) => (<KeyboardEvent>keyEvent).key === "Escape"),
        filter(() => this.isShown),
        takeUntil(this.alive$)
      )
      .subscribe(() => {
        this.closeModal();
      });

    this._calculateScrollbarWidth();
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

  get element(): HTMLElement {
    return this.host.nativeElement;
  }

  public stopPropagation(e: MouseEvent): void {
    e.stopPropagation();
  }

  public closeModal(): void {
    this.modalService.closeModal();
  }

  private _calculateScrollbarWidth(): void {
    let scrollBarWidth = 0;
    const root = this.document.documentElement;
    const hasScrollbar = this.window.innerWidth > this.document.body.clientWidth;
    if (hasScrollbar) {
      const scrollEl = this.scrollbarMeasure.nativeElement;
      scrollBarWidth = scrollEl.offsetWidth - scrollEl.clientWidth;
    }

    root.style.setProperty("--scrollbar-width", scrollBarWidth + "px");
  }
}
