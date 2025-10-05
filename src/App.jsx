import cn from 'classnames';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const Good = ({ good }) => <li data-cy="Good">{good}</li>;

const SORTED_BY_ABC = 'abc';
const SORTED_BY_LENGTH = 'length';
const SORTED_REVERSE = 'reverse';

const sortedByCondition = (array, sortField) => {
  const newArray = [...array];

  if (sortField === SORTED_BY_ABC) {
    return newArray.sort((word1, word2) => word1.localeCompare(word2));
  }

  if (sortField === SORTED_BY_LENGTH) {
    return newArray.sort((word1, word2) => word1.length - word2.length);
  }

  return newArray;
};

export const App = () => {
  const [action, setAction] = useState('');
  const [direction, setDirection] = useState('');

  const goods = sortedByCondition(goodsFromServer, action);

  if (direction === SORTED_REVERSE) {
    goods.reverse();
  }

  const changeDirection = () => {
    setDirection(direction === '' ? SORTED_REVERSE : '');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': action !== SORTED_BY_ABC,
          })}
          onClick={() => setAction(SORTED_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': action !== SORTED_BY_LENGTH,
          })}
          onClick={() => setAction(SORTED_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': direction === '' })}
          onClick={() => changeDirection()}
        >
          Reverse
        </button>

        {(action || direction) && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': action || direction,
            })}
            onClick={() => {
              setAction('');
              setDirection('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <Good key={good} good={good} />
        ))}
      </ul>
    </div>
  );
};
