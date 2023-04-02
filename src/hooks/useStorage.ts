import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function useLocalStorage<S>(
  key: string,
  initialValue: S
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState<S>(() => {
    const localValue = localStorage.getItem(key)
    if (localValue === null) return initialValue
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}

export default useLocalStorage
