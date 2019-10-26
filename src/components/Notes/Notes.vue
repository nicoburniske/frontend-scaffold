<template>
    <div class="center">
        <notes-form v-on:saveNote="saveNote($event)"/>
        <notes-display
            :notes="notes"
            v-on:delete-note="deleteNote($event)"
            v-on:edit-note-saved="editNoteSaved"
            />
    </div>
</template>

<script>
import NotesForm from './NotesForm/NotesForm';
import NotesDisplay from './NoteDisplay/NotesDisplay';

export default {
  name: 'Notes',
  components: {
    NotesForm,
    NotesDisplay,
  },
  data() {
    return {
      notes: [], // a note has a title and content
    };
  },
  methods: {
    saveNote(note) {
      this.notes.push(note);
    },
    deleteNote(noteIndex) {
      this.notes.splice(noteIndex, 1);
    },
    editNoteSaved(note, noteIndex) {
      this.notes.splice(noteIndex, 1, note);
      // eslint-disable-next-line no-console
      console.log('Note', noteIndex, 'has been edited');
    },
  },
};
</script>

<style scoped>
.center {
  display: -webkit-box;
}
</style>
