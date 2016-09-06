import test from 'tape'
import {
    Map,
    fromJS
} from 'immutable';
import reducer from '../src/reducer';

test('reducer - has an initial state', function (t) {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(undefined, action);
    t.true(nextState.equals(fromJS({
        entries: ['Trainspotting']
    })), console.log(nextState.toString()));
    t.end();
});

test('reducer - handles SET_ENTRIES', function (t) {
    const initialState = Map();
    const action = {
        type: 'SET_ENTRIES',
        entries: ['Trainspotting']
    };
    const nextState = reducer(initialState, action);

    t.true(nextState.equals(fromJS({
        entries: ['Trainspotting']
    })), console.log(nextState.toString()));
    t.end();
});

test('reducer - handles NEXT', function (t) {
    const initialState = fromJS({
        entries: ['Trainspotting', '28 Days Later']
    });
    const action = {
        type: 'NEXT'
    };
    const nextState = reducer(initialState, action);

    t.true(nextState.equals(fromJS({
        vote: {
            pair: ['Trainspotting', '28 Days Later']
        },
        entries: []
    })), console.log(nextState.toString()));
    t.end();
});

test('reducer - handles VOTE', function (t) {
    const initialState = fromJS({
        vote: {
            pair: ['Trainspotting', '28 Days Later']
        },
        entries: []
    });
    const action = {
        type: 'VOTE',
        entry: 'Trainspotting'
    };
    const nextState = reducer(initialState, action);

    t.true(nextState.equals(fromJS({
        vote: {
            pair: ['Trainspotting', '28 Days Later'],
            tally: {
                Trainspotting: 1
            }
        },
        entries: []
    })));
    t.end();
});

test('reducer - can be used with reduce', function (t) {
    const actions = [
        {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
        {type: 'NEXT'},
        {type: 'VOTE', entry: 'Trainspotting'},
        {type: 'VOTE', entry: '28 Days Later'},
        {type: 'VOTE', entry: 'Trainspotting'},
        {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    t.true(finalState.equals(fromJS({
        winner: 'Trainspotting'
    })));
    t.end();
});
