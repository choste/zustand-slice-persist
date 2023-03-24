import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'


interface CatSlice {
  cats: number
  addCat: () => void
}
const createCatSlice: StateCreator<
  CatSlice & DogSlice,
  [],
  [],
  CatSlice
> = (set) => ({
  cats: 0,
  addCat: () => set((state) => ({ cats: state.cats + 1 })),
})

interface DogSlice {
  dogs: number
  addDog: () => void
}
const createDogSlice: StateCreator<
  CatSlice & DogSlice,
  [],
  [],
  DogSlice
> = (set) => ({
  dogs: 0,
  addDog: () => set((state) => ({ dogs: state.dogs + 1 })),
})

export default create<CatSlice & DogSlice>()(persist(
    (...a) => ({
        ...createCatSlice(...a),
        ...createDogSlice(...a),
    }),
    {
        name: 'pet-store',
        partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['cats'].includes(key))
        ),
    }
))