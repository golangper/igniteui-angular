import { Pipe, PipeTransform } from '@angular/core';
import { cloneArray } from '../core/utils';
import { DataUtil } from '../data-operations/data-util';
import { IGroupByExpandState } from '../data-operations/groupby-expand-state.interface';
import { IGroupByResult } from '../data-operations/sorting-strategy';
import { IFilteringExpressionsTree } from '../data-operations/filtering-expressions-tree';
import { ISortingExpression } from '../data-operations/sorting-expression.interface';
import { IgxGridAPIService } from './api.service';
import { IgxGridComponent } from './grid.component';

/**
 *@hidden
 */
@Pipe({
    name: 'gridSort',
    pure: true
})
export class IgxGridSortingPipe implements PipeTransform {

    constructor(private gridAPI: IgxGridAPIService) { }

    public transform(collection: any[], expressions: ISortingExpression | ISortingExpression[],
        id: string, pipeTrigger: number): any[] {

        const state = { expressions: [] };
        state.expressions = this.gridAPI.get(id).sortingExpressions;

        if (!state.expressions.length) {
            return collection;
        }

        return DataUtil.sort(cloneArray(collection), state);
    }
}

/**
 *@hidden
 */
@Pipe({
    name: 'gridPreGroupBy',
    pure: true
})
export class IgxGridPreGroupingPipe implements PipeTransform {

    constructor(private gridAPI: IgxGridAPIService) { }

    public transform(collection: any[], expression: ISortingExpression | ISortingExpression[],
        expansion: IGroupByExpandState | IGroupByExpandState[], defaultExpanded: boolean,
        id: string, pipeTrigger: number): IGroupByResult {

        const state = { expressions: [], expansion: [], defaultExpanded };
        const grid: IgxGridComponent = this.gridAPI.get(id);
        state.expressions = grid.groupingExpressions;

        if (!state.expressions.length) {
            return {
                data: collection,
                metadata: collection
            };
        }

        state.expansion = grid.groupingExpansionState;
        state.defaultExpanded = grid.groupsExpanded;

        return DataUtil.group(cloneArray(collection), state);
    }
}

/**
 *@hidden
 */
@Pipe({
    name: 'gridPostGroupBy',
    pure: true
})
export class IgxGridPostGroupingPipe implements PipeTransform {

    constructor(private gridAPI: IgxGridAPIService) { }

    public transform(collection: IGroupByResult, expression: ISortingExpression | ISortingExpression[],
        expansion: IGroupByExpandState | IGroupByExpandState[], defaultExpanded: boolean,
        id: string, groupsRecords: any[], pipeTrigger: number): any[] {

        const state = { expressions: [], expansion: [], defaultExpanded };
        const grid: IgxGridComponent = this.gridAPI.get(id);
        state.expressions = grid.groupingExpressions;

        if (!state.expressions.length) {
            return collection.data;
        }

        state.expansion = grid.groupingExpansionState;
        state.defaultExpanded = grid.groupsExpanded;

        return DataUtil.restoreGroups({
            data: cloneArray(collection.data),
            metadata: cloneArray(collection.metadata)
        }, state, groupsRecords);
    }
}

/**
 *@hidden
 */
@Pipe({
    name: 'gridPaging',
    pure: true
})
export class IgxGridPagingPipe implements PipeTransform {

    constructor(private gridAPI: IgxGridAPIService) { }

    public transform(collection: IGroupByResult, page = 0, perPage = 15, id: string, pipeTrigger: number): IGroupByResult {

        if (!this.gridAPI.get(id).paging) {
            return collection;
        }

        const state = {
            index: page,
            recordsPerPage: perPage
        };

        const result: IGroupByResult = {
            data: DataUtil.page(cloneArray(collection.data), state),
            metadata: DataUtil.page(cloneArray(collection.metadata), state)
        };
        this.gridAPI.get(id).pagingState = state;
        return result;
    }
}

/**
 *@hidden
 */
@Pipe({
    name: 'gridFiltering',
    pure: true
})
export class IgxGridFilteringPipe implements PipeTransform {

    constructor(private gridAPI: IgxGridAPIService) { }

    public transform(collection: any[], expressionsTree: IFilteringExpressionsTree,
        id: string, pipeTrigger: number) {
        const grid = this.gridAPI.get(id);
        const state = { expressionsTree: expressionsTree };

        if (!state.expressionsTree ||
            !state.expressionsTree.filteringOperands ||
            state.expressionsTree.filteringOperands.length === 0) {
            return collection;
        }

        const result = DataUtil.filter(cloneArray(collection), state);
        grid.filteredData = result;
        return result;
    }
}

/**
 *@hidden
 */
@Pipe({
    name: 'filterCondition',
    pure: true
})
export class IgxGridFilterConditionPipe implements PipeTransform {

    public transform(value: string): string {
        return value.split(/(?=[A-Z])/).join(' ');
    }
}

@Pipe({
    name: 'gridTransaction',
    pure: true
})
export class IgxGridTransactionPipe implements PipeTransform {

    constructor(private gridAPI: IgxGridAPIService) { }

    transform(collection: any[], id: string, pipeTrigger: number) {
        const grid: IgxGridComponent = this.gridAPI.get(id);

        if (collection && grid.transactions.enabled) {
            const result = DataUtil.mergeTransactions(
                cloneArray(collection, true),
                grid.transactions.aggregatedState(true),
                grid.primaryKey);
            return result;
        }
        return collection;
    }
}
