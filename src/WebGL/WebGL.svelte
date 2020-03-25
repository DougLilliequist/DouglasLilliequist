<script>
    
    import {onMount} from 'svelte'
        
    import WebGLContext from './WebGLContext.js';
        
    let canvasContainer;
        
    onMount(() => {
        
        const webGLContext = new WebGLContext(canvasContainer);
        
    });
        
</script>
        
<style>    
    .canvas-container {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        z-index: -1;
    }
</style>
        
<div class = "canvas-container" bind:this = {canvasContainer}>
</div>