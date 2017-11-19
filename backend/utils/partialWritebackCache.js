/**
 * The node-cache library uses timeouts as its "eviction policy." We extend the timeout functionality
 * to provide a write-back caching service by attaching database events to the timeout handler.
 * We introduce a record keeping system that allows the client to specify what parts of the cached structure
 * have changed.
 *
 * We have configured the cache to return references to objects so that we can mutate them directly when
 * performing updates.
 *
 * Cache rules:
 * - If an entry is modified, save it to the database after TIME_UNTIL_NEXT_PERSIST seconds
 * - If an entry is accessed, it is persisted for at least TIME_TO_LIVE additional seconds
 *   (and at most TIME_TO_LIVE + TIME_UNTIL_NEXT_PERSIST additional seconds unless accessed again)
 * - Client is responsible for managing the cache size/implementing memory-based eviction policies if necessary
 *   (only necessary if we actually had users)
 */
let NodeCache = require('node-cache');

const TIME_UNTIL_NEXT_PERSIST = 5; // In seconds
const TIME_TO_LIVE = 10; // In seconds; use something like 60 for production

const tripCache = new NodeCache({
	useClones: false, // Get and set references to objects (allows mutation instead of copies)
	checkperiod: 1, // In seconds; use something like 600 for production
});
let persistCallback = undefined;

// FIXME: This function is essentially a mandatory constructor but calling it is not enforced (maybe use a class?)
module.exports.setupExpiryHandler = (persistFunc) => {
	persistCallback = persistFunc;
	tripCache.on("expired", (key, entry) => {
	  	persistCallback(key, entry.data, entry.whatChanged);
	});
}

module.exports.setEntry = (key, value) => {
	let entry = {
		whatChanged: new Set(),
		data: value,
	};
	tripCache.set(key, entry, TIME_TO_LIVE, (err, success) => {
		if (err || !success) {
			console.log('[cache.js] ERROR: Unable to add item with key ' + key);
		}
	});
}

// Attempts to update an entry if it exists
module.exports.markAsUpdated = (key, whatChanged) => {
	let entry = tripCache.get(key);
	if (entry !== undefined) {
		let shouldUpdateTtl = entry.whatChanged.size == 0;

		whatChanged.forEach((element) => {
			entry.whatChanged.add(element);
		});

		if (shouldUpdateTtl) {
			console.log('[cache.js] Preparing to persist cached item with key ' + key);
			tripCache.ttl(key, TIME_UNTIL_NEXT_PERSIST, (err, changed) => {
				if (err) {
					console.log('[cache.js] ERROR: Unable to refresh TTL for item with key ' + key);
				} else if (!changed) {
					// Entry expired some time between reading the value and attempting to refresh TTL.
					// It's not safe to attempt to insert it back into the cache because this is run
					// asynchronously and another event may have already updated trip data in the cache
					console.log('[cache.js] Entry expired between reading the value and attempting to refresh TTL. ' +
						'Not refreshing the cache entry with key ' + key);
				}
			});
		}

		return true;
	}

	console.log('[cache.js] ERROR: Update failed: could not find item with key ' + key);
	return undefined;
}

module.exports.retrieveEntry = (key) => {
	let entry = tripCache.get(key);
	if (entry !== undefined) {
		if (entry.whatChanged.size == 0) {
			console.log('[cache.js] Caching trip ' + key.toString() + ' for ' + TIME_TO_LIVE + ' seconds.');
			// Refresh timer
			tripCache.ttl(key, TIME_TO_LIVE, (err, changed) => {
				if (err) {
					console.log('[cache.js] ERROR: Unable to refresh TTL for item with key ' + key);
				} else if (!changed) {
					// Entry expired some time between reading the value and attempting to refresh TTL.
					// It's not safe to attempt to insert it back into the cache because this is run
					// asynchronously and another event may have already updated trip data in the cache
				}
			});
		}

		return entry.data;
	}

	return undefined;
}

module.exports.invalidateEntry = (key) => {
	let entry = tripCache.get(key);
	if (entry !== undefined) {
		persistCallback(key, entry.data, entry.whatChanged);
		tripCache.del(key);
	}
}
