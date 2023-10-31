<script lang="ts" context="module">
  export let dialog: HTMLDialogElement
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import Box from '$lib/components/Box.svelte'
  import Button from '$lib/components/Button.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import Divider from '$lib/components/Divider.svelte'
  import MenuTitle from '$lib/components/MenuTitle.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { preferences } from '$lib/stores/preferences'
  import themes from '$lib/data/themes.json'
  import { Clipboard, Film, Link, Palette, RotateCcw, Settings } from 'lucide-svelte'
  import { themeChange } from 'theme-change'

  onMount(() => {
    themeChange(false)
  })
</script>

<Modal bind:dialog box glass gap={4}>
  <MenuTitle>
    <Settings class="text-primary" />
    Preferences
  </MenuTitle>
  <Box class="flex flex-col gap-2">
    <div class="form-control">
      <div class="label justify-start gap-4">
        <Palette />
        <span class="label-text">Theme</span>
      </div>
    </div>
    <div class="grid max-h-96 grid-cols-3 gap-4 overflow-auto">
      {#each themes as theme}
        <button
          on:click|preventDefault
          data-set-theme={theme.id}
          data-act-class="active"
          data-theme={theme.id}
          class="btn rounded bg-gradient-to-r from-base-100 via-base-200 to-base-300 hover:border-primary [&.active]:pointer-events-none [&.active]:border-2 [&.active]:border-primary"
        >
          {theme.name}
        </button>
      {/each}
    </div>
  </Box>
  <Box class="flex flex-col gap-2 divide-base-content/20">
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-4">
        <Film />
        <span class="label-text">Background Video</span>
        <input type="checkbox" bind:checked={$preferences.backgroundVideo} class="toggle" />
      </label>
    </div>
    {#if $preferences.backgroundVideo}
      <Divider class="m-0" />
      <div class="form-control">
        <div class="label justify-start gap-4">
          <Link />
          <span class="label-text">Video ID</span>
          <div class="join">
            <TextInput bind:value={$preferences.backgroundURL} class="join-item" />
            <Button
              on:click={async () =>
                ($preferences.backgroundURL = await navigator.clipboard.readText())}
              intent="neutral"
              square
              class="join-item"
            >
              <Clipboard />
            </Button>
            <Button
              on:click={() => ($preferences.backgroundURL = 'youtube.com/watch?v=2DfJ-yslqAw')}
              state="error"
              square
              class="join-item"
            >
              <RotateCcw />
            </Button>
          </div>
        </div>
      </div>
    {/if}
  </Box>
</Modal>
