<script lang="ts" context="module">
  export type BadgeVariants = VariantProps<typeof badge>

  export const badge = tv({
    base: ['badge', 'font-bold', 'uppercase'],
    variants: {
      intent: {
        neutral: 'badge-neutral',
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        accent: 'badge-accent',
        ghost: 'badge-ghost',
        info: 'badge-info',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
      },
      outline: {
        true: 'badge-outline',
      },
      size: {
        xs: 'badge-xs',
        sm: 'badge-sm',
        md: 'badge-md',
        lg: 'badge-lg',
      },
      state: {
        info: 'badge-info',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

  export let intent: $$Props['intent'] = undefined
  export let outline: $$Props['outline'] = undefined
  export let size: $$Props['size'] = undefined
  export let state: $$Props['state'] = undefined
</script>

<span class={badge({ intent, outline, size, state, class: $$props.class })}>
  <slot />
</span>
