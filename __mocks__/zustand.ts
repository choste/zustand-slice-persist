import { vi, beforeEach } from 'vitest';
import { StateCreator } from 'zustand';
const { create: actualCreate } = await vi.importActual<typeof import('zustand')>('zustand');
import { act } from 'react-dom/test-utils'

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set<() => void>()

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = () => <S>(createState: StateCreator<S>) => {
  const store = actualCreate(createState)
  const initialState = store.getState()
  storeResetFns.add(() => store.setState(initialState))
  return store
}

// Reset all stores after each test run
beforeEach(() => {
  console.log('does this run')
  act(() => storeResetFns.forEach((resetFn) => resetFn()))
})
