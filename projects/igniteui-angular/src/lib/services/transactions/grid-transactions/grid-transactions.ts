import { Type } from '@angular/core';
import { IgxTransactionService, TransactionState, TransactionType } from './../transaction';

export interface RowTransactionState {
    rowID: string;
    type: TransactionType;
    log: Map<any, CellTransactionState[]>;
}

export interface CellTransactionState {
    cellID: any;
    currentValue;
}

export class IgxGridTransactionService extends IgxTransactionService {
    private _gridTransactions: Map<any, RowTransactionState> = new Map<any, RowTransactionState>();

    public add(state: TransactionState) {
        let rowID;
        super.add(state);

        switch (state.type) {
            case TransactionType.UPDATE:
                rowID = state.id.rowID;
                let gridTrans = this._gridTransactions.get(rowID);

                if (!gridTrans) {
                    const rowTransactionState = {rowID: rowID, type: state.type, log: new Map<any, CellTransactionState[]>()};
                    this._gridTransactions.set(rowID, rowTransactionState);
                    gridTrans = this._gridTransactions.get(rowID);
                }
                if (!gridTrans.log.has(state.id)) {
                    gridTrans.log.set(state.id, []);
                }
                const cellState: CellTransactionState = { cellID: state.id, currentValue: state.newValue };
                gridTrans.log.get(state.id).push(cellState);

                break;
        }
    }
}
