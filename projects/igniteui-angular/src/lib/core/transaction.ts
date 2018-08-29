export class Stack<T> {
    _store: T[] = [];
    push(val: T) {
      this._store.push(val);
    }
    pop(): T | undefined {
      return this._store.pop();
    }
    get size(): number {
        return this._store.length;
    }
    clear() {
        this._store = [];
    }
}

export class LinkedStack<T> extends Stack<T> {
    find(id): T {
        return this._store.find(i => (i as any).id === id);
    }
}

export enum TransactionType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update',
    UPDATECELL = 'updatecell'
}

export interface Transaction {
    id;
    type: TransactionType;
    newValue;
}

export interface TransactionState {
    type: TransactionType;
    // originalValue;
    value;
}

export class IgxTransaction {
    protected _transactionsLog: LinkedStack<Transaction> = new LinkedStack<Transaction>();
    protected _transactionsState: Map<any, TransactionState> = new Map<any, TransactionState>();
    protected _redo: LinkedStack<Transaction> = new LinkedStack<Transaction>();

    // public add(trans: Transaction) {
    public add(id, type: TransactionType, newValue) {
        this._transactionsLog.push(this._createTransaction(id, type, newValue));
        this._updateState(id, type, newValue);
    }

    protected _createTransaction(id, type: TransactionType, newValue): Transaction {
        const transaction: Transaction = { id: id, type: type, newValue: newValue };

        return transaction;
    }

    protected _updateState(id, type: TransactionType, newValue, parentID?) {
        const state: TransactionState = { type: type, value: newValue };

        this._transactionsState.set(id, state);
    }

    public get(id) {
        return this._transactionsState.get(id);
    }

    public dirty(id) {
        return this.get(id) !== undefined;
    }

    public reset() {
        this._transactionsLog.clear();
    }

    /*public getAllMerged() {
        return this._transactionsState;
    }

    public delete(id) {
        this._transactionsLog.delete(id);
    }

    public reset() {
        this._transactionsLog.clear();
    }

    public get length() {
        return this._transactionsLog.size;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

    public get isUndoEmpty(): boolean {
        return this._undo.size === 0;
    }

    public get isRedoEmpty() {
        return this._redo.size === 0;
    }

    public undo() {
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

export interface ComplexTransaction {
    id;
    type: TransactionType;
    newValue;
    parentTransactionID?;
}
export interface ComplexTransactionState {
    type: TransactionType;
    value: Map<any, ComplexTransactionState> | any;
    // originalValue;
    childTransactionIDs?: Set<any>;
}

export enum StateElementsType {
    PARENT = 'parent',
    CHILD = 'child',
    BOTH = 'both'
}

export class IgxComplexTransaction extends IgxTransaction {
    private _stateElementsType = StateElementsType.PARENT;

    public get stateElementsType(): StateElementsType {
        return this._stateElementsType;
    }

    public set stateElementsType(val: StateElementsType) {
        this._stateElementsType = val;
    }

    public add(id, type: TransactionType, newValue, parentID?) {
        this._transactionsLog.push(this._createTransaction(id, type, newValue, parentID));
        this._updateState(id, type, newValue, parentID);
    }

    protected _createTransaction(id, type: TransactionType, newValue, parentID?): ComplexTransaction {
        const transaction = <ComplexTransaction>super._createTransaction(id, type, newValue);
        transaction.parentTransactionID = parentID;
        return transaction;
    }

    protected _updateState(id, type: TransactionType, newValue, parentID) {
        if (this.stateElementsType !== StateElementsType.PARENT) {
            super._updateState(id, type, newValue);
        }
        if (this.stateElementsType !== StateElementsType.CHILD) {
            let parentTransactionState: ComplexTransactionState;
            if (this._transactionsState.has(parentID)) {
                parentTransactionState = <ComplexTransactionState>this._transactionsState.get(parentID);
            } else {
                parentTransactionState = { type: type, value: null, childTransactionIDs: new Set() };
            }
            if (parentID) {
                parentTransactionState.childTransactionIDs.add(id);
                if (!parentTransactionState.value) {
                    parentTransactionState.value = new Map();
                }

                // This can be omitted, instead when all transactions are submitted,
                // then using childTransactions then we extract their values from _transactionLog.
                parentTransactionState.value.set(id, { type: type, value: newValue });
            } else {
                parentTransactionState.value = newValue;
            }
            this._transactionsState.set(parentID || id, parentTransactionState);
        }
    }
}
