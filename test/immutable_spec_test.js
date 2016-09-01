import test from 'tape';
import {List, Map} from 'immutable';

function increment(currentState){
  return currentState + 1;
}

test('intro - state', function(t) {
    let state = 42;
    let nextState = increment(state);
    t.equal(nextState, 43);
    t.equal(state, 42);
    t.end();
});

test('intro - movie list', function(t) {
    let state = List.of('Trainspotting', '28 Days Latter');
    let nextState = state.push('Sunshine');
    t.true(nextState.equals(List.of('Trainspotting', '28 Days Latter', 'Sunshine')));
    t.true(state.equals(List.of('Trainspotting', '28 Days Latter')));
    t.end();
});

test('intro - movie tree', function(t) {

    // let addMovie = function(currentState, movie) {
    //     return currentState.set(
    //         'movies',
    //         currentState.get('movies').push(movie)
    //     );
    // };

    let addMovie = function(currentState, movie) {
        return currentState.update(
            'movies', movies => movies.push(movie));
    };

    let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
    });

    let nextState = addMovie(state, 'Sunshine');

    t.true(nextState.equals(Map({
        movies: List.of(
            'Trainspotting',
            '28 Days Later',
            'Sunshine'
        )
    })));
    t.true(state.equals(Map({
        movies: List.of(
            'Trainspotting',
            '28 Days Later'
        )
    })));
    t.end();
});
