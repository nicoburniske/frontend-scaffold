<template>
  <div>
    <div class="note">
      <div v-if="!editState">
        <h4>Title: {{ note.title }}</h4>
        <p>{{ note.content }}</p>
        <button @click="editState = true">Edit</button>
        <button @click="confirmDeleteNote(noteIndex)">Delete</button>
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
import deleteNote from '../../../store/modules/notes';

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
    confirmDeleteNote(state, noteIndex) {
      this.$modal.show('dialog', {
      title: 'Confirm',
      text: 'Are you sure you would like to delete: '+ this.note.title +'?',
      buttons: [
        {
          title: 'Yes',
          handler: () => { 
            this.deleteNote(noteIndex);
            this.$modal.hide('dialog');
          },
        },
        {
          title: '',       // Button title
          default: true,    // Will be triggered by default if 'Enter' pressed.
          handler: () => {} // Button click handler
        },
        {
          title: 'No',
        },
      ], 
      'before-close': (event) => { console.log('this will be called before the modal closes'); },
    });
    },
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
  margin: 0em;
  text-align: center;
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
