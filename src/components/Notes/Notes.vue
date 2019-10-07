<template>
  <div class="center">
    <notes-form class="form" v-on:saveNote="saveNote($event)" />
    <notes-display
      class="notes"
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
            notes: [], //a note has a title and content
        };
    },
    methods: {
        saveNote: function(note) {
            this.notes.push(note);
        },
        deleteNote: function(noteIndex) {
            this.notes.splice(noteIndex, 1);
        },
        editNoteSaved: function(note, noteIndex){
            this.notes.splice(noteIndex, 1, note);
            console.log("Note", noteIndex, "has been edited")
            
        }
    }
};
</script>

<style lang="less" scoped>
.center {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
