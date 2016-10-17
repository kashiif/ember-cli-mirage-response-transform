
export function getResponseElements(arrTransformers, userCallback, schema, request) {

  let response = {
    data: null
  };

  let argsFromRequestHandler = Array.prototype.slice.call(arguments, 2);

  response.data = userCallback.apply(this, argsFromRequestHandler);

  arrTransformers.forEach((transformer) => {
    transformer.transform.call(this, response, ...argsFromRequestHandler);
  });

  return response;

}

export function serializeResponseElements(responseElements) {
  let json = this.serialize(responseElements.data);

  if (responseElements.meta) {
    json.meta = responseElements.meta;
  }

  return json;
}

export function transform(arrTransformers, userCallback) {
  return function() {

    let response = getResponseElements.call(this, arrTransformers, userCallback, ...arguments);

    return serializeResponseElements.call(this, response);

  };
}



export default {
  transform,
  getResponseElements,
  serializeResponseElements
};
