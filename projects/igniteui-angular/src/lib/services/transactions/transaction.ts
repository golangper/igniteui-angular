import { TransactionState } from './transaction';

export enum TransactionType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update'
}

export interface TransactionState {
    id: any;
    context: any;
    type: TransactionType;
    newValue: any;
    oldValue: any;
}

export interface GridTransactionState {
    type: TransactionType;
    state: object;
    previousState: object;
}
export interface UndoRedoState {
    id: any;
    state: TransactionState;
}

export class IgxTransactionService {
    private _transactions: TransactionState[] = [];

    public add(state: TransactionState) {
        this._transactions.push(state);
    }

    public get(id?: string) {
        if (id) {
            return [...this._transactions].reverse().find(transaction => transaction.id === id);
        } else {
            return [...this._transactions];
        }
    }

    public delete(id) {
        const index = this._transactions.length - [...this._transactions].reverse().findIndex(transaction => transaction.id === id) - 1;
        this._transactions = [...this._transactions.slice(0, index), ...this._transactions.slice(index + 1, this._transactions.length - 1)];
    }

    public reset() {
        this._transactions = [];
    }

    public get length() {
        return this._transactions.length;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }
}
