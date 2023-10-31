<script lang="ts">
  export let glass: boolean = false
</script>

<div
  class="flex w-screen -skew-y-6 flex-col items-center justify-center gap-2 border-y border-y-base-content/20 bg-gradient-to-b from-base-100 to-base-200/50 p-6"
  class:backdrop-blur={glass}
  class:backdrop-saturate-150={glass}
>
  <slot />
  <div class="absolute -z-10 h-full w-full max-w-prose -skew-x-12 bg-base-300/50" />
</div>
