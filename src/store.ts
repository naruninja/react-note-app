import { createEpicMiddleware } from 'redux-observable'
import { configureStore } from '@reduxjs/toolkit'
import { noteSlice } from '_/slices/noteSlice'
import { rootEpic } from '_/epic'
import { history } from '_/inst'
import { connectRouter, routerMiddleware } from 'connected-react-router'

const epicMiddleware = createEpicMiddleware()

const store = configureStore({
   reducer: {
      note: noteSlice.reducer,
      router: connectRouter(history),
   },
   devTools: true,
   middleware: [epicMiddleware, routerMiddleware(history)],
})

export type RootState = ReturnType<typeof store.getState>

epicMiddleware.run(rootEpic)

export { store }
