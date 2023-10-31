<script lang="ts" context="module">
  let dialog: HTMLDialogElement

  export const handleAvatarSelector = () => dialog.showModal()
</script>

<script lang="ts">
  import Avatar from '$lib/components/Avatar.svelte'
  import Box from '$lib/components/Box.svelte'
  import MenuTitle from '$lib/components/MenuTitle.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import type { Item } from '$lib/components/ItemSelector.svelte'
  import { User } from 'lucide-svelte'

  export let items: Item[] = []
  export let selected: Item['icon'] | undefined = undefined
</script>

<Modal bind:dialog box glass gap={4}>
  <MenuTitle>
    <User class="text-primary" />
    Select Avatar
  </MenuTitle>
  <Box class="scrollbar-none grid max-h-96 grid-cols-5 gap-4 overflow-auto">
    <Avatar on:click={() => (selected = undefined)} />
    {#each items as item}
      <Avatar on:click={() => (selected = item.icon)} src={item.icon} />
    {/each}
  </Box>
</Modal>
