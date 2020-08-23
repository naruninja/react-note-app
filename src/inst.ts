import { NoteApi } from '_/noteApi'
import { createBrowserHistory } from 'history'

const noteApiUrl = process.env.NOTE_API_URL
export const noteApi = new NoteApi(noteApiUrl)
export const history = createBrowserHistory()

