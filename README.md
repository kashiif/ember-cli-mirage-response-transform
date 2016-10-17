# ember-cli-mirage-response-transform

## Purpose

Provides easy API to transform responses of ember-cli-mirage. Most common usecase is to add pagination or sort to index/list end points.

## Usage

Consider we have an existing end-point defined:

```js
// mirage/config.js

export default function() {

  this.get('employees', function(schema, request) => {
    return schema.employees.where({
      departmentId: request.queryParams.department
    });
  });

}
```

To add sorting we can redefine the above as:

```js
// mirage/config.js

import responseTransformer from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/apply-response-transforms';
import sorter from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/transformers/sort';

export default function() {

  this.get('employees', responseTransformer.transform([sorter], function(schema, request) => {
    return schema.employees.where({
      departmentId: request.queryParams.department
    });
  }));
  
}
  
```

Transformers can be added on need basis. Transformers would be chained in the order:
```js
// mirage/config.js

import responseTransformer from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/apply-response-transforms';
import sorter from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/transformers/sort';
import pager from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/transformers/paginate';

export default function() {

  this.get('employees', responseTransformer.transform([sorter, pager], function(schema, request) => {
    return schema.employees.where({
      departmentId: request.queryParams.department
    });
  }));
  
}  
```

More customized responses can be created. E.g following example adds multiple keys to response meta:

```js
// mirage/config.js

import responseTransformer from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/apply-response-transforms';
import sorter from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/transformers/sort';
import pager from 'ember-cli-mirage-response-transform/mirage-lib/jsonapi/transformers/paginate';

export default function() {

  this.get('employees', function (/* schema, request */) {

    let response = responseTransformer.getResponseElements.call(this, [sorter, pager], (schema, request) => {
      return schema.employees.where({
        departmentId: request.queryParams.department
      });
    }, ...arguments);

    response.meta = response.meta || {};
    Ember.merge(response.meta, {
      meta1: 10000,
      meta2: 20000,
      meta3: 30000
    });

    return responseTransformer.serializeResponseElements.call(this, response);

  });
  
}  

```
## Installation

* `git clone` this repository
* `npm install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
