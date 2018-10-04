import {
    Directive, ElementRef, HostListener, Input, NgModule, Renderer2, ChangeDetectorRef, OnInit,
    Output, EventEmitter, Optional, HostBinding, OnDestroy
} from '@angular/core';
import { useAnimation } from '@angular/animations';
import { scaleInCenter } from '../../animations/scale/index';
import { fadeOut } from '../../animations/fade/index';
import { IgxOverlayService } from '../../services/overlay/overlay';
import { HorizontalAlignment, AutoPositionStrategy, PositionSettings } from '../../services';
import { CommonModule } from '@angular/common';
import { IgxNavigationService } from '../../core/navigation';
import { IgxToggleDirective, IgxToggleActionDirective } from '../toggle/toggle.directive';

export interface ITooltipShowEventArgs {
    target: IgxTooltipTargetDirective;
    tooltip: IgxTooltipDirective;
    cancel: boolean;
}
export interface ITooltipHideEventArgs {
    target: IgxTooltipTargetDirective;
    tooltip: IgxTooltipDirective;
    cancel: boolean;
}

/**
 * **Ignite UI for Angular Tooltip Target** -
 * [Documentation](https://www.infragistics.com/products/ignite-ui-angular/angular/components/tooltip.html)
 *
 * The Ignite UI for Angular Tooltip Target directive is used to mark an HTML element in the markup as one that has a tooltip.
 * The tooltip target is used in combination with the Ignite UI for Angular Tooltip by assigning the exported tooltip reference to the
 * target's selector property.
 *
 * Example:
 * ```html
 * <button [igxTooltipTarget]="tooltipRef">Hover me</button>
 * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
 * ```
 */
@Directive({
    exportAs: 'tooltipTarget',
    selector: '[igxTooltipTarget]'
})
export class IgxTooltipTargetDirective extends IgxToggleActionDirective implements OnInit {
    /**
     * Gets/sets the amount of milliseconds that should pass before showing the tooltip.
     *
     * ```typescript
     * // get
     * let tooltipShowDelay = this.tooltipTarget.showDelay;
     * ```
     *
     * ```html
     * <!--set-->
     * <button [igxTooltipTarget]="tooltipRef" showDelay="1500">Hover me</button>
     * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
     * ```
     */
    @Input('showDelay')
    public showDelay = 500;

    /**
     * Gets/sets the amount of milliseconds that should pass before hiding the tooltip.
     *
     * ```typescript
     * // get
     * let tooltipHideDelay = this.tooltipTarget.hideDelay;
     * ```
     *
     * ```html
     * <!--set-->
     * <button [igxTooltipTarget]="tooltipRef" hideDelay="1500">Hover me</button>
     * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
     * ```
     */
    @Input('hideDelay')
    public hideDelay = 500;

    /**
     * Specifies if the tooltip should not show when hovering its target with the mouse. (defaults to false)
     * While setting this property to 'true' will disable the user interactions that shows/hides the tooltip,
     * the developer will still be able to show/hide the tooltip through the API.
     *
     * ```typescript
     * // get
     * let tooltipDisabledValue = this.tooltipTarget.tooltipDisabled;
     * ```
     *
     * ```html
     * <!--set-->
     * <button [igxTooltipTarget]="tooltipRef" [tooltipDisabled]="true">Hover me</button>
     * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
     * ```
     */
    @Input('tooltipDisabled')
    public tooltipDisabled = false;

    /**
     * @hidden
     */
    @Input('igxTooltipTarget')
    set target(target: any) {
        if (target !== null && target !== '') {
            this._target = target;
        }
    }

    /**
     * @hidden
     */
    get target(): any {
        if (typeof this._target === 'string') {
            return this._navigationService.get(this._target);
        }
        return this._target;
    }

    /**
     * Gets the respective native element of the directive.
     *
     * ```typescript
     * let tooltipTargetElement = this.tooltipTarget.nativeElement;
     * ```
     */
    public get nativeElement() {
        return this._element.nativeElement;
    }

    /**
     * Indicates if the tooltip that is is associated with this target is currently hidden.
     *
     * ```typescript
     * let tooltipHiddenValue = this.tooltipTarget.tooltipHidden;
     * ```
     */
    public get tooltipHidden(): boolean {
        return !this.target || this.target.collapsed;
    }

    /**
     * Emits an event when the tooltip that is associated with this target starts showing.
     * This event is fired before the start of the countdown to showing the tooltip.
     *
     * ```typescript
     * tooltipShowing(args: ITooltipShowEventArgs) {
     *    alert("Tooltip started showing!");
     * }
     * ```
     *
     * ```html
     * <button [igxTooltipTarget]="tooltipRef"
     *         (onTooltipShow)='tooltipShowing($event)'>Hover me</button>
     * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
     * ```
     */
    @Output()
    public onTooltipShow = new EventEmitter<ITooltipShowEventArgs>();

    /**
     * Emits an event when the tooltip that is associated with this target starts hiding.
     * This event is fired before the start of the countdown to hiding the tooltip.
     *
     * ```typescript
     * tooltipHiding(args: ITooltipHideEventArgs) {
     *    alert("Tooltip started hiding!");
     * }
     * ```
     *
     * ```html
     * <button [igxTooltipTarget]="tooltipRef"
     *         (onTooltipHide)='tooltipHiding($event)'>Hover me</button>
     * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
     * ```
     */
    @Output()
    public onTooltipHide = new EventEmitter<ITooltipHideEventArgs>();

    constructor(private _element: ElementRef,
        @Optional() private _navigationService: IgxNavigationService) {
        super(_element, _navigationService);
    }

    /**
     * @hidden
     */
    public ngOnInit() {
        super.ngOnInit();

        const positionSettings: PositionSettings = {
            target: this.nativeElement,
            horizontalDirection: HorizontalAlignment.Center,
            horizontalStartPoint: HorizontalAlignment.Center,
            openAnimation: useAnimation(scaleInCenter, { params: { duration: '150ms' } }),
            closeAnimation: useAnimation(fadeOut, { params: { duration: '75ms' } })
        };

        this._overlayDefaults.positionStrategy = new AutoPositionStrategy(positionSettings);
        this._overlayDefaults.closeOnOutsideClick = false;
    }

    private checkOutletAndOutsideClick() {
        if (this.closeOnOutsideClick !== undefined) {
            this._overlayDefaults.closeOnOutsideClick = this.closeOnOutsideClick;
        }
        if (this.outlet) {
            this._overlayDefaults.outlet = this.outlet;
        }
    }

    private get mergedOverlaySettings() {
        return Object.assign({}, this._overlayDefaults, this.overlaySettings);
    }

    // Return true if the execution in onMouseEnter should be terminated after this method
    private preMouseEnterCheck() {
        // If tooltip is about to be opened
        if (this.target.toBeShown) {
            clearTimeout(this.target.timeoutId);
            this.target.toBeShown = false;
        }

        // If Tooltip is opened or about to be hidden
        if (!this.target.collapsed || this.target.toBeHidden) {
            clearTimeout(this.target.timeoutId);

            const hidingArgs = { target: this, tooltip: this.target, cancel: false };
            this.onTooltipHide.emit(hidingArgs);

            if (hidingArgs.cancel) {
                return true;
            } else {
                this.target.close();
                this.target.toBeHidden = false;
            }
        }

        return false;
    }

    // Return true if the execution in onMouseLeave should be terminated after this method
    private preMouseLeaveCheck(): boolean {
        clearTimeout(this.target.timeoutId);

        // If tooltip is about to be opened
        if (this.target.toBeShown) {
            clearTimeout(this.target.timeoutId);
            this.target.toBeShown = false;
            this.target.toBeHidden = false;
            return true;
        }

        return false;
    }

    /**
     * @hidden
     */
    @HostListener('document:keydown.escape', ['$event'])
    public onKeydownEscape(event: KeyboardEvent) {
        const hidingArgs = { target: this, tooltip: this.target, cancel: false };
        this.onTooltipHide.emit(hidingArgs);

        if (hidingArgs.cancel) {
            return;
        }

        this.target.toBeHidden = true;
        this.target.close();
        this.target.toBeHidden = false;
    }

    /**
     * @hidden
     */
    @HostListener('click')
    public onClick() {
        return;
    }

    /**
     * @hidden
     */
    @HostListener('mouseenter')
    public onMouseEnter() {
        if (this.tooltipDisabled) {
            return;
        }

        this.checkOutletAndOutsideClick();
        const shouldReturn = this.preMouseEnterCheck();
        if (shouldReturn) {
            return;
        }

        const showingArgs = { target: this, tooltip: this.target, cancel: false };
        this.onTooltipShow.emit(showingArgs);

        if (showingArgs.cancel) {
            return;
        }

        this.target.toBeShown = true;
        this.target.timeoutId = setTimeout(() => {
            this.target.open(this.mergedOverlaySettings); // Call open() of IgxTooltipDirective
            this.target.toBeShown = false;
        }, this.showDelay);
    }

    /**
     * @hidden
     */
    @HostListener('mouseleave')
    public onMouseLeave() {
        if (this.tooltipDisabled) {
            return;
        }

        this.checkOutletAndOutsideClick();
        const shouldReturn = this.preMouseLeaveCheck();
        if (shouldReturn || this.target.collapsed) {
            return;
        }

        const hidingArgs = { target: this, tooltip: this.target, cancel: false };
        this.onTooltipHide.emit(hidingArgs);

        if (hidingArgs.cancel) {
            return;
        }

        this.target.toBeHidden = true;
        this.target.timeoutId = setTimeout(() => {
            this.target.close(); // Call close() of IgxTooltipDirective
            this.target.toBeHidden = false;
        }, this.hideDelay);
    }

    /**
     * @hidden
     */
    @HostListener('touchstart', ['$event'])
    public onTouchStart(event) {
        if (this.tooltipDisabled) {
            return;
        }

        event.preventDefault();
        this.showTooltip();
    }

    /**
     * @hidden
     */
    @HostListener('document:touchstart', ['$event'])
    public onDocumentTouchStart(event) {
        if (this.tooltipDisabled) {
            return;
        }

        if (this.nativeElement !== event.target &&
            !this.nativeElement.contains(event.target)
        ) {
            this.hideTooltip();
        }
    }

    /**
     * Shows the tooltip by respecting the 'showDelay' property.
     *
     * ```typescript
     * this.tooltipTarget.showTooltip();
     * ```
     */
    public showTooltip() {
        clearTimeout(this.target.timeoutId);

        if (!this.target.collapsed) {
            const hidingArgs = { target: this, tooltip: this.target, cancel: false };
            this.onTooltipHide.emit(hidingArgs);

            if (hidingArgs.cancel) {
                return;
            } else {
                this.target.close();
                this.target.toBeHidden = false;
            }
        }

        const showingArgs = { target: this, tooltip: this.target, cancel: false };
        this.onTooltipShow.emit(showingArgs);

        if (showingArgs.cancel) {
            return;
        }

        this.target.toBeShown = true;
        this.target.timeoutId = setTimeout(() => {
            this.target.open(this.mergedOverlaySettings); // Call open() of IgxTooltipDirective
            this.target.toBeShown = false;
        }, this.showDelay);
    }

    /**
     * Hides the tooltip by respecting the 'hideDelay' property.
     *
     * ```typescript
     * this.tooltipTarget.hideTooltip();
     * ```
     */
    public hideTooltip() {
        if (this.target.collapsed && this.target.toBeShown) {
            clearTimeout(this.target.timeoutId);
        }

        if (this.target.collapsed || this.target.toBeHidden) {
            return;
        }

        const hidingArgs = { target: this, tooltip: this.target, cancel: false };
        this.onTooltipHide.emit(hidingArgs);

        if (hidingArgs.cancel) {
            return;
        }

        this.target.toBeHidden = true;
        this.target.timeoutId = setTimeout(() => {
            this.target.close(); // Call close() of IgxTooltipDirective
            this.target.toBeHidden = false;
        }, this.hideDelay);
    }
}

let NEXT_ID = 0;
/**
 * **Ignite UI for Angular Tooltip** -
 * [Documentation](https://www.infragistics.com/products/ignite-ui-angular/angular/components/tooltip.html)
 *
 * The Ignite UI for Angular Tooltip directive is used to mark an HTML element in the markup as one that should behave as a tooltip.
 * The tooltip is used in combination with the Ignite UI for Angular Tooltip Target by assigning the exported tooltip reference to the
 * respective target's selector property.
 *
 * Example:
 * ```html
 * <button [igxTooltipTarget]="tooltipRef">Hover me</button>
 * <span #tooltipRef="tooltip" igxTooltip>Hello there, I am a tooltip!</span>
 * ```
 */
@Directive({
    exportAs: 'tooltip',
    selector: '[igxTooltip]'
})
export class IgxTooltipDirective extends IgxToggleDirective {
    /**
     * @hidden
     */
    public timeoutId;

    /**
     * @hidden
     */
    public toBeHidden = false;

    /**
     * @hidden
     */
    public toBeShown = false;

    /**
     * @hidden
     */
    @HostBinding('class.igx-tooltip--hidden')
    public get hiddenClass() {
        return this.collapsed;
    }

    /**
     * @hidden
     */
    @HostBinding('class.igx-tooltip--desktop')
    public get defaultClass() {
        return !this.collapsed;
    }

    /**
     * Gets/sets any tooltip related data.
     * The 'context' can be used for storing any information that is necessary
     * to access when working with the tooltip.
     *
     * ```typescript
     * // get
     * let tooltipContext = this.tooltip.context;
     * ```
     *
     * ```typescript
     * // set
     * this.tooltip.context = "Tooltip's context";
     * ```
     */
    @Input('context')
    public context;

    /**
     * Identifier for the tooltip.
     * If this is property is not explicitly set, it will be automatically generated.
     *
     * ```typescript
     * let tooltipId = this.tooltip.id;
     * ```
     */
    @HostBinding('attr.id')
    @Input()
    public id = `igx-tooltip-${NEXT_ID++}`;

    /**
     * Get the role attribute of the tooltip.
     *
     * ```typescript
     * let tooltipRole = this.tooltip.role;
     * ```
     */
    @HostBinding('attr.role')
    public get role() {
        return 'tooltip';
    }
}

@NgModule({
    declarations: [IgxTooltipDirective, IgxTooltipTargetDirective],
    exports: [IgxTooltipDirective, IgxTooltipTargetDirective],
    imports: [CommonModule],
    providers: [IgxOverlayService]
})
export class IgxTooltipModule { }

