import test from 'tape';
import {
    List,
    Map
} from 'immutable';
import {
    setEntries,
    next,
    vote
} from '../src/core';

test('application logic - adds the entries to the state', function (t) {
    const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
    });

    const nextState = next(state);
    t.true(nextState.equals(Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
    })));
    t.end();
});

test('vote - creates a tally for the voted entry', function (t) {
    const state = Map({
        pair: List.of('Trainspotting', '28 Days Later')
    });
    const nextState = vote(state, 'Trainspotting');
    t.true(nextState.equals(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
            'Trainspotting': 1
        })
    })));
    t.end();
});

test('vote - adds to existing tally for the voted entry', function (t) {
    const state = Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
        })
    });
    const nextState = vote(state, 'Trainspotting' );
    t.true(nextState.equals(Map({
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
            'Trainspotting': 4,
            '28 Days Later': 2
        })
    })));
    t.end();
});

test('next - takes the next two entries under vote', function (t) {
    const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
    });
    const nextState = next(state);
    t.true(nextState.equals(Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
    })), console.log(nextState.toString()));
    t.end();
});

test('next - puts winner of current vote back to entries', function (t) {
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 2
            })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    t.true(nextState.equals(Map({
        vote: Map({
            pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
    })), console.log(nextState.toString()));
    t.end();
});

test('next - puts both from tied vote back to entries', function (t) {
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
                'Trainspotting': 3,
                '28 Days Later': 3
            })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
    });
    const nextState = next(state);
    t.true(nextState.equals(Map({
        vote: Map({
            pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
    })), console.log(nextState.toString()));
    t.end();
});

test('next - marks winner when just one entry left', function (t) {
    const state = Map({
        vote: Map({
            pair: List.of('Trainspotting', '28 Days Later'),
            tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 2
            })
        }),
        entries: List()
    });
    const nextState = next(state);
    t.true(nextState.equals(Map({
        winner: 'Trainspotting'
    })), console.log(nextState.toString()));
    t.end();
});
