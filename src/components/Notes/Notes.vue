<template>
  <div class="center">
    <notes-form class="form" v-on:saveNote="saveNote($event)" />
    <notes-display class="notes" :notes="getNotes" />
  </div>
</template>

<script>
import NotesForm from "./NotesForm/NotesForm";
import NotesDisplay from "./NoteDisplay/NotesDisplay";
import { mapGetters } from "vuex";

export default {
  name: "Notes",
  components: {
    NotesForm,
    NotesDisplay
  },
  data() {
    return {};
  },
  methods: {},
  computed: mapGetters(["getNotes"])
};
</script>

<style lang="less" scoped>
.center {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
