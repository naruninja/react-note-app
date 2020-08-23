import { NoteApi } from '_/noteApi'
import { createBrowserHistory } from 'history'

export const noteApi = new NoteApi('https://private-anon-c3f8d91856-note10.apiary-mock.com/notes')
export const history = createBrowserHistory()
