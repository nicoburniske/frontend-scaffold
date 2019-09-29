<template>
    <div class="center">
        <notes-form v-on:saveNote="saveNote($event)"/>
        <notes-display 
            :notes="notes"
            v-on:delete-note="deleteNote($event)"
            v-on:edit-note="editNote($event)"
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
        editNote: function(note, noteIndex) {
            console.log('edit note in notes');
            console.log(noteIndex);
            console.log(note);
            this.notes[noteIndex] = Object.assign({}, note);
        },
        deleteNote: function(noteIndex) {
            this.notes.splice(noteIndex, 1);
        }
    }
};
</script>

<style scoped>
.center {
  display: -webkit-box;
}
</style>
