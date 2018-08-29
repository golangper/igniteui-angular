import { IgxTransactionService, Transaction, TransactionType } from './../transaction';

export interface RowTransactionState {
    type: TransactionType;
    rowID: any;
    cells: {};
}

export class IgxGridTransactionService extends IgxTransactionService {
    private _gridTransactions: Map<any, RowTransactionState> = new Map();

    public add(transaction: Transaction) {
        let rowID;
        super.add(transaction);

        switch (transaction.type) {
            case TransactionType.UPDATE:
                rowID = transaction.id.rowID;
                if (!this._gridTransactions.has(transaction.id.rowID)) {
                    this._gridTransactions.set(transaction.id.rowID, { type: transaction.type, rowID: rowID, cells: {} });
                }

                const rowTransactionState = this._gridTransactions.get(rowID);
                if (rowTransactionState.type !== TransactionType.DELETE) {
                    this._gridTransactions.get(rowID).cells[transaction.context.column.field] = transaction.newValue;
                }
                break;
            case TransactionType.DELETE:
                this._gridTransactions.set(transaction.id, {type: transaction.type, rowID: transaction.id, cells: null});
                break;
        }
    }

    public getRowTransactionStateByID(id: string): RowTransactionState {
        return this._gridTransactions.get(id);
    }

    public getRowTransactionStates(): Map<any, RowTransactionState> {
        return this._gridTransactions;
    }

    public delete(id) {
        const transaction = super.get(id);
        if (transaction) {
            const rowTransactionState = this.getRowTransactionStateByID(transaction.id);
            rowTransactionState.cells[transaction.context.column.field] = transaction.oldValue;
        }

        super.delete(id);
    }

    public reset() {
        super.reset();
        this._gridTransactions = new Map();
    }
}
