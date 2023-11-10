import { useState } from 'react'

function useStateWithMerge(initialState) {
  const [state, setState] = useState(initialState)
  function mergeState(newState, shallowUpdate = true) {
    if (shallowUpdate) {
      return setState(prevState =>
        typeof newState == `object`
          ? { ...prevState, ...newState }
          : { ...prevState, ...newState(prevState) },
      )
    }
    return setState(newState)
  }
  return [state, mergeState]
}

export default useStateWithMerge
