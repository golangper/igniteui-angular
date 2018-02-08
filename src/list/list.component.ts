import { CommonModule } from "@angular/common";
import {
	Component,
	ContentChildren,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostBinding,
	Inject,
	Input,
	NgModule,
	Output,
	QueryList,
	ViewChild,
	ChangeDetectionStrategy,
	TemplateRef,
	ContentChild,
} from "@angular/core";

import { IgxRippleModule } from "../directives/ripple.directive";
import { IgxEmptyListTemplateDirective } from "./list.common"
import { IgxListItem } from "./list-item.component"

// ====================== LIST ================================
// The `<igx-list>` directive is a list container for items and headers
@Component({
	host: {
		role: "list"
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: "igx-list",
	styleUrls: ["./list.component.scss"],
	templateUrl: "list.component.html"
})
export class IgxList {
	@ContentChildren(forwardRef(() => IgxListItem)) public children: QueryList<IgxListItem>;

	@Input() public allowLeftPanning: boolean = false;
	@Input() public allowRightPanning: boolean = false;

	@ContentChild(IgxEmptyListTemplateDirective, { read: IgxEmptyListTemplateDirective })
	public emptyListTemplate: IgxEmptyListTemplateDirective;

	@ViewChild("defaultEmptyList", { read: TemplateRef })
	protected defaultEmptyListTemplate: TemplateRef<any>;

	@Output() public onLeftPan = new EventEmitter();
	@Output() public onRightPan = new EventEmitter();
	@Output() public onPanStateChange = new EventEmitter();

	@Output() public onItemClicked = new EventEmitter();
	@Output() public onSelectionChanged = new EventEmitter();

	constructor(private element: ElementRef) {
	}

	@HostBinding("class")
	public get innerStyle(): string {
		return "igx-list";
	}

	public get items(): IgxListItem[] {
		const items: IgxListItem[] = [];
		if (this.children !== undefined) {
			for (const child of this.children.toArray()) {
				if (!child.isHeader) {
					items.push(child);
				}
			}
		}

		return items;
	}

	public get headers(): IgxListItem[] {
		const headers: IgxListItem[] = [];
		if (this.children !== undefined) {
			for (const child of this.children.toArray()) {
				if (child.isHeader) {
					headers.push(child);
				}
			}
		}

		return headers;
	}

	get context(): any {
		return {
			$implicit: this
		};
	}

	get template() : TemplateRef<any> {
		return this.emptyListTemplate ? this.emptyListTemplate.template : this.defaultEmptyListTemplate;
	}
}

@NgModule({
	declarations: [IgxList, IgxListItem, IgxEmptyListTemplateDirective],
	exports: [IgxList, IgxListItem, IgxEmptyListTemplateDirective],
	imports: [CommonModule, IgxRippleModule]
})
export class IgxListModule {
}