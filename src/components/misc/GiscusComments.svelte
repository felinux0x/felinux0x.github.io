<script lang="ts">
import { onMount } from 'svelte';
import { siteConfig } from '@/config';

// Removed unused path prop

let container: HTMLElement;

onMount(() => {
    if (!siteConfig.giscus) return;

    const script = document.createElement('script');
    const config = siteConfig.giscus;

    script.src = "https://giscus.app/client.js";
    script.setAttribute('data-repo', config.repo);
    script.setAttribute('data-repo-id', config.repoId);
    script.setAttribute('data-category', config.category);
    script.setAttribute('data-category-id', config.categoryId);
    script.setAttribute('data-mapping', config.mapping);
    script.setAttribute('data-strict', "0");
    script.setAttribute('data-reactions-enabled', config.reactionsEnabled);
    script.setAttribute('data-emit-metadata', config.emitMetadata);
    script.setAttribute('data-input-position', config.inputPosition);
    script.setAttribute('data-theme', config.theme);
    script.setAttribute('data-lang', config.lang);
    script.setAttribute('data-loading', config.loading);
    script.setAttribute('crossorigin', "anonymous");
    script.async = true;

    container.appendChild(script);
});
</script>

<div class="mt-8 giscus-container" bind:this={container}></div>

<style>
    .giscus-container {
        width: 100%;
        min-height: 150px;
    }
</style>
