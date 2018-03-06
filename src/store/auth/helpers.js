export const promiseRejects = (obj) => _objectMapper(_returnReject, obj);
export const promisePendings = (obj) => _objectMapper(_returnPending, obj);

const _objectMapper = (func, obj) => {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    const { k, v } = func(key, value, obj);
    result[k] = v
  }
  return result;
}

const _returnReject = (key, value, obj) => ({
  k: [`${value}_REJECTED`],
  v: (state, { payload }) => ({
    ...state,
    isPending: false,
    error: payload
  })
})

const _returnPending = (key, value, obj) => ({
  k: [`${value}_PENDING`],
  v: (state, p) => ({
    ...state,
    isPending: true
  })
})