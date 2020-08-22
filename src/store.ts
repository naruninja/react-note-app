import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { configureStore } from '@reduxjs/toolkit'
import { noteSlice } from '_/slices/noteSlice'
import { rootEpic } from '_/epic'

const epicMiddleware = createEpicMiddleware()

const store = configureStore({
   reducer: {
      note: noteSlice.reducer,
   },
   devTools: true,
   middleware: [epicMiddleware],
})

export type RootState = ReturnType<typeof store.getState>

epicMiddleware.run(rootEpic)

export { store }
