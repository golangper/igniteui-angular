import { IgxSelectionAPIService } from './selection';

describe('IgxSelectionAPIService', () => {
    let service;
    beforeEach(() => {
        service = new IgxSelectionAPIService();
    });

    it('call set method with undefined componentID', () => {
        expect(function() {
            service.set(undefined, new Set());
        }).toThrowError('Invalid value for component id!');
    });

    it('call add_item method with undefined itemID', () => {
        const componentId = 'id1';
        service.set(componentId, new Set());
        expect(function() {
             service.add_item(componentId, undefined);
        }).toThrowError('Invalid value for item id!');
    });

    it('call add_item method with itemID=0', () => {
        const componentId = 'id1';
        service.set(componentId, new Set());
        const newSelection = service.add_item(componentId, 0);
        expect(newSelection.has(0)).toBe(true);
    });
});
