import { IgxTransactionService, IState, ITransaction } from '../transaction/utilities';

export interface IRowEditingService {
    _transactions: IgxTransactionService;
    add(transaction: ITransaction, recordRef?: any);
    aggregatedState(): Map<any, IState>;
}
