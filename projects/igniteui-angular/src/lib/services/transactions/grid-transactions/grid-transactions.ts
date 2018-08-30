import { ChangeType, IChange } from '../IChange';
import { IgxTransactionBaseService } from '../transaction-base';

export interface RowTransactionState {
    type: ChangeType;
    rowID: any;
    value: {};
    originalValue: {};
}

export interface GridChange {
    change: IChange;
    originalValue: {};
}

export class IgxGridTransactionService extends IgxTransactionBaseService {
    private _gridState: Map<any, RowTransactionState> = new Map();

    public addGridTransaction(gridChange: GridChange) {
        const change = gridChange.change;
        super.add(change);

        switch (change.type) {
            case ChangeType.UPDATE:
                if (!this._gridState.has(change.id)) {
                    this._gridState.set(
                        change.id,
                        { type: change.type, rowID: change.id, value: {}, originalValue: gridChange.originalValue });
                }

                const rowTransactionState = this._gridState.get(change.id);
                if (rowTransactionState.type !== ChangeType.DELETE) {
                    Object.assign(this._gridState.get(change.id).value, change.newValue);
                }
                break;
            case ChangeType.DELETE:
                this._gridState.set(
                    change.id,
                    { type: change.type, rowID: change.id, value: null, originalValue: gridChange.originalValue });
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

    public UpdateData(data: any[]) {
            const deleted = [];
            this._gridState.forEach(( rowTransactionState: RowTransactionState) => {
                switch (rowTransactionState.type) {
                    case ChangeType.UPDATE:
                        Object.assign(rowTransactionState.originalValue, rowTransactionState.value);
                        break;
                    case ChangeType.DELETE:
                        const rowIndex = data.findIndex(r => r === rowTransactionState.originalValue);
                        deleted.push(rowIndex);
                        break;
                }
            });
            deleted.sort().reverse().forEach(i => data.splice(i, 1));

        this.reset();

    }
}
