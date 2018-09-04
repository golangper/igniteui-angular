import { ChangeType } from './IChange';

export interface IState {
    value: any;
    originalValue: any;
    type: ChangeType;
}
