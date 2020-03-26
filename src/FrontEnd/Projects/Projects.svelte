<svelte:options accessors={true}/>

<script>
import Project from './Project/Project.svelte';
export let container;
</script>

<style>

    .projects-container {

        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 0;
        margin: 0;

    }

</style>

<div bind:this={container} class = "projects-container">
    <Project name = {"Spiritual Beings"} />
    <Project name = {"SKEN"} />
</div>