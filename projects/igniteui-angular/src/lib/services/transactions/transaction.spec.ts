import { IgxTransactionService, TransactionType, Transaction } from './transaction';

import { async, TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';

fdescribe('Transactions', () => {
    beforeEach(async(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({

        }).compileComponents();
    }));

    describe('General provider: ', () => {
        it('API', fakeAsync(() => {
            const trans = new IgxTransactionService();
            expect(trans).toBeDefined();
            let state: Transaction = { id: '1', type: TransactionType.UPDATE, oldValue: 0, newValue: 1 };
            trans.addGridTransaction(state);
            expect(trans.get('1')).toEqual(state);

            state = { id: '1', type: TransactionType.UPDATE, oldValue: 1, newValue: 2 };
            trans.addGridTransaction(state);
            expect(trans.get('1')).toEqual(state);

            state = { id: '3', type: TransactionType.UPDATE, oldValue: 1, newValue: 2 };
            trans.addGridTransaction(state);

            state = { id: '3', type: TransactionType.UPDATE, oldValue: 2, newValue: 10 };
            trans.addGridTransaction(state);

            state = { id: '3', type: TransactionType.UPDATE, oldValue: 10, newValue: 20 };
            trans.addGridTransaction(state);

            state = { id: '1', type: TransactionType.UPDATE, oldValue: 2, newValue: 20 };
            trans.addGridTransaction(state);
            expect(trans.get('1')).toEqual(state);
            expect(trans.get('3')).toEqual({ id: '3', type: TransactionType.UPDATE, oldValue: 10, newValue: 20 });

            trans.delete('1');
            expect(trans.get('1')).toEqual({ id: '1', type: TransactionType.UPDATE, oldValue: 1, newValue: 2 });
            trans.delete('3');
            expect(trans.get('3')).toEqual({ id: '3', type: TransactionType.UPDATE, oldValue: 2, newValue: 10 });

            expect(trans.length).toEqual(4);
            expect(trans.get()[3]).toEqual({ id: '3', type: TransactionType.UPDATE, oldValue: 2, newValue: 10 });

            trans.reset();
            expect(trans.isEmpty).toBeTruthy();
        }));
    });
});
