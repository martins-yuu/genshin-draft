<script lang="ts">
  import { Copy, RotateCcw, X } from 'lucide-svelte'

  export let key: string
  export let value: any
  export let resetHandler: (() => void) | undefined = undefined

  let show = false
</script>

<svelte:window
  on:keydown={event => {
    if (event.key === key && event.altKey) show = !show
  }}
/>

<div
  class="fixed bottom-4 left-4 right-4 z-20 select-text rounded bg-base-300/50 p-4 text-base-content shadow backdrop-blur lg:left-2/3"
  class:hidden={!show}
>
  <button
    on:click={() => (show = false)}
    class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
  >
    <X size={16} />
  </button>
  <div class="absolute bottom-2 right-2 inline-flex gap-2">
    <button
      on:click={resetHandler}
      class="btn btn-circle btn-error btn-outline btn-sm"
      class:hidden={!resetHandler}
    >
      <RotateCcw size={16} />
    </button>
    <button
      on:click={async () => navigator.clipboard.writeText(JSON.stringify(value, null, 2))}
      class="btn btn-circle btn-ghost btn-sm"
    >
      <Copy size={16} />
    </button>
  </div>
  <pre class="scrollbar-none max-h-96 overflow-auto">{JSON.stringify(value, null, 2)}</pre>
</div>
