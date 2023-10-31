<script lang="ts" context="module">
  export interface Item {
    name: string
    icon: string
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { slide } from 'svelte/transition'
  import { cubicInOut as easing } from 'svelte/easing'
  import { Dices, X } from 'lucide-svelte'

  const dispatch = createEventDispatcher()

  let previous: typeof selected

  $: {
    ;(() => {
      if (selected === undefined) return
      if (selected === '') return
      if (JSON.stringify(previous) === JSON.stringify(selected)) return

      previous = selected
      dispatch('select', selected)
    })()
  }

  export let items: Item[] = []
  export let size: number | undefined = undefined
  export let color: string | undefined = undefined
  export let hexagon = false
  export let selected: Item | undefined | null | '' = undefined

  const selectRandom = () => (selected = items.at(Math.floor(Math.random() * items.length)))
</script>

<div
  class="group inline-grid place-items-center items-end transition-[filter] hover:animate-pulse hover:brightness-150 hover:hue-rotate-15 [&>*]:col-start-1 [&>*]:row-start-1"
>
  <select
    bind:value={selected}
    class="select select-ghost select-xs z-10 w-24 bg-transparent focus:outline-none"
    class:hidden={selected}
    style:width={`${size}rem`}
  >
    <option disabled selected class="hidden" />
    {#each items as item}
      <option value={item} class="bg-base-100 text-base">{item.name}</option>
    {/each}
  </select>
  <div class="avatar placeholder">
    <button
      on:click={selectRandom}
      class="btn btn-circle btn-neutral btn-xs invisible absolute right-2 top-2 z-10"
      class:group-hover:visible={!selected}
    >
      <Dices size={16} />
    </button>
    <button
      on:click={() => (selected = null)}
      class="btn btn-circle btn-error btn-xs invisible absolute bottom-2 right-2 z-10"
      class:group-hover:visible={selected}
    >
      <X size={16} />
    </button>
    <div
      class="rounded-box glass w-24 bg-neutral-focus text-neutral-content ring-2 ring-neutral ring-offset-2 ring-offset-base-100 transition-colors group-hover:text-primary"
      class:delay-500={color}
      class:mask={hexagon}
      class:mask-hexagon-2={hexagon}
      style:width={`${size}rem`}
      style:background-color={color}
    >
      {#if selected}
        <img in:slide={{ easing }} src={selected.icon} alt={selected.name} />
      {:else}
        <slot />
      {/if}
    </div>
  </div>
</div>
