<template>
    <div>
        <div class="note">
            <div v-if="!editState">
                <h4>Title: {{note.title}}</h4>
                <p>{{note.content}}</p>
                <button @click="editState = true">Edit</button>
                <button @click="$emit('delete-note', noteIndex)">Delete</button> 
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
import NotesForm from '../NotesForm/NotesForm';

export default {
    name: 'note-display',
    components: {
        NotesForm
    },
    props: {
        note: {
            type: Object,
            required: true,
        },
        noteIndex: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            editState: false,
        }
    },
    methods: {
        editNoteSaved: function(note, noteIndex){
            console.log("Editing note", noteIndex)
            this.$emit('edit-note-saved', note, noteIndex);
            this.editState = false;
        }
    }
}
</script>

<style scoped>
.note {   
    border: solid;
    border-radius: 1em;
    border-color: grey;
    width: 30em;
    margin: 0.5em;
}
</style>

