import { IgxTransactionService, Transaction, TransactionType } from './../transaction';

export interface RowTransactionState {
    type: TransactionType;
    rowID: any;
    value: {};
    originalValue: {};
}

export interface GridTransaction {
    transaction: Transaction;
    originalValue: {};
}

export class IgxGridTransactionService extends IgxTransactionService {
    private _gridState: Map<any, RowTransactionState> = new Map();

    public addGridTransaction(gridTransaction: GridTransaction) {
        const transaction = gridTransaction.transaction;
        super.add(transaction);

        switch (transaction.type) {
            case TransactionType.UPDATE:
                if (!this._gridState.has(transaction.id)) {
                    this._gridState.set(
                        transaction.id,
                        { type: transaction.type, rowID: transaction.id, value: {}, originalValue: gridTransaction.originalValue });
                }

                const rowTransactionState = this._gridState.get(transaction.id);
                if (rowTransactionState.type !== TransactionType.DELETE) {
                    Object.assign(this._gridState.get(transaction.id).value, transaction.newValue);
                }
                break;
            case TransactionType.DELETE:
                this._gridState.set(
                    transaction.id,
                    { type: transaction.type, rowID: transaction.id, value: null, originalValue: gridTransaction.originalValue });
                break;
        }
    }

    public getRowTransactionStateByID(id: string): RowTransactionState {
        return this._gridState.get(id);
    }

    public getRowTransactionStates(): Map<any, RowTransactionState> {
        return this._gridState;
    }

    public delete(id) {
        // const transaction = super.get(id);
        // if (transaction) {
        //     const rowTransactionState = this.getRowTransactionStateByID(transaction.id);
        //     rowTransactionState.value[transaction.context.column.field] = transaction.oldValue;
        // }

        // super.delete(id);
    }

    public reset() {
        super.reset();
        this._gridState = new Map();
    }
}
