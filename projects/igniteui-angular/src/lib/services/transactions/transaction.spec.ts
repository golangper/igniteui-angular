import { IgxTransactionBaseService } from './transaction-base';

import { async, TestBed, fakeAsync } from '@angular/core/testing';
import { IChange, ChangeType } from './IChange';

describe('Transactions', () => {
    beforeEach(async(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({

        }).compileComponents();
    }));

    describe('IgxTransactionBaseService UNIT TESTS: ', () => {
        fit('Add ADD type change - all possible paths', fakeAsync(() => {
            const trans = new IgxTransactionBaseService();
            expect(trans).toBeDefined();

            const change: IChange = { id: '1', type: ChangeType.ADD, newValue: 1 };
            trans.add(change);
            expect(trans.get('1')).toEqual(change);
            expect(trans.getAll()).toEqual([change]);
            expect(trans.currentState().get(change.id)).toEqual({ value: change.newValue, originalValue: null, type: change.type });
        }));
        xit('API', fakeAsync(() => {
            const trans = new IgxTransactionBaseService();
            expect(trans).toBeDefined();

            let change: IChange = { id: '1', type: ChangeType.UPDATE, newValue: 1 };
            trans.add(change);
            expect(trans.get('1')).toEqual(change);

            change = { id: '1', type: ChangeType.UPDATE, newValue: 2 };
            trans.add(change);
            expect(trans.get('1')).toEqual(change);

            change = { id: '3', type: ChangeType.UPDATE, newValue: 2 };
            trans.add(change);

            change = { id: '3', type: ChangeType.UPDATE, newValue: 10 };
            trans.add(change);

            change = { id: '3', type: ChangeType.UPDATE, newValue: 20 };
            trans.add(change);

            change = { id: '1', type: ChangeType.UPDATE, newValue: 20 };
            trans.add(change);

            expect(trans.get('1')).toEqual(change);
            expect(trans.get('3')).toEqual({ id: '3', type: ChangeType.UPDATE, newValue: 20 });
            // const state = trans.currentState();
            // expect(state).toEqual([
            //     { type: ChangeType.UPDATE, value: 20 },
            //     { type: ChangeType.UPDATE, value: 20 }
            // ]);

            const data = [0, 10, 20, 30, 40, 50, 60];

            trans.update(data);
            trans.reset();
            expect(trans.getAll().length).toBe(0);
        }));
    });
});
