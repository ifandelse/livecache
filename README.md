# livecache - a jQuery function for caching DOM node lists

## Features
livecache can:

* "re-query" for a node list by allowing you to specify a selector before any matching elements exist in the DOM
    * if accessing a node list (`$.livecache('div')`) returns an empty list, livecache will query the DOM each time you access that selector until results exist
    * Once results exist, that static node list is cached and will be returned with subsequent calls to `$.livecache('div')`
* manually force an update of a cached node list by calling `$.livecache('div', true)` where the second arg is a boolean flad indicating "force a refresh".
* automatically invalidate the cache by monitoring DOM mutator events (`DOMNodeInserted` & `DOMNodeRemoved`)
    * If any node being removed/inserted matches a cached selector, the selector is removed from the cache
    * subsequent queries for that same selector would re-create the cache entry
* automatically *update* the cache by monitoring DOM mutator events
    * If any node being removed/inserted matches a cached selector, that cache is immediately refreshed
    * beware - this can be expensive

## Examples
re-query for a node list until results exist:

```javascript
$.livecache( 'div' ).length === 0; // true, assuming no divs exist in the DOM
$(document.body).append("<div>Oh, Hai Div</div>");
$.livecache( 'div' ).length === 1 // true, now that one div exists
```
You might be wondering what that gains you.  From this point on, a call to `$.livecache( 'div' )` does not query the DOM again.  Instead, the result is pulled from a cache.

By default, livecache does not monitor the DOM for changes.  Here's an example of how to manually force the cache to update:

```javascript
$.livecache( 'div' ).length === 1; // per our code example above, we have 1 div in the document
$(document.body).append("<div>Oh, Hai - MOAR Divs!</div>");
$.livecache( 'div' ).length === 1 // true, we haven't refreshed the cache!
$.livecache( 'div', true ).length === 2 // true, now that we forced an update
```

What if you want to monitor the DOM for changes, and invalidate any cached selectors that would be affected:

```javascript
// including "invalidateOnly" is unnecessary, since it defaults to true
// you pass an object to $.livecache() when you want to set the configuration (current values are monitorDom and invalidateOnly)
$.livecache( { monitorDom: true, invalidateOnly: true }) ;
$.livecache( 'div' ).length === 2; // per our code example above, we have 2 divs in the document
$(document.body).append("<div>Oh, Hai - EVEN MOAR Divs!</div>");
$.livecache( 'div' ).length === 3 // true.  The cache got invalidated on the append above and this call to livecache refreshed the cache with a new entry
```

What if you want to monitor the DOM for changes, and immediately update any cached selectors that would be affected:

```javascript
$.livecache( { monitorDom: true, invalidateOnly: false }) ;
$.livecache( 'div' ).length === 3; // per our code example above, we have 3 divs in the document
$(document.body).append("<div>NO MOAR Divs, KTHXBAI!</div>");
$.livecache( 'div' ).length === 4 // true.  The cache got updated on the append above
```