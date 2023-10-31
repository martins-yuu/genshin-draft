<script lang="ts" context="module">
  export const header = tv({ extend: navbar })
</script>

<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'
  import { handleCoinFlip } from '$lib/components/CoinFlip.svelte'
  import { dialog as preferencesDialog } from '$lib/components/Preferences.svelte'
  import Badge from '$lib/components/Badge.svelte'
  import Button from '$lib/components/Button.svelte'
  import Link from '$lib/components/Link.svelte'
  import Navbar, { navbar, type NavbarVariants } from '$lib/components/Navbar.svelte'
  import { Coins, Github, Settings, Twitch } from 'lucide-svelte'
  import { tv } from 'tailwind-variants'

  interface $$Props extends HTMLAttributes<HTMLDivElement>, NavbarVariants {}

  export let rounded: $$Props['rounded'] = undefined
  export let bordered: $$Props['bordered'] = undefined
  export let glass: $$Props['glass'] = undefined

  $: ({ base } = navbar({ rounded, bordered, glass }))
</script>

<Navbar class={base({ class: $$props.class })}>
  <svelte:fragment slot="start">
    <Link href="/" intent="ghost" square class="group normal-case lg:hidden">
      <i class="transition group-hover:text-primary">clear_night</i>
    </Link>
    <Button on:click={() => preferencesDialog.showModal()} square class="group">
      <Settings class="transition ease-out group-hover:rotate-90" />
    </Button>
    <Button on:click={handleCoinFlip} class="group">
      <Coins />
      Flip Coin
    </Button>
  </svelte:fragment>
  <svelte:fragment slot="center">
    <Link href="/" intent="ghost" class="group hidden normal-case lg:inline-flex">
      <i class="transition group-hover:text-primary">clear_night</i>
      <span class="prose contents prose-headings:m-0 prose-headings:font-bold">
        <h3>Genshin Draft</h3>
        <Badge intent="neutral">BETA</Badge>
      </span>
    </Link>
  </svelte:fragment>
  <svelte:fragment slot="end">
    <Link
      href="https://github.com/martins-yuu"
      target="_blank"
      rel="noreferrer"
      intent="ghost"
      square
    >
      <Github />
    </Link>
    <Link
      href="https://www.twitch.tv/yuukoanny"
      target="_blank"
      rel="noreferrer"
      intent="ghost"
      square
      class="lg:hidden"
    >
      <Twitch />
    </Link>
    <Link
      href="https://www.twitch.tv/yuukoanny"
      target="_blank"
      rel="noreferrer"
      intent="ghost"
      class="hidden normal-case lg:inline-flex"
    >
      <Twitch />
      YuukoAnny
    </Link>
  </svelte:fragment>
</Navbar>
