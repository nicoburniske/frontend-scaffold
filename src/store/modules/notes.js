/* eslint-disable no-shadow */
import axios from 'axios';

const state = {
  notes: [],
};

const getters = {
  getNotes: state => state.notes, // should we send a copy?
};

const mutations = {
  saveNote(state, note) {
    // state.notes.push(note);   //is mutation the best option here?
    state.notes = [...state.notes, note];
  },
  deleteNote(state, noteIndex) {
    state.notes.splice(noteIndex, 1);
  },
  editNoteSaved(state, payload) {
    state.notes.splice(payload.index, 1, payload.note);
    // eslint-disable-next-line no-console
    console.log('Note', payload.index, 'has been edited');
  },
};

const actions = {
  // context contains the following: commit, state, getters, dispatch.
  // I deconstructed the object to only have access to commit, since it's the only thing I need.
  async retrieveNotes({ commit }, numComments = 5) {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts?_limit=${numComments}`;
      const notesRetrieved = await axios.get(url);
      // commit('saveNote', ...notesRetrieved.data) this would work but the keys don't match up
      notesRetrieved.data.forEach(note =>
        commit('saveNote', {
          title: note.title,
          content: note.body,
        }),
      );
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
