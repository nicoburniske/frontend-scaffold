/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'https://evil-otter-24.localtunnel.me',
  timeout: 10000,
});

const state = {
  notes: [],
};

const getters = {};

const mutations = {
  saveNote(state, note) {
    state.notes.push(note);
  },
  deleteNote(state, noteID) {
    // state.notes.splice(noteIndex, 1);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < state.notes.length; i++) {
      if (state.notes[i].id === noteID) {
        state.notes.splice(i, 1);
        break;
      }
    }
  },
  editNoteSaved(state, payload) {
    state.notes.splice(payload.index, 1, payload.note);
    // eslint-disable-next-line no-console
    console.log('Note', payload.index, 'has been edited');
  },
  setAllNotes(state, notes) {
    state.notes = notes;
  },
};

// chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
const actions = {
  // context contains the following: commit, state, getters, dispatch.
  // I deconstructed the object to only have access to commit, since it's the only thing I need.
  async retrieveNotes({ commit }) {
    try {
      const url = '/api/announcement';
      const notesRetrieved = await backendAPI.get(url);
      // eslint-disable-next-line no-console
      console.log('working');
      // need to remap the key for content and omit unused properties
      const notes = notesRetrieved.data.map(note => ({
        id: note.id,
        title: note.title,
        content: note.body,
      }));
      commit('setAllNotes', notes);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.response.data);
      // eslint-disable-next-line no-console
      console.log(error.response.status);
      // eslint-disable-next-line no-console
      console.log(error.response.headers);
      // eslint-disable-next-line no-console
      console.log('Could not retrieve notes');
    }
  },

  async createNote(context, note) {
    try {
      const url = '/api/announcement';
      note.body = note.content;
      delete note.content;
      note.id = -1;
      note.date = 'fake date';
      const noteCreated = await backendAPI.post(url, note);
      // eslint-disable-next-line no-console
      console.log(noteCreated.data, noteCreated.status);
      context.commit('saveNote', noteCreated);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, 'Could not retrieve notes');
    }
  },

  async deleteNote(context, noteID) {
    try {
      const url = '/api/announcement/del';
      const data = { id: noteID };
      const response = await backendAPI.delete(url, { data });
      // eslint-disable-next-line no-console
      console.log(response.data, response.status);
      // check if the deletion is valid and exists yada yada yada
      context.commit('deleteNote', noteID);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, 'Could not retrieve notes');
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
