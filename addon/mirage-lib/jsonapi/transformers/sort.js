import Ember from 'ember';

import propertyCompare from '../../utils/property-compare';

export let queryParamsMap = {
  pageSize: 'page[size]',
  pageNumber: 'page[number]'
};


function transform(responseElements, schema, request) {

  let sortColumns = request.queryParams.sort,
      models = responseElements.data.models;

  let columnList = sortColumns ?  sortColumns.split(',') : [];

  models.sort(propertyCompare(columnList));

  let meta = responseElements.meta || {};

  meta.page = meta.page || {};

  Ember.merge(meta.page, {
    sort: columnList.map((sortColumnName) => {
      let field = sortColumnName,
          direction = 'asc';

      if (field.charAt(0) === '-') {
        field = field.substring(1);
        direction = 'desc';
      }

      return {
        field,
        direction
      };

    })
  });

  responseElements.meta = meta;
}


export default {
  queryParamsMap,
  transform
};
