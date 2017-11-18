const watchedProps = ['trip', 'title', 'description', 'location',
'coordinateLat', 'coordinateLon', 'startTime', 'duration', 'order',
'creator'];

export function getChangedCards(oldCards, newCards) {
  const watchedProps = ['trip', 'title', 'description', 'location',
  'coordinateLat', 'coordinateLon', 'startTime', 'duration', 'order',
  'creator'];
  // const oldEvents = store.state.trip.oldEvents;
  const length = Math.max(newCards.length, oldCards.length);
  const min = Math.min(newCards.length, oldCards.length);
  var changedCards = [];

  for (var i = 0; i < length; i += 1) {
    if (i >= min) {
      changedCards.push(newCards[i]);
      break;
    }

    watchedProps.some((prop) => {
      if(newCards[i][prop] != oldCards[i][prop]) {
        changedCards.push(newCards[i]);
        return true;
      }
    });
  }
  return changedCards;
}

export function assignCardByValue(target, source) {
  watchedProps.forEach(prop => {
    target[prop] = source[prop];
  });
}
