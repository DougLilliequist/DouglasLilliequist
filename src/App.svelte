<script>

import {onMount} from 'svelte';
import Projects from './FrontEnd/Projects/Projects.svelte';
import WebGL from './WebGL/WebGL.svelte';

let projects;

onMount(() => {
    console.log('hi');
    console.log(projects.container)
});

</script>

<Projects container ={projects} bind:this={projects}/>
<WebGL />