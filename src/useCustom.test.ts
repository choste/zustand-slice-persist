import useCustom from './useCustom'
import { test, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

vi.mock('zustand')

test('Should start as loading', async () => {
    const { result } = renderHook(() => useCustom())
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
})

test('Should eventually set cats to 3', async () => {
    const { result } =  renderHook(() => useCustom())
    await waitFor(() => expect(result.current.loading).toBe(false))
    await waitFor(() => expect(result.current.cats).toBe(3))
})