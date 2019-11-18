<template>
  <div>
    <h3>Your notes:</h3>
    <h5 v-if="notes.length === 0">Start taking some notes!</h5>
    <note-display
      v-for="(note, index) in notes"
      :key="note._id"
      :note="note"
      :note-index="index"
    />
  </div>
</template>

<script>
import NoteDisplay from './NoteDisplay.vue';

export default {
  name: 'NotesDisplay',
  components: {
    NoteDisplay,
  },
  props: {
    notes: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style scoped>
* {
  margin: 1em;
}
.notes {
  grid-column-start: 2;
  justify-self: center;

  display: flex;
  flex-direction: column;
}
</style>
