import { Transaction } from './transaction';

export enum TransactionType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update'
}

export interface Transaction {
    id: any;
    type: TransactionType;
    newValue: any;
}

export class IgxTransactionService {
    private _transactions: Transaction[] = [];

    public add(transaction: Transaction) {
        this._transactions.push(transaction);
    }

    public get(id: string): Transaction {
        if (id) {
            return [...this._transactions].reverse().find(t => t.id === id);
        } else {
            return null;
        }
    }

    public getAll(): Transaction[] {
        return [...this._transactions];
    }

    public delete(id) {
        const index = this._transactions.length - [...this._transactions].reverse().findIndex(t => t.id === id) - 1;
        this._transactions = this._transactions.splice(index, 1);
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
