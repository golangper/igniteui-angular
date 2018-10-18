import { By } from '@angular/platform-browser';
import { IgxTreeGridComponent, IgxRowComponent } from '../tree-grid';
import { IGridBaseComponent } from '../grid-common/common/grid-interfaces';
import { IgxCheckboxComponent } from '../checkbox/checkbox.component';

// CSS class should end with a number that specified the row's level
const TREE_CELL_DIV_INDENTATION_CSS_CLASS = '.igx-grid__tree-cell--padding-level-';

const TREE_ROW_DIV_SELECTION_CHECKBOX_CSS_CLASS = '.igx-grid__cbx-selection';
const TREE_ROW_SELECTION_CSS_CLASS = 'igx-grid__tr--selected';

export class TreeGridFunctions {
    public static getAllRows(fix) {
        return fix.debugElement.queryAll(By.css('igx-tree-grid-row'));
    }

    public static getTreeCell(rowDOM) {
        return rowDOM.query(By.css('igx-tree-grid-cell'));
    }

    public static getTreeCells(fix) {
        return fix.debugElement.queryAll(By.css('igx-tree-grid-cell'));
    }

    public static getNormalCells(rowDOM) {
        return rowDOM.queryAll(By.css('igx-grid-cell'));
    }

    public static getExpansionIndicatorDiv(rowDOM) {
        const treeGridCell = TreeGridFunctions.getTreeCell(rowDOM);
        return treeGridCell.query(By.css('.igx-grid__tree-expansion-indicator'));
    }

    public static getHeaderCell(fix, columnKey) {
        const headerCells = fix.debugElement.queryAll(By.css('igx-grid-header'));
        const headerCell = headerCells.filter((cell) => cell.nativeElement.textContent.indexOf(columnKey) !== -1)[0];
        return headerCell;
    }

    public static clickHeaderCell(fix, columnKey) {
        const cell = TreeGridFunctions.getHeaderCell(fix, columnKey);
        cell.nativeElement.dispatchEvent(new Event('click'));
    }

    /**
     * Verifies that the first cell of every row is its tree cell.
    */
    public static verifyCellsPosition(rowsDOM, expectedColumnsCount) {
        rowsDOM.forEach((row) => {
            // Verify each row's cell count
            const treeCell = TreeGridFunctions.getTreeCell(row);
            const normalCells = TreeGridFunctions.getNormalCells(row);
            expect(1 + normalCells.length).toBe(expectedColumnsCount, 'incorrect cell count for a row');

            const treeCellRectRight = (<HTMLElement>treeCell.nativeElement).getBoundingClientRect().right;
            normalCells.forEach((normalCell) => {
                // Verify that the treeCell is the first cell (on the left of all the other cells)
                const normalCellRectLeft = (<HTMLElement>normalCell.nativeElement).getBoundingClientRect().left;
                expect(treeCellRectRight <= normalCellRectLeft).toBe(true, 'TreeCell is not on the left of a normal cell.');
            });
        });
    }

    /**
     * Verifies both the RowComponent and the respective DOM Row are with the expected indentation level.
    */
    public static verifyRowIndentationLevel(rowComponent, rowDOM, expectedIndentationLevel) {
        const treeCell = TreeGridFunctions.getTreeCell(rowDOM);
        const divChildren = treeCell.queryAll(By.css('div'));

        // If 'expectedIndentationLevel' is 0, we expect the row to be a root level row
        // and thus it has no indentation div.
        const indentationDiv = treeCell.query(By.css(TREE_CELL_DIV_INDENTATION_CSS_CLASS + expectedIndentationLevel));
        if (expectedIndentationLevel === 0) {
            expect(divChildren.length).toBe(2, 'root treeCell has incorrect divs count');
            expect(indentationDiv).toBeNull();
        } else {
            expect(divChildren.length).toBe(3, 'child treeCell has incorrect divs count');
            expect(indentationDiv).toBeDefined();
            expect(indentationDiv).not.toBeNull();
        }

        // Verify rowComponent's indentation API.
        expect(rowComponent.indentation).toBe(expectedIndentationLevel);

        // Verify expand/collapse icon's position.
        TreeGridFunctions.verifyTreeRowIconPosition(rowDOM, expectedIndentationLevel);
    }

    /**
     * Verifies both the RowComponent and the respective DOM Row are with the expected indentation level.
     * The rowIndex is the index of the row in ascending order (if rowIndex is 0, then the top-most row in view will be verified).
    */
    public static verifyRowIndentationLevelByIndex(fix, rowIndex, expectedIndentationLevel) {
        const treeGrid = fix.debugElement.query(By.css('igx-tree-grid')).componentInstance as IgxTreeGridComponent;
        const rowComponent = treeGrid.getRowByIndex(rowIndex);
        const rowDOM = TreeGridFunctions.sortElementsVertically(TreeGridFunctions.getAllRows(fix))[rowIndex];
        TreeGridFunctions.verifyRowIndentationLevel(rowComponent, rowDOM, expectedIndentationLevel);
    }

    /**
     * Verifies that the specified column is the tree column, that contains the tree cells.
    */
    public static verifyTreeColumn(fix, expectedTreeColumnKey, expectedColumnsCount) {
        const headerCell = TreeGridFunctions.getHeaderCell(fix, expectedTreeColumnKey);
        const treeCells = TreeGridFunctions.getTreeCells(fix);
        const rows = TreeGridFunctions.getAllRows(fix);

        // Verify the tree cells are first (on the left) in comparison to the rest of the cells.
        TreeGridFunctions.verifyCellsPosition(rows, expectedColumnsCount);

        // Verify the tree cells are exactly under the respective header cell.
        const headerCellRect = (<HTMLElement>headerCell.nativeElement).getBoundingClientRect();
        treeCells.forEach(treeCell => {
            const treeCellRect = (<HTMLElement>treeCell.nativeElement).getBoundingClientRect();
            expect(headerCellRect.bottom <= treeCellRect.top).toBe(true, 'headerCell is not on top of a treeCell');
            expect(headerCellRect.left).toBe(treeCellRect.left, 'headerCell and treeCell are not left-aligned');
            expect(headerCellRect.right).toBe(treeCellRect.right, 'headerCell and treeCell are not right-aligned');
        });
    }

    public static sortElementsVertically(arr) {
        return arr.sort((a, b) =>
            (<HTMLElement>a.nativeElement).getBoundingClientRect().top - (<HTMLElement>b.nativeElement).getBoundingClientRect().top);
    }

    public static verifyTreeRowHasCollapsedIcon(treeRowDOM) {
        const indicatorDiv = TreeGridFunctions.getExpansionIndicatorDiv(treeRowDOM);
        const igxIcon = indicatorDiv.query(By.css('igx-icon'));
        expect(igxIcon.nativeElement.textContent).toEqual('chevron_right');
    }

    public static verifyTreeRowHasExpandedIcon(treeRowDOM) {
        const indicatorDiv = TreeGridFunctions.getExpansionIndicatorDiv(treeRowDOM);
        const igxIcon = indicatorDiv.query(By.css('igx-icon'));
        expect(igxIcon.nativeElement.textContent).toEqual('expand_more');
    }

    public static verifyTreeRowIconPosition(treeRowDOM, indentationLevel) {
        const treeCell = TreeGridFunctions.getTreeCell(treeRowDOM);
        const treeCellPaddingLeft = parseInt(window.getComputedStyle(<HTMLElement>treeCell.nativeElement).paddingLeft, 10);
        const treeCellRect = (<HTMLElement>treeCell.nativeElement).getBoundingClientRect();

        let indentation = 0;
        if (indentationLevel !== 0) {
            const indentationDiv = treeCell.query(By.css(TREE_CELL_DIV_INDENTATION_CSS_CLASS + indentationLevel));
            const indentationDivRect = (<HTMLElement>indentationDiv.nativeElement).getBoundingClientRect();
            indentation = indentationDivRect.width;
        }

        const iconDiv = TreeGridFunctions.getExpansionIndicatorDiv(treeRowDOM);
        const iconDivRect = (<HTMLElement>iconDiv.nativeElement).getBoundingClientRect();
        expect((iconDivRect.left - (treeCellRect.left + treeCellPaddingLeft + indentation)) < 2)
            .toBe(true, 'TreeRow icon has incorrect position');
    }

    /**
     * Returns true if a tree-grid row is 'grayed out' because of filtering
     */
    public static checkRowIsGrayedOut(row: IgxRowComponent<IGridBaseComponent>): boolean {
        return row.nativeElement.classList.contains('igx-grid__tr--filtered');
    }

    /**
     * Returns true if a tree-grid row is NOT 'grayed out' because of filtering
     */
    public static checkRowIsNotGrayedOut(row: IgxRowComponent<IGridBaseComponent>): boolean {
        return !row.nativeElement.classList.contains('igx-grid__tr--filtered');
    }

    /**
     * Verifies the selection of both the RowComponent and the respective DOM Row.
    */
    public static verifyTreeRowSelection(treeGridComponent, rowComponent, rowDOM, expectedSelection: boolean) {
        // Verfiy selection of checkbox
        const checkboxDiv = rowDOM.query(By.css(TREE_ROW_DIV_SELECTION_CHECKBOX_CSS_CLASS));
        const checkboxComponent = checkboxDiv.query(By.css('igx-checkbox')).componentInstance as IgxCheckboxComponent;
        expect(checkboxComponent.checked).toBe(expectedSelection, 'Incorrect checkbox selection state');
        expect(checkboxComponent.nativeCheckbox.nativeElement.checked).toBe(expectedSelection, 'Incorrect native checkbox selection state');

        // Verify selection of row
        expect(rowComponent.isSelected).toBe(expectedSelection, 'Incorrect row selection state');
        expect((<HTMLElement>rowDOM.nativeElement).classList.contains(TREE_ROW_SELECTION_CSS_CLASS)).toBe(expectedSelection);

        // Verify selection of row through treeGrid
        const selectedRows = (treeGridComponent as IgxTreeGridComponent).selectedRows();
        expect(selectedRows.includes(rowComponent.rowID)).toBe(expectedSelection);
    }

    /**
     * Verifies the selection of both the RowComponent and the respective DOM Row.
     * The rowIndex is the index of the row in ascending order (if rowIndex is 0, then the top-most row in view will be verified).
    */
    public static verifyTreeRowSelectionByIndex(fix, rowIndex, expectedSelection: boolean) {
        const treeGrid = fix.debugElement.query(By.css('igx-tree-grid')).componentInstance as IgxTreeGridComponent;
        const rowComponent = treeGrid.getRowByIndex(rowIndex);
        const rowDOM = TreeGridFunctions.sortElementsVertically(TreeGridFunctions.getAllRows(fix))[rowIndex];
        TreeGridFunctions.verifyTreeRowSelection(treeGrid, rowComponent, rowDOM, expectedSelection);
    }

    /**
     * Verifies the selection of the treeGrid rows.
     * Every index of the provided array is the index of the respective row in ascending order
     * (if rowIndex is 0, then the top-most row in view will be verified).
    */
    public static verifyAllRowsSelection(fix, expectedSelectedRowIndices: any[], expectedSelection: boolean) {
        if (expectedSelection) {
            const treeGrid = fix.debugElement.query(By.css('igx-tree-grid')).componentInstance as IgxTreeGridComponent;
            expect(treeGrid.selectedRows().length).toBe(expectedSelectedRowIndices.length, 'Incorrect number of rows that are selected.');
        }

        expectedSelectedRowIndices.forEach(rowIndex => {
            TreeGridFunctions.verifyTreeRowSelectionByIndex(fix, rowIndex, expectedSelection);
        });
    }
}
