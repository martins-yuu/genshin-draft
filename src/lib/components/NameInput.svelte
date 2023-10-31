<script lang="ts">
  export let value: string | undefined = undefined
</script>

<input
  type="text"
  {...$$props}
  bind:value
  class="btn btn-ghost no-animation w-full max-w-xs cursor-text text-3xl normal-case outline-none focus:btn-active [&:not(:hover,:focus)]:placeholder:text-base-content"
/>
