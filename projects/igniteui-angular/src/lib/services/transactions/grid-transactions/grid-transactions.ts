import { IgxTransactionService, TransactionState, TransactionType } from './../transaction';

export interface RowTransactionState {
    rowID: any;
    cells: {};
}

export interface CellTransactionState {
    cellID: any;
    currentValue;
}

export class IgxGridTransactionService extends IgxTransactionService {
    private _gridTransactions: RowTransactionState[] = [];

    public add(state: TransactionState) {
        let rowID;
        super.add(state);

        switch (state.type) {
            case TransactionType.UPDATE:
                rowID = state.id.rowID;
                let row = this._gridTransactions[rowID];

                if (!row) {
                    this._gridTransactions[rowID] = { rowID: rowID, cells: {} };
                    row = this._gridTransactions[rowID];
                }

                row.cells[state.context.column.field] = state.newValue;

                break;
        }
    }

    public getRowTransactionByID(id: string) {
        return this._gridTransactions[id];
    }
}
