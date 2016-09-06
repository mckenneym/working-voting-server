import test from 'tape'
import {Map, fromJS} from 'immutable';
import makeStore from '../src/store';

test('store - is a Redux store configured with the correct reducer', function (t) {
    const store = makeStore();
    t.true(store.getState().equals(Map()));

    store.dispatch({
        type: 'SET_ENTRIES',
        entries: ['Trainspotting', '28 Days Later']
    });
    t.true(store.getState().equals(fromJS({
         entries: ['Trainspotting', '28 Days Later']
    })));
    t.end();
});
