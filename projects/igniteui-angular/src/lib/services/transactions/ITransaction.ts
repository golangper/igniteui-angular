import { IChange } from './IChange';
import { IState } from './IState';

export interface ITransaction {
    add(change: IChange);
    get(id: string): IChange;
    getAll(): IChange[];
    undo();
    redo();
    currentState(): IState[];
    update(data: any);
}
