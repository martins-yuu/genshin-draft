<script lang="ts" context="module">
  export const link = tv({ extend: button })
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from 'svelte/elements'
  import { button, type ButtonVariants } from '$lib/components/Button.svelte'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAnchorAttributes, ButtonVariants {}

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

<a
  href="#top"
  role="button"
  {...$$props}
  class={link({
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
</a>
