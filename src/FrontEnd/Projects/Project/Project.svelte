<script>

export let name = "project";
export let videoUrl = "";

console.log(name);

</script>

<style>

    .project {

        width: 50vw;
        height: 50vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

</style>

<div class = "project" bind:this={name}>
    <source src={videoUrl}>
</div>