<template>
  <div class="center">
    <notes-form class="form" v-on:saveNote="saveNote($event)" />
    <notes-display class="notes" :notes="notes" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotesForm from './NotesForm/NotesForm.vue';
import NotesDisplay from './NoteDisplay/NotesDisplay.vue';

export default {
  name: 'Notes',
  components: {
    NotesForm,
    NotesDisplay,
  },
  data() {
    return {
      // put 0 if you don't want any notes to be retrieved from the api.
      notesRetrieved: 3,
    };
  },
  computed: mapState({
    notes: state => state.notes.notes,
    // mapState(['notes']), returns an object instead of an array?
  }),
  mounted() {
    this.$store.dispatch('retrieveNotes', this.notesRetrieved);
  },
};
</script>

<style lang="less" scoped>
.center {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
