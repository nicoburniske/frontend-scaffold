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
            v-on:edit-note="$emit('edit-note', $event)"
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
};
</script>

<style lang="less" scoped>
</style>