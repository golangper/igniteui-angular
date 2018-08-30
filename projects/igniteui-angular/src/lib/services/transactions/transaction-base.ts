import { IChange } from './IChange';
import { ITransaction } from './ITransaction';
import { IState } from './IState';

export class IgxTransactionBaseService implements ITransaction {
    private _changes: IChange[] = [];
    private _undone: IChange[] = [];

    public add(change: IChange) {
        this._changes.push(change);
        this._undone = [];
    }

    public get(id: string): IChange {
        return [...this._changes.reverse()].find(t => t.id === id);
    }

    public getAll(): IChange[] {
        return [...this._changes];
    }

    public delete(id) {
        const index = this._changes.length - [...this._changes.reverse()].findIndex(t => t.id === id) - 1;
        this._changes = this._changes.splice(index, 1);
    }

    currentState(): IState[] {
        const state: Map<string, IState> = new Map();
        this._changes.map(c => state.set(c.id, { id: c.id, type: c.type, value: c.newValue }));
        const result: IState[] = [];
        state.forEach(v => result.push(v));
        return result;
    }

    update(data: any[]) {
        this.currentState().map(s => data[s.id] = s.value);
    }

    public reset() {
        this._changes = [];
    }

    undo() {
        if (this._changes.length > 0) {
            this._undone.push(this._changes.pop());
        }
    }

    redo() {
        if (this._undone.length > 0) {
            this._changes.push(this._undone.pop());
        }
    }
}
