<template>
  <div class="header">
    <div class="title">
      <router-link to="/" tag="h3">C4C Scaffold</router-link>
    </div>

    <div class="navlinks">
      <router-link to="/" tag="button">Home</router-link>
      <router-link to="/journal" tag="button">Journal</router-link>
      <router-link to="/notes" tag="button">Notes</router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 8vh;
  background-color: var(--header-color);
  font-family: var(--main-font);

  .title {
    text-transform: uppercase;
    letter-spacing: 6px;
  }
  .navlinks {
    display: flex;
    justify-content: space-around;
    width: 25%;
  }
  button {
    display: block;
    width: 5em;
    height: 5em;
    letter-spacing: 4px;
    font-weight: bold;
    background: none;
    text-decoration: none;
    border: none;
    outline: none;
  }
  button:hover {
    color: white;
  }
}
</style>
