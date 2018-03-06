import React from 'react';
import { isString, isNumber } from 'lodash';

const TableRow = ({ item }) => {
  return (
    <tr>
      {/* <th scope="row">{item.id}</th> */}
      {
        Object.entries(item).map(([k, v]) => {
          if (isString(v) || isNumber(v)) {
            return (
              <td key={k}>{v}</td>
            )
          }
        })
      }
    </tr>
  )
}

export default TableRow;