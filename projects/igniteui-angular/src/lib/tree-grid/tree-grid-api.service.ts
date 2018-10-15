import { GridBaseAPIService } from '../grid-common/api.service';
import { IgxTreeGridComponent } from './tree-grid.component';

import { cloneArray } from '../core/utils';
import { DataUtil } from '../data-operations/data-util';
import { ISortingExpression, SortingDirection } from '../data-operations/sorting-expression.interface';
import { ITreeGridRecord } from './tree-grid.pipes';

export class IgxTreeGridAPIService extends GridBaseAPIService<IgxTreeGridComponent> {
    public on_after_content_init(id: string) {
        // const grid = this.get(id);
        // if (grid.groupTemplate) {
        //     grid.groupRowTemplate = grid.groupTemplate.template;
        // }

        super.on_after_content_init(id);
    }

    public get_tree_grid_record(id: string, rowID: any): ITreeGridRecord {
        const grid = this.get(id);
        return grid.treeGridRecordsMap.get(rowID);
    }

    public expand_row(id: string, rowID: any) {
        const grid = this.get(id);
        const expandedStates = grid.expandedStates;
        expandedStates.set(rowID, true);
        grid.expandedStates = expandedStates;
    }

    public collapse_row(id: string, rowID: any) {
        const grid = this.get(id);
        const expandedStates = grid.expandedStates;
        expandedStates.set(rowID, false);
        grid.expandedStates = expandedStates;
    }

    public toggle_row_expansion(id: string, rowID: any) {
        const grid = this.get(id);
        const expandedStates = grid.expandedStates;
        const treeRecord = this.get_tree_grid_record(id, rowID);

        if (treeRecord) {
            expandedStates.set(rowID, !treeRecord.expanded);
            grid.expandedStates = expandedStates;
        }
    }

    public get_row_expansion_state(id: string, rowID: any, indentationLevel: number): boolean {
        const grid = this.get(id);
        const states = grid.expandedStates;
        const expanded = states.get(rowID);

        if (expanded !== undefined) {
            return expanded;
        } else {
            return indentationLevel < grid.expandedLevels;
        }
    }
}
