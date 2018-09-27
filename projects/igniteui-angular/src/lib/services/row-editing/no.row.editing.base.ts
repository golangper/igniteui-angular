import { IRowEditingService } from './row.editing.interface';
import { IgxTransactionBaseService } from '../transaction/transaction-base';
import { ITransaction } from '../transaction/utilities';

export class IgxNoRowEditingService implements IRowEditingService {
    constructor(public _transactions: IgxTransactionBaseService) { }
    public add(transaction: ITransaction, recordRef?: any) {
        // TODO directly submit value or just return
    }
    public aggregatedState() {
        return null;
    }
}
