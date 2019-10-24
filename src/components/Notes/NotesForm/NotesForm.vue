<template>
  <div class="form" v-bind:class="{edit: isEditForm}" >

    <h3 v-if="isEditForm">Edit Note</h3>
    <h3 v-else>Notes Form</h3>

    <p>Title:</p>
    <textarea
      v-model="note.title"
      cols="30"
      :class="{showInvalidItems: showInvalidFormItems && !noteVerification.title}"
    />
    <p
      v-if="showInvalidFormItems && !noteVerification.title"
      class="errorMessage"
    >Please enter a title!</p>
    <p>Enter your note here:</p>
    <textarea
      v-model="note.content"
      rows="20"
      cols="30"
      :class="{showInvalidItems: showInvalidFormItems && !noteVerification.content}"
    />
    <p
      v-if="showInvalidFormItems && !noteVerification.content"
      class="errorMessage"
    >Please enter a note!</p>
    <button @click="saveNote()">Save Note</button>
    <button @click="resetNote()" class="showInvalidItems">Clear Note</button>
  </div>
</template>

<script>
export default {
  name: 'NotesForm',
  props: {
    isEditForm: {
      type: Boolean,
      default: false,
    },
    editNote: {
      type: Object,
      default: () => ({
        title: '',
        content: '',
      }),
    },
    editNoteIndex: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      note: Object,
      showInvalidFormItems: false,
    };
  },
  watch: {
    editNote: {
      immediate: true,
      handler() {
        this.note = Object.assign({}, this.editNote);
      },
    },
    noteVerification(newNoteVerification) {
      if (newNoteVerification === true) {
        this.showInvalidFormItems = false;
      }
    },
  },
  computed: {
    // This probably isn't the best idea to have a computed function here because
    // anytime the note changes, this function is called. It might be better to have
    // this array be in data and only check if its verified when they submit. But it's
    // extremely more important to understand computed functions and their power so
    // I used one here.
    noteVerification() {
      const verifiedObject = {
        title: false,
        content: false,
      };

      if (this.note.title !== '') {
        verifiedObject.title = true;
      }

      if (this.note.content !== '') {
        verifiedObject.content = true;
      }

      // This is also probably a pretty bad idea because these both technically return true
      // since verifiedObject is nonZero, I did this mainly so that I could put out this
      // scaffold quickly and it also points out some of the downfalls of js: that you can
      // return and take in anything unlike a something like java where you need to declare
      // types.
      // Also this is called a ternary operator. If the statement before the question mark is
      // true, it returns whats before the colon, else it returns whats after the colon
      return verifiedObject.title && verifiedObject.content
        ? true
        : verifiedObject;
    },
  },
  methods: {
    resetNote() {
      this.note = {
        _id: Math.floor(Math.random() * Math.random() * 10000000),
        title: '',
        content: '',
      };
      this.showInvalidFormItems = false;
    },
    saveNote() {
      if (this.noteVerification === true) {
        // eslint-disable-next-line no-console
        console.log('working');
        if (this.isEditForm) {
          // eslint-disable-next-line no-console
          console.log('Editing note', this.editNoteIndex);
          this.$emit('edit-note-saved', this.note, this.editNoteIndex);
        } else {
          this.$emit('saveNote', this.note);
          this.resetNote();
        }
      } else {
        this.showInvalidFormItems = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 35%;
  align-items: center;

  button {
    width: 5em;
    background-color: rgb(112, 231, 235);
    margin-top: 1em;
    border-radius: 0.5em;
    border: none;
  }

  .errorMessage {
    color: red;
  }

  .showInvalidItems {
    background-color: rgb(240, 187, 187);
  }
}

.edit{
  width: 100%;
}
</style>
