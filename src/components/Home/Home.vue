<template>
  <div class="home">
    <h1>Home</h1>
    <p>Lets list everyone on the team.</p>
    <!-- Using class like this applies css to the html element -->
    <p class="blue">Click on each name to toggle it from black to blue!</p>
    <!-- Before you keep on reading, checkout how I imported names as data down below. -->

    <!-- v-for basically renders any element in a for loop. Here, are doing it for each object
      in the names array. We also are tracking the index of each element so that we can use it
      as the key, but this is bad practice-->
    <!-- this :class tag is different from the one above. If it has ':' in front of it, that
      means that vue is handling it. What this does is it renders css styling conditionally. So if
      name.nameIsBlue is true, it applies the css.-->
    <!-- we are toggling nameIsBlue using @click. @click triggers the event whenever the html
      element is clicked. There are other ones like @hover and bunch of things you can look into,
      but this is the most common. So when we click a name, it toggles nameIsBlue in the object
      from the array from true to false-->
    <p
      v-for="(name, index) in names"
      :key="index"
      :class="{blue: name.nameIsBlue}"
      @click="name.nameIsBlue = !name.nameIsBlue"
    >
      <!-- This is how we render dynamic data in vue. Use mustaches and whenever the data changes
        vue reflects the change. This is the main power of modern js frameworks like vue,
        react or angular-->
      {{name.name}}
    </p>
    <p>
      Note: you should never use index as the key, but this is just an example.
      Our backend will provide unique keys
    </p>
    <p>
      <strong>For an explanation of how this all works, read through the Home.vue file.</strong>
    </p>
  </div>
</template>

<script>
// This is an array imported from names.js
// I chose to make it another file because its really long and would make the file
// unreadable if we had things like methods and mixins in this vue template.
// If you look at the names.js file, I'm just exporting the variable that I define the file.

// If you want to read more about how variables are declared go to the bottom of this file.

// Now we move into what vue is exporting in export default. In the same way that we exported
// the array of names, this export default exports the component 'Home' so that we can use it
// anywhere in our project

import names from './names';

export default {
  // name sets what the tag will be when you use the component in your template
  // its good practice to always assign a name
  name: 'Home',
  // I don't really want to get into why data is a function, but if you're curious, it'd be pretty
  // interesting to google it.
  data() {
    return {
      // here we are letting vue know variables it has access to in the template
      // this is how it knows what to display when you put data in {{}} braces.
      // this object also allows vue to track changes, so if you end up changing the variable
      // in a method, the vue template (the html) will reflect these changes immediately (unless
      // you set up wrong which is the bain of frontend dev, but we will try and learn as we go)
      // Also writing names like this is the equivalent of saying names: names,
      names,
    };
  },
};

// VARIABLES
// There are two ways to define variables in javascript, 'let' and 'const'. So let means that
// your defining an object that will be manipulated. let x = 3; then you want to multiply x by 2.
// Thats when to use let. Const is better though because it constricts you to not manipulating the
// variable. But, as you see, I made the names array a const
// even though were toggling a variable within it: nameIsBlue. This is completely fair game. Each
// element in names has its own memory address so you can manipulate those. You just cant reassign
// names = [1, 2, 3, 4] because that's changing what the memory address at names points to. This
// also means that adding/removing elements to names is completely fine because names is still
// pointing the same array. Basically all of this is to say its best practice to use const and
// it gives you a little insight into how js works behind the hood.
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home > * {
  margin: 1em;
}
.blue {
  color: blue;
}
</style>
