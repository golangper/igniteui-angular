import { IRowEditingService } from './row.editing.interface';
import { IgxTransactionBaseService } from '../transaction/transaction-base';
import { ITransaction } from '../transaction/utilities';
import { IState } from '../transaction/utilities';

export class RowEditingService implements IRowEditingService {
    constructor(public _transactions: IgxTransactionBaseService) { }
    public add(transaction: ITransaction, recordRef?: any) {
        this._transactions.add(transaction, recordRef);
    }
    public aggregatedState(): Map<any, IState> {
        return this._transactions.aggregatedState();
    }
}
