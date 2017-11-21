const watchedProps = ['trip', 'title', 'description', 'location', 'marker',
'coordinateLat', 'coordinateLon', 'startTime', 'duration', 'order',
'creator'];

export function getChangedCards(oldCards, newCards) {
  const watchedProps = ['trip', 'title', 'description', 'location', 'marker',
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

export function getNewCards(oldCards, newCards) {
  const oldCardIds = oldCards.map(x => x.id);
  var addedCards = []
  newCards.forEach(newCard => {
    if (oldCardIds.indexOf(newCard.id) == -1 && newCard.new) {
      newCard.new = false;
      addedCards.push(newCard);
    }
  });
  return addedCards;
}

export function assignCardByValue(target, source) {
  watchedProps.forEach(prop => {
    target[prop] = source[prop];
  });
}
