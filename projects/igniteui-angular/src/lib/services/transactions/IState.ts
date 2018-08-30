import { ChangeType } from './IChange';

export interface IState {
    id: any;
    type: ChangeType;
    value: {};
}
