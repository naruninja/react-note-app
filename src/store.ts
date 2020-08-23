import { createEpicMiddleware } from 'redux-observable'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { noteSlice } from '_/slices/noteSlice'
import { rootEpic } from '_/epic'
import { history } from '_/inst'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { langSlice } from '_/slices/langSlice'

const epicMiddleware = createEpicMiddleware()

export const rootReducer = combineReducers({
   note: noteSlice.reducer,
   lang: langSlice.reducer,
   router: connectRouter(history),
})
export const store = configureStore({
   reducer: rootReducer,
   devTools: true,
   middleware: [epicMiddleware, routerMiddleware(history)],
})

export type RootState = ReturnType<typeof store.getState>

epicMiddleware.run(rootEpic)
