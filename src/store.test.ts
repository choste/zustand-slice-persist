import {beforeEach, test, expect} from 'vitest'
import { renderHook, act } from '@testing-library/react'
import store from './store'

const initialState = store.getState()

beforeEach(() => {
    store.setState(initialState)
})

test('Add a dog', () => {
    const { result } = renderHook(() => store())
    
    act(() => {
        result.current.addDog()
    })

    expect(result.current.dogs).toBe(1)
    expect(result.current.cats).toBe(0)
})

test('Add a cat', () => {
    const { result } = renderHook(() => store())

    act(() => {
        result.current.addCat()
    })

    expect(result.current.dogs).toBe(0)
    expect(result.current.cats).toBe(1)
})

test('Incement multiple times', () => {
    const { result } = renderHook(() => store())

    act(() => {
        result.current.addCat()
        result.current.addCat()
    })

    expect(result.current.dogs).toBe(0)
    expect(result.current.cats).toBe(2)
})


