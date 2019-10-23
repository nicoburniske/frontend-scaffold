<template>
    <div class="center">
        <notes-form />
        <notes-display />
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
    }
};
</script>

<style scoped>
.center {
  display: -webkit-box;
}
</style>
