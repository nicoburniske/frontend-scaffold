<template>
    <div class="header">
        <router-link to="/" tag="button">Home</router-link>
        <router-link to="/journal" tag="button">Journal</router-link>
        <router-link to="/notes" tag="button">Notes</router-link>
    </div>
</template>

<style lang="less" scoped>
    .header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background-color: rgb(192, 189, 189);
        height: 5em;
        border-radius: 0.5em;
        padding: 0em 1.5em;

        button {
            width: 6.5em;
            height: 3em;
            margin: 0em 0.75em;
            border-radius: 0.5em;
            background-color: rgb(112, 231, 235);
            border: none;
        }
    }
</style>
