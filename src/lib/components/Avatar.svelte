<script lang="ts" context="module">
  export type AvatarVariants = VariantProps<typeof avatar>

  export const avatar = tv({
    slots: {
      base: 'group avatar placeholder',
      icon: [
        'w-24',
        'rounded-full',
        'border',
        'border-base-content/20',
        'bg-neutral-focus',
        'text-neutral-content',
        'transition-colors',
        'group-hover:bg-accent',
        'group-hover:text-accent-content',
        'group-active:bg-accent-focus',
      ],
    },
    variants: {
      size: {
        16: {
          icon: 'w-16',
        },
        12: {
          icon: 'w-12',
        },
        8: {
          icon: 'w-8',
        },
      },
    },
  })
</script>

<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { User } from 'lucide-svelte'
  import { tv, type VariantProps } from 'tailwind-variants'

  interface $$Props extends HTMLButtonAttributes, AvatarVariants {
    src?: string
  }

  export let src: string | undefined = undefined
  export let size: $$Props['size'] = undefined

  $: ({ base, icon } = avatar({ size }))
</script>

<button {...$$props} on:click class={base({ class: $$props.class })}>
  <div class={icon()}>
    {#if src}
      <img {src} alt="" />
    {:else}
      <User {size} />
    {/if}
  </div>
</button>
