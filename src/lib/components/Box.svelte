<script lang="ts" context="module">
  export type BoxVariants = VariantProps<typeof box>

  export const box = tv({
    base: 'rounded-box bg-base-200 p-4',
  })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLDivElement>, BoxVariants {}
</script>

<div class={box({ class: $$props.class })}>
  <slot />
</div>
