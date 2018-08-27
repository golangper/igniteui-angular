import { TransactionState } from './transaction';

import { Stack } from '../../core/utils';

export enum TransactionType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update'
}

export interface TransactionState {
    id: any;
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
    // private _transactions: Map<any, TransactionState> = new Map<any, TransactionState>();
    private _transactions: TransactionState[] = [];
    private _undo: Stack<UndoRedoState> = new Stack<UndoRedoState>();
    private _redo: Stack<UndoRedoState> = new Stack<UndoRedoState>();

    public add(state: TransactionState) {
        // this._transactions.set(id, state);
        this._transactions.push(state);
        // this._undo.push({ id: id, state: state });
    }

    public get(id?: string) {
        if (id) {
            return [...this._transactions].reverse().find(transaction => transaction.id === id);
        } else {
            return [...this._transactions];
        }
    }

    /*public getAll() {
        return [...this._transactions];
    }*/

    /*public getAllMerged() {
        return this._transactions;
    }*/

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

    /*public get isUndoEmpty(): boolean {
        return this._undo.size === 0;
    }

    public get isRedoEmpty() {
        return this._redo.size === 0;
    }*/

    /*public undo() {
        if (this.isUndoEmpty) {
            return;
        }
        const undo = this._undo.pop();
        const id = undo.id;
        const undoState = undo.state;
        const redoState = this._transactions.get(id);
        this._transactions.set(id, undoState);
        this._redo.push({ id: id, state: redoState });
    }

    public redo() {
        if (this.isRedoEmpty) {
            return;
        }
        const redo = this._redo.pop();
        const id = redo.id;
        const redoState = redo.state;
        const undoState = this._transactions.get(id);
        this._transactions.set(id, redoState);
        this._undo.push({ id: id, state: undoState });
    }*/
}
