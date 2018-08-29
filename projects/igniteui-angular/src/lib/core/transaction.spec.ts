import { IgxTransaction, IgxComplexTransaction, TransactionType, TransactionState } from './transaction';

import { async, TestBed, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';

fdescribe('Transactions', () => {
    beforeEach(async(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({

        }).compileComponents();
    }));

    describe('General provider: ', () => {
        it('API', fakeAsync(() => {
            const trans = new IgxTransaction();
            let id;
            expect(trans).toBeDefined();
            id = '1';
            trans.add(id, TransactionType.UPDATE, 1);
            expect(trans.get(id).type).toEqual(TransactionType.UPDATE);
            expect(trans.get(id).value).toEqual(1);

            trans.add(id, TransactionType.UPDATE, 2);
            expect(trans.get(id).value).toEqual(2);

            id = 3;
            trans.add(id, TransactionType.UPDATE, 2);
            expect(trans.get(id).value).toEqual(2);

            trans.add(id, TransactionType.UPDATE, 10);
            expect(trans.get(id).value).toEqual(10);

            trans.add(id, TransactionType.UPDATE, 20);
            expect(trans.get(id).value).toEqual(20);

            id = 3;
            trans.add(id, TransactionType.UPDATE, 20);
            expect(trans.get(id).value).toEqual(20);

            id = '1';
            expect(trans.get(id).value).toEqual(2);

            /*trans.delete('1');
            expect(trans.get('1')).toEqual({ id: '1', type: TransactionType.UPDATE, oldValue: 1, newValue: 2 });
            trans.delete('3');
            expect(trans.get('3')).toEqual({ id: '3', type: TransactionType.UPDATE, oldValue: 2, newValue: 10 });

            expect(trans.length).toEqual(4);
            expect(trans.get()[3]).toEqual({ id: '3', type: TransactionType.UPDATE, oldValue: 2, newValue: 10 });

            trans.reset();
            expect(trans.isEmpty).toBeTruthy();*/
        }));
    });
});
