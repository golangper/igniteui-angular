import {
    QueryList,
    ChangeDetectorRef,
    EventEmitter,
    TemplateRef,
    IterableDiffers,
    ElementRef,
    NgZone,
    ComponentFactoryResolver,
    ViewContainerRef
} from '@angular/core';

import { IgxOverlayOutletDirective } from '../../directives/toggle/toggle.directive';

import { ISortingExpression } from '../../data-operations/sorting-expression.interface';
import { IFilteringExpressionsTree } from '../../data-operations/filtering-expressions-tree';
import { IFilteringOperation } from '../../data-operations/filtering-condition';

import { IgxCheckboxComponent } from '../../checkbox/checkbox.component';

import { IgxGridCellComponent } from '../cell.component';
import { IgxColumnComponent } from '../column.component';
import { IgxGridHeaderComponent } from '../grid-header.component';
import { IgxRowComponent } from '../row.component';

import { IgxBaseExporter, IgxExporterOptionsBase } from '../../services';
import { IgxForOfDirective } from '../../directives/for-of/for_of.directive';

import { DisplayDensity } from '../../core/utils';
import { IgxSelectionAPIService } from '../../core/selection';

import { DropPosition } from './grid-common.misc';

export interface IGridCellEventArgs {
    cell: IgxGridCellComponent;
    event: Event;
}

export interface IGridEditEventArgs {
    row: IgxRowComponent<IGridComponent>;
    cell: IgxGridCellComponent;
    currentValue: any;
    newValue: any;
}

export interface IPinColumnEventArgs {
    column: IgxColumnComponent;
    insertAtIndex: number;
}

export interface IPageEventArgs {
    previous: number;
    current: number;
}

export interface IRowDataEventArgs {
    data: any;
}

export interface IColumnResizeEventArgs {
    column: IgxColumnComponent;
    prevWidth: string;
    newWidth: string;
}

export interface IRowSelectionEventArgs {
    oldSelection: any[];
    newSelection: any[];
    row?: IgxRowComponent<IGridComponent>;
    event?: Event;
}

export interface ISearchInfo {
    searchText: string;
    caseSensitive: boolean;
    exactMatch: boolean;
    activeMatchIndex: number;
    matchInfoCache: any[];
}

export interface IGridToolbarExportEventArgs {
    grid: IGridComponent;
    exporter: IgxBaseExporter;
    options: IgxExporterOptionsBase;
    cancel: boolean;
}

export interface IColumnMovingStartEventArgs {
    source: IgxColumnComponent;
}

export interface IColumnMovingEventArgs {
    source: IgxColumnComponent;
    cancel: boolean;
}

export interface IColumnMovingEndEventArgs {
    source: IgxColumnComponent;
    target: IgxColumnComponent;
    cancel: boolean;
}

export interface IColumnVisibilityChangedEventArgs {
    column: any;
    newValue: boolean;
}

export interface IGridComponent {
    id: string;
    nativeElement: any;
    cdr: ChangeDetectorRef;
    selection: IgxSelectionAPIService;
    pipeTrigger: number;
    template: TemplateRef<any>;
    emptyGridTemplate: TemplateRef<any>;
    columns: IgxColumnComponent[];
    columnList: QueryList<IgxColumnComponent>;
    differs: IterableDiffers;
    columnListDiffer: any;
    autoGenerate: boolean;
    data: any[];
    filteredSortedData: any[];
    primaryKey: string;
    rowList: QueryList<any>;
    dataRowList: QueryList<IgxRowComponent<IGridComponent>>;
    sortingExpressions: ISortingExpression[];
    paging: boolean;
    page: number;
    perPage: number;
    isLastPage: boolean;
    isFirstPage: boolean;
    totalPages: number;
    pagingState: any;
    filteringExpressionsTree: IFilteringExpressionsTree;
    lastSearchInfo: ISearchInfo;
    summaries: ElementRef;
    summariesHeight: number;
    hasSummarizedColumns: boolean;
    hasMovableColumns: boolean;
    pinnedColumns: IgxColumnComponent[];
    unpinnedColumns: IgxColumnComponent[];
    pinnedColumnsText: string;
    visibleColumns: IgxColumnComponent[];
    headerList: QueryList<IgxGridHeaderComponent>;
    draggedColumn: IgxColumnComponent;
    isColumnResizing: boolean;
    isColumnMoving: boolean;
    evenRowCSS: string;
    oddRowCSS: string;
    displayDensity: DisplayDensity | string;
    outletDirective: IgxOverlayOutletDirective;
    hiddenColumnsCount: number;
    hiddenColumnsText: string;
    columnHiding: boolean;
    columnPinning: boolean;
    filteredData: any[];
    rowSelectable: boolean;
    allRowsSelected: boolean;
    unpinnedWidth: number;
    calcHeight: number;
    calcWidth: number;
    calcRowCheckboxWidth: number;
    calcPinnedContainerMaxWidth: number;
    tfootHeight: number;
    rowHeight: number;
    columnWidth: string;
    columnWidthSetByUser: boolean;
    defaultRowHeight: number;
    width: string;
    height: string;
    verticalScrollContainer: IgxForOfDirective<any>;
    parentVirtDir: IgxForOfDirective<any>;
    headerContainer: IgxForOfDirective<any>;
    showToolbar: boolean;
    toolbarHtml: ElementRef;
    tfoot: ElementRef;
    exportExcel: boolean;
    exportCsv: boolean;
    toolbarTitle: string;
    exportText: string;
    exportExcelText: string;
    exportCsvText: string;
    columnHidingTitle: string;
    columnPinningTitle: string;
    maxLevelHeaderDepth: number;
    theadRow: ElementRef;
    zone: NgZone;
    document: Document;
    resolver: ComponentFactoryResolver;
    viewRef: ViewContainerRef;
    paginator: ElementRef;
    headerCheckboxContainer: ElementRef;
    headerCheckbox: IgxCheckboxComponent;
    scr: ElementRef;
    hasColumnGroups: boolean;
    totalItemCount: number;
    // TODO check if it can be passed to the API service
    ngAfterViewInitPassed: boolean;
    unpinnedAreaMinWidth: number;
    dropAreaVisible: boolean;

    // Events
    onCellClick: EventEmitter<IGridCellEventArgs>;
    onSelection: EventEmitter<IGridCellEventArgs>;
    onRowSelectionChange: EventEmitter<IRowSelectionEventArgs>;
    onColumnPinning: EventEmitter<IPinColumnEventArgs>;
    onEditDone: EventEmitter<IGridEditEventArgs>;
    onColumnInit: EventEmitter<IgxColumnComponent>;
    onSortingDone: EventEmitter<ISortingExpression>;
    onFilteringDone: EventEmitter<IFilteringExpressionsTree>;
    onPagingDone: EventEmitter<IPageEventArgs>;
    onRowAdded: EventEmitter<IRowDataEventArgs>;
    onRowDeleted: EventEmitter<IRowDataEventArgs>;
    onDataPreLoad: EventEmitter<any>;
    onColumnResized: EventEmitter<IColumnResizeEventArgs>;
    onContextMenu: EventEmitter<IGridCellEventArgs>;
    onDoubleClick: EventEmitter<IGridCellEventArgs>;
    onColumnVisibilityChanged: EventEmitter<IColumnVisibilityChangedEventArgs>;
    onColumnMovingStart: EventEmitter<IColumnMovingStartEventArgs>;
    onColumnMoving: EventEmitter<IColumnMovingEventArgs>;
    onColumnMovingEnd: EventEmitter<IColumnMovingEndEventArgs>;
    // TODO check densitiyChanged.
    onDensityChanged: EventEmitter<any>;
    onToolbarExporting: EventEmitter<IGridToolbarExportEventArgs>;

    // Methods
    reflow();
    markForCheck();
    deselectRows(rowIDs: any[]);
    selectRows(rowIDs: any[], clearCurrentSelection?: boolean);
    getPinnedWidth(takeHidden?: boolean);
    moveColumn(column: IgxColumnComponent, dropTarget: IgxColumnComponent, pos?: DropPosition);
    getCellByKey(rowSelector: any, columnField: string);
    trackColumnChanges(index, col);
    checkHeaderCheckboxStatus(headerStatus?: boolean);
    toggleColumnVisibility(args: IColumnVisibilityChangedEventArgs);
    clearFilter(name?: string);
    filter(name: string, value: any, conditionOrExpressionTree?: IFilteringOperation | IFilteringExpressionsTree, ignoreCase?: boolean);
    filterGlobal(value: any, condition?, ignoreCase?: boolean);
    clearSummaryCache(editCell?: IGridEditEventArgs);
    selectedRows(): any[];
    selectRows(rowIDs: any[], clearCurrentSelection?: boolean);
    deselectRows(rowIDs: any[]);
    selectAllRows();
    deselectAllRows();
    triggerRowSelectionChange(newSelectionAsSet: Set<any>,
        row?: IgxRowComponent<IGridComponent>, event?: Event, headerStatus?: boolean);
    scrollTo(row: any, column: any);
    focusNextCell(rowIndex: number, columnIndex: number, dir?: string, event?);
    navigateDown(rowIndex: number, columnIndex: number, event?);
    navigateUp(rowIndex: number, columnIndex: number, event?);
    scrollHandler(event);
    enableSummaries(...rest);
}