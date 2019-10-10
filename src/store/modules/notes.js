/* eslint-disable no-shadow */
import axios from 'axios';

const backendAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts',
  timeout: 1000,
  headers: {},
});

const state = {
  notes: [],
};

const getters = {};

const mutations = {
  saveNote(state, note) {
    state.notes.push(note);
  },
  deleteNote(state, noteIndex) {
    state.notes.splice(noteIndex, 1);
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

const actions = {
  // context contains the following: commit, state, getters, dispatch.
  // I deconstructed the object to only have access to commit, since it's the only thing I need.
  async retrieveNotes({ commit }, numComments = 5) {
    try {
      const url = `?_limit=${numComments}`;
      const notesRetrieved = await backendAPI.get(url);
      // eslint-disable-next-line no-console
      console.log('working');
      // need to remap the key for content and omit unused properties
      const notes = notesRetrieved.data.map(note => ({
        title: note.title,
        content: note.body,
      }));
      commit('setAllNotes', notes);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      // eslint-disable-next-line no-console
      console.log('Could not retrieve notes');
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
