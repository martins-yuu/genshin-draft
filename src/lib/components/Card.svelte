<script lang="ts" context="module">
  export type CardVariants = VariantProps<typeof card>

  export const card = tv({
    slots: {
      base: 'card w-fit bg-base-100',
      body: 'card-body items-center gap-4',
    },
    variants: {
      bg: {
        200: {
          base: 'bg-base-200',
        },
        300: {
          base: 'bg-base-300',
        },
        none: {
          base: 'bg-transparent',
        },
      },
      bordered: {
        true: {
          base: 'border-y border-base-content/20',
        },
      },
      glass: {
        true: {
          base: 'bg-base-100/50 shadow-2xl shadow-base-300/20 backdrop-blur backdrop-saturate-150',
        },
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLDivElement>, CardVariants {}

  export let bg: $$Props['bg'] = undefined
  export let bordered: $$Props['bordered'] = undefined
  export let glass: $$Props['glass'] = undefined

  $: ({ base, body } = card({ bg, bordered, glass }))
</script>

<div class={base({ class: $$props.class })}>
  <div class={body()}>
    <slot />
  </div>
</div>
