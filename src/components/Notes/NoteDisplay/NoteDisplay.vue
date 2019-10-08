<template>
  <div>
    <div class="note">
      <div v-if="!editState">
        <h4>Title: {{ note.title }}</h4>
        <p>{{ note.content }}</p>
        <button @click="editState = true">Edit</button>
        <button @click="deleteNote(noteIndex)">Delete</button>
      </div>
      <div v-else>
        <notes-form
          :isEditForm="true"
          :editNote="note"
          :editNoteIndex="noteIndex"
          v-on:edit-note-saved="editNoteSaved"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import NotesForm from '../NotesForm/NotesForm';

export default {
  name: 'note-display',
  components: {
    NotesForm,
  },
  props: {
    note: {
      type: Object,
      required: true,
    },
    noteIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      editState: false,
    };
  },
  methods: {
    ...mapMutations(['deleteNote']),
    editNoteSaved() {
      this.editState = false;
    },
  },
};
</script>


<style lang="less" scoped>
* {
  margin: 1em;
}
.note {
  border: solid;
  border-radius: 1em;
  border-color: grey;
  width: 25em;
}
button {
  font-family: var(--main-font);
  font-size: 1.2;
  padding: 0.25em;
  width: 6em;
  height: 2em;
  background-color: rgb(112, 231, 235);
  margin-top: 1em;
  border-radius: 0.5em;
  border: none;
  outline: none;
}
</style>
