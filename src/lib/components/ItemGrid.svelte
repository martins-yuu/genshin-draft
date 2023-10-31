<script lang="ts" context="module">
  export interface GridData {
    items: Item[]
    positions: number[]
    placeholder?: unknown
  }
</script>

<script lang="ts">
  import { createEventDispatcher, type ComponentEvents } from 'svelte'
  import ItemSelector, { type Item } from '$lib/components/ItemSelector.svelte'

  const dispatch = createEventDispatcher()

  export let data: GridData[] = []
  export let cols: number | undefined = undefined
  export let size: number | undefined = undefined
  export let color: string | undefined = undefined
  export let hexagon = false
  export let selected: Item[] = []
  export let itemCount = data.flatMap(d => d.positions).length
</script>

<div
  class="grid grid-cols-[repeat(4,6rem)] gap-4"
  style:grid-template-columns={`repeat(${cols},${size}rem)`}
>
  {#each Array(itemCount) as _, i}
    {@const { items, placeholder = '' } = { ...data.find(d => d.positions.includes(i)) }}
    <ItemSelector on:select {items} {size} {color} {hexagon} bind:selected={selected[i]}>
      {@html placeholder}
    </ItemSelector>
  {/each}
</div>
