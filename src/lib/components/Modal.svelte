<script lang="ts" context="module">
  export type ModalVariants = VariantProps<typeof modal>

  export const modal = tv({
    slots: {
      base: 'modal bg-neutral-focus/40',
      body: 'col-start-1 row-start-1',
      backdrop: 'modal-backdrop',
    },
    variants: {
      box: {
        true: {
          body: 'modal-box',
        },
      },
      glass: {
        true: {
          base: 'backdrop:backdrop-blur-sm',
        },
      },
      close: {
        overlay: {
          backdrop: 'z-10',
        },
        disable: {
          backdrop: 'pointer-events-none',
        },
      },
      gap: {
        2: {
          body: 'flex flex-col gap-2',
        },
        4: {
          body: 'flex flex-col gap-4',
        },
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLDialogAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLDialogAttributes, ModalVariants {
    dialog: HTMLDialogElement
  }

  export let dialog: HTMLDialogElement
  export let box: $$Props['box'] = undefined
  export let glass: $$Props['glass'] = undefined
  export let close: $$Props['close'] = undefined
  export let gap: $$Props['gap'] = undefined

  $: ({ base, body, backdrop } = modal({ box, glass, close, gap }))
</script>

<dialog bind:this={dialog} on:cancel|preventDefault class={base({ class: $$props.class })}>
  <form method="dialog" class={body()}>
    <slot />
  </form>
  <form method="dialog" class={backdrop()}>
    <button>Close</button>
  </form>
</dialog>
