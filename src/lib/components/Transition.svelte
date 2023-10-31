<script lang="ts">
  import { fly } from 'svelte/transition'

  export let key: unknown
</script>

{#key key}
  <div in:fly={{ y: 100, duration: 300 }}>
    <slot />
  </div>
{/key}
