export default function (props) {

  return function (a, b) {

    let property, directionVal, result;
    for (let i = 0, iLen = props.length; i < iLen; i++) {
      property = props[i].underscore();
      directionVal = 1;

      if (property.charAt(0) === '_') {
        property = property.slice(1);
        directionVal = -1;
      }

      /*
       *  The below code will handle sorting by columns in datatable
       */
      if (isNaN(a[property])) {
        result = directionVal * (a[property].localeCompare(b[property]));
      } else {
        let aValue = a[property];
        let bValue = b[property];

        if (aValue > bValue) {
          result = directionVal;
        } else if (aValue === bValue) {
          result = 0;
        } else if (aValue < bValue) {
          result = directionVal * -1;
        }
      }

      if (result !== 0) {
        break;
      }
    }
    return result;
  };
}
