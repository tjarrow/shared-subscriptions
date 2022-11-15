import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { SwiperConfigInterface, SwiperPaginationInterface, SwiperNavigationInterface, SwiperComponent } from 'ngx-swiper-wrapper';
import { Store, Select } from '@ngxs/store';
import { Service } from "@core/models/service.model";
import { GetServices } from '@store/app/app.actions';
import { AppGetterState } from '@store/app/app-getter.state';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  public isSwiperReady: boolean;
  public swiperIndex: number = 0;
  public swiperConfig: SwiperConfigInterface;
  private navigation: SwiperNavigationInterface = {
    nextEl: '.slider__navbutton--next',
    prevEl: '.slider__navbutton--prev',
    disabledClass: 'slider__navbutton--disabled'
  };

  private pagination: SwiperPaginationInterface = {
    el: '.slider__pagination',
    clickable: true,
    bulletElement: 'button',
    bulletClass: 'slider__bullet',
    bulletActiveClass: 'slider__bullet--active'
  };
  public services: Service[];
  public alive$: Subject<void> = new Subject();

  @Select(AppGetterState.isServicesLoading) isLoading$: Observable<boolean>;
  @Select(AppGetterState.servicesLoadedError) serviceLoadedError$: Observable<any>;

  @ViewChild(SwiperComponent) swiperRef: SwiperComponent;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetServices())
    .pipe(
      takeUntil(this.alive$),
      mergeMap(() => this.store.select(AppGetterState.servicesInfo))
    ).subscribe(services => {
      this.services = services;
    });

    this.swiperConfig = {
      direction: 'horizontal',
      slidesPerView: 'auto',
      spaceBetween: 24,
      centeredSlides: true,
      centerInsufficientSlides: true,
      keyboard: true,
      loop: false,
      mousewheel: false,
      scrollbar: false,
      navigation: this.navigation,
      pagination: this.pagination,
      autoplay: {
        delay: 3000
      },
      breakpoints: {
        1239: {
          slidesPerView: 4,
          centeredSlides: false
        }
      }
    };
  }

  ngOnDestroy(): void {
    this.alive$.next();
    this.alive$.complete();
  }

  handleSwiperInit() {
    const swiper = this.swiperRef.directiveRef.swiper();
    if (swiper.currentBreakpoint == 1239 && swiper.slides.length <= 4) {
      swiper.allowSlidePrev = false;
      swiper.allowSlideNext = false;
    }
    this.isSwiperReady = true;
  }

  stopAutoplay() {
    if (this.swiperRef) {
      this.swiperRef.directiveRef.stopAutoplay();
    }
  }

  startAutoplay() {
    if (this.swiperRef) {
      this.swiperRef.directiveRef.startAutoplay();
    }
  }

}
