<script lang="ts" context="module">
  export type TextInputVariants = VariantProps<typeof textInput>

  export const textInput = tv({
    base: 'input w-full max-w-xs',
    variants: {
      bordered: {
        true: 'input-bordered',
      },
      intent: {
        primary: 'input-primary',
        secondary: 'input-secondary',
        accent: 'input-accent',
      },
      state: {
        info: 'input-info',
        success: 'input-success',
        warning: 'input-warning',
        error: 'input-error',
      },
      size: {
        xs: 'input-xs',
        sm: 'input-sm',
        md: 'input-md',
        lg: 'input-lg',
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLInputElement>, TextInputVariants {
    value?: string
  }

  export let value: string | undefined = undefined
  export let bordered: $$Props['bordered'] = undefined
  export let intent: $$Props['intent'] = undefined
  export let state: $$Props['state'] = undefined
  export let size: $$Props['size'] = undefined
</script>

<input
  type="text"
  maxlength={50}
  bind:value
  {...$$props}
  class={textInput({ bordered, intent, state, size, class: $$props.class })}
/>
