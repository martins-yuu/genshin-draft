<script lang="ts" context="module">
  export type DividerVariants = VariantProps<typeof divider>

  export const divider = tv({
    base: 'divider',
    variants: {
      horizontal: {
        true: 'divider-horizontal',
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import Badge, { type BadgeVariants } from '$lib/components/Badge.svelte'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLDivElement>, DividerVariants {}

  export let horizontal: $$Props['horizontal'] = undefined
  export let intent: BadgeVariants['intent'] = 'neutral'
  export let size: BadgeVariants['size'] = 'lg'
</script>

<div class={divider({ horizontal, class: $$props.class })}>
  {#if $$slots.default}
    <Badge {intent} {size}>
      <slot />
    </Badge>
  {/if}
</div>
