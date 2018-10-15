import { Pipe, PipeTransform } from '@angular/core';
import { cloneArray } from '../core/utils';
import { DataUtil } from '../data-operations/data-util';
import { IGridBaseComponent } from '../grid-common/common/grid-interfaces';
import { GridBaseAPIService } from '../grid-common/api.service';
import { IgxTreeGridComponent } from './tree-grid.component';
import { IFilteringExpressionsTree } from '../data-operations/filtering-expressions-tree';
import { BaseFilteringStrategy } from '../data-operations/filtering-strategy';
import { IFilteringState } from '../data-operations/filtering-state.interface';
import { ITreeGridRecord } from './tree-grid.pipes';

export class TreeGridFilteringStrategy extends BaseFilteringStrategy {
    public filter(data: ITreeGridRecord[], expressionsTree: IFilteringExpressionsTree): ITreeGridRecord[] {
        return this.filterImpl(data, expressionsTree, undefined);
    }

    private filterImpl(data: ITreeGridRecord[], expressionsTree: IFilteringExpressionsTree, parent: ITreeGridRecord): ITreeGridRecord[] {
        let i;
        let rec: ITreeGridRecord;
        const len = data.length;
        const res: ITreeGridRecord[] = [];
        if (!expressionsTree || !expressionsTree.filteringOperands || expressionsTree.filteringOperands.length === 0 || !len) {
            return data;
        }
        for (i = 0; i < len; i++) {
            rec = DataUtil.cloneHierarchicalRecord(data[i]);
            rec.parent = parent;
            if (rec.children) {
                const filteredChildren = this.filterImpl(rec.children, expressionsTree, rec);
                rec.children = filteredChildren.length > 0 ? filteredChildren : null;
            }

            if (this.matchRecord(rec, expressionsTree)) {
                res.push(rec);
            } else if (rec.children && rec.children.length > 0) {
                rec.isFilteredOutParent = true;
                res.push(rec);
            }
        }
        return res;
    }

    protected getFieldValue(rec: object, fieldName: string): any {
        const hierarchicalRecord = <ITreeGridRecord>rec;
        return hierarchicalRecord.data[fieldName];
    }
}

@Pipe({
    name: 'treeGridFiltering',
    pure: true
})
export class IgxTreeGridFilteringPipe implements PipeTransform {

    constructor(private gridAPI: GridBaseAPIService<IGridBaseComponent>) { }

    public transform(hierarchyData: ITreeGridRecord[], expressionsTree: IFilteringExpressionsTree,
        id: string, pipeTrigger: number): ITreeGridRecord[] {
        const state = { expressionsTree: expressionsTree };

        if (!state.expressionsTree ||
            !state.expressionsTree.filteringOperands ||
            state.expressionsTree.filteringOperands.length === 0) {
            return hierarchyData;
        }

        DataUtil.mergeDefaultProperties(state, { strategy: new TreeGridFilteringStrategy() });

        const result = this.filter(hierarchyData, state);
        // grid.filteredData = result;
        return result;
    }

    public filter(data: ITreeGridRecord[], state: IFilteringState): ITreeGridRecord[] {
        return state.strategy.filter(data, state.expressionsTree);
    }
}
