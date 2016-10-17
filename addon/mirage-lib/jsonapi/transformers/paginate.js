import Ember from 'ember';

export let queryParamsMap = {
  pageSize: 'page[size]',
  pageNumber: 'page[number]'
};


function transform(responseElements, schema, request) {

  let pageSize = (request.queryParams[queryParamsMap.pageSize] | 0) || 10,
    pageNumber = (request.queryParams[queryParamsMap.pageNumber] | 0) || 1,
    models = responseElements.data.models;


  let totalRecords = models.length;

  let lastPage = Math.ceil(totalRecords / pageSize);
  pageNumber = Math.min(pageNumber, lastPage);

  let start = (pageNumber - 1) * pageSize;

  responseElements.data.models = models.slice(start, start + pageSize);

  let meta = responseElements.meta || {};

  meta.page = meta.page || {};

  Ember.merge(meta.page, {
    total: lastPage,
    number: pageNumber,
    size: pageSize
  });

  meta.total_count = totalRecords;

  responseElements.meta = meta;
}


export default {
  queryParamsMap,
  transform
};
