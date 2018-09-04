import { IChange } from './IChange';
import { IState } from './IState';

export interface ITransaction {
    add(change: IChange, originalValue?: any);
    get(id: string): IChange;
    getAll(): IChange[];
    undo();
    redo();
    currentState(): Map<any, IState>;
    update(data: any[]);
    reset();
}
