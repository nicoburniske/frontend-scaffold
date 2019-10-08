import axios from "axios";

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

const actions = {
  //context contains the following: commit, state, getters, dispatch.
  //I deconstructed the object to only have access to commit, since it's the only thing i need.
  async retrieveNotes({ commit }, numComments = 5) {
    try {
      let url = `https://jsonplaceholder.typicode.com/posts?_limit=${numComments}`;
      let notesRetrieved = await axios.get(url);
      notesRetrieved.data.forEach(note =>
        commit('saveNote', {
          title: note.title,
          content: note.body
        })
      )
    } catch (e) {
      console.log(e);
      console.log("Could not retrieve notes")
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
