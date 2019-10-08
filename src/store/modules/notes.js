const state = {
  notes: []
};

const getters = {
  getNotes: (state) => state.notes
};

const mutations = {
  saveNote(state, note) {
    state.notes.push(note);
  },
  deleteNote(state, noteIndex) {
    state.notes.splice(noteIndex, 1);
  },
  editNoteSaved(state, payload) {
    state.notes.splice(payload.index, 1, payload.note);
    console.log("Note", payload.index, "has been edited");
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
