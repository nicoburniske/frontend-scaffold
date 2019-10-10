<template>
  <div class="center">
    <notes-form class="form" v-on:saveNote="saveNote($event)" />
    <notes-display class="notes" :notes="notes" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotesForm from './NotesForm/NotesForm';
import NotesDisplay from './NoteDisplay/NotesDisplay';

export default {
  name: 'Notes',
  components: {
    NotesForm,
    NotesDisplay,
  },
  data() {
    return {};
  },
  methods: {},
  computed: mapState({
    notes: state => state.notes.notes,
    // mapState(['notes']), returns an object instead of an array?
  }),
};
</script>

<style lang="less" scoped>
.center {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
