<script lang="ts">
  export let min: number
  export let sec: number
  export let isRunning: boolean
</script>

<div
  class="rounded-box flex flex-col border border-base-content/20 bg-neutral/50 p-2 text-neutral-content"
  class:bg-primary-focus={isRunning}
  class:text-primary-content={isRunning}
>
  <span class="countdown font-mono text-4xl">
    <span style="--value:{min};" />
    :
    <span style="--value:{sec};" />
  </span>
</div>
