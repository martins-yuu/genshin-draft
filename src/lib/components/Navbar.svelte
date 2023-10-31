<script lang="ts" context="module">
  export type NavbarVariants = VariantProps<typeof navbar>

  export const navbar = tv({
    slots: {
      base: 'navbar bg-base-100 border-base-content/20',
      start: 'navbar-start gap-2',
      center: 'navbar-center gap-2',
      end: 'navbar-end gap-2',
    },
    variants: {
      rounded: {
        t: 'rounded-t-box',
        b: 'rounded-b-box',
        true: 'rounded-box',
      },
      bordered: {
        t: 'border-t',
        b: 'border-b',
        y: 'border-y',
        true: 'border',
      },
      glass: {
        true: 'bg-base-100/50 backdrop-blur backdrop-saturate-150',
      },
      gap: {
        4: {
          base: 'p-4',
          start: 'gap-4',
          center: 'gap-4',
          end: 'gap-4',
        },
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLDivElement>, NavbarVariants {}

  export let rounded: $$Props['rounded'] = undefined
  export let bordered: $$Props['bordered'] = undefined
  export let glass: $$Props['glass'] = undefined
  export let gap: $$Props['gap'] = undefined

  $: ({ base, start, center, end } = navbar({ rounded, bordered, glass, gap }))
</script>

<div class={base({ class: $$props.class })}>
  <div class={start()}>
    <slot name="start" />
  </div>
  <div class={center()}>
    <slot name="center" />
  </div>
  <div class={end()}>
    <slot name="end" />
  </div>
</div>
