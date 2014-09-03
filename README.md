elasticsearch-query
===================

Experimental elasticsearch query dsl that is less verbose.

### Quick Example

```javascript
var ESQuery = require('elasticsearch-query');

// it passes args to elasticsearch driver
var es = new ESQuery({ host: 'http://localhost:9200' });

// it autocurries if just passed index/type
var tweets = es.search('/test/tweet');

// quick helper log function
var log = function (err, res) { console.log(res); }

// log everything
tweets({}, log);

// query dsl (very early)
tweets({ $q: { name: 'john', tweet: 'api' }}, log);
```
