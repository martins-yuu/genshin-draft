<script lang="ts" context="module">
  export type ButtonVariants = VariantProps<typeof button>

  export const button = tv({
    base: 'btn',
    variants: {
      intent: {
        neutral: 'btn-neutral',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        link: 'btn-link',
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
      },
      active: {
        true: 'btn-active',
      },
      state: {
        info: 'btn-info',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
      },
      outline: {
        true: 'btn-outline',
      },
      size: {
        xs: 'btn-xs',
        sm: 'btn-sm',
        lg: 'btn-lg',
      },
      wide: {
        true: 'btn-wide',
      },
      glass: {
        true: 'btn-glass',
      },
      square: {
        true: 'btn-square',
      },
      circle: {
        true: 'btn-circle',
      },
      block: {
        true: 'btn-block',
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLButtonAttributes, ButtonVariants {}

  export let intent: $$Props['intent'] = undefined
  export let active: $$Props['active'] = undefined
  export let state: $$Props['state'] = undefined
  export let outline: $$Props['outline'] = undefined
  export let size: $$Props['size'] = undefined
  export let wide: $$Props['wide'] = undefined
  export let glass: $$Props['glass'] = undefined
  export let square: $$Props['square'] = undefined
  export let circle: $$Props['circle'] = undefined
  export let block: $$Props['block'] = undefined
</script>

<button
  {...$$props}
  on:click|preventDefault
  class={button({
    intent,
    active,
    state,
    outline,
    size,
    wide,
    glass,
    square,
    circle,
    block,
    class: $$props.class,
  })}
>
  <slot />
</button>
