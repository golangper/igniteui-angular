import { ITransaction } from './ITransaction';
import { IChange } from './IChange';
import { IState } from './IState';

export class NoOpTransactionService implements ITransaction {
    public add(change: IChange) {
    }

    get(id: string): IChange {
        return null;
    }
    getAll(): IChange[] {
        return [];
    }

    undo() { }

    redo() { }

    currentState(): IState[] {
        return [];
    }

    update(data: any) { }

    reset() { }
}
