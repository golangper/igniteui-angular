export interface IChange {
    id: any;
    type: ChangeType;
    newValue: any;
}

export enum ChangeType {
    ADD = 'add',
    DELETE = 'delete',
    UPDATE = 'update'
}
