const state = {
  notes: [],
};

const getters = {
  allNotes: state => state.notes,
};

const mutations = {
  saveNote: (state, payload) => {
    state.notes.push(payload.note);
  },
  editNote: (state, payload) => {
    state.notes[payload.noteIndex] = Object.assign({}, payload.note);
  },
  deleteNote: (state, payload) => {
    state.notes.splice(payload.noteIndex, 1);
  },
};


export default {
  state,
  getters,
  mutations,
};

