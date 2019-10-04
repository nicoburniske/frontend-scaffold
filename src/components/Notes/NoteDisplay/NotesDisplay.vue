<template>
    <div>
        <h3>Your notes:</h3>
        <h5 v-if="notes.length === 0">Start taking some notes!</h5>
        <note-display 
            v-for="(note, index) in notes" 
            :key="note._id" 
            :note="note" 
            :note-index="index"
            v-on:delete-note="$emit('delete-note', $event)"
            v-on:edit-note-saved="editNoteSaved"
        />
    </div>
</template>

<script>
import NoteDisplay from './NoteDisplay';

export default {
    name: 'NotesDisplay',
    components: {
        NoteDisplay
    },
    props: {
        notes: {
            type: Array,
            required: true,
        },
    },
    methods: {
        editNoteSaved: function(note, noteIndex){
            console.log("Editing note", noteIndex)
            this.$emit('edit-note-saved', note, noteIndex);
        }
    }
};
</script>

<style lang="less" scoped>
  .notes{
      display: flex;
      flex-direction: column;
  }
</style>