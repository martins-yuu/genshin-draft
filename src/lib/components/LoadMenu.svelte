<script lang="ts" context="module">
  export let dialog: HTMLDialogElement
</script>

<script lang="ts">
  import { page } from '$app/stores'
  import Announcement from '$lib/components/Announcement.svelte'
  import Badge from '$lib/components/Badge.svelte'
  import Button from '$lib/components/Button.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import { Check, Copy } from 'lucide-svelte'

  const inviteURL = new URL($page.url.origin)
  inviteURL.searchParams.append('match', $page.params.id)

  let inviteCopied = false

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(`${inviteURL}`)
      inviteCopied = true
    } finally {
      setTimeout(() => {
        inviteCopied = false
      }, 3000)
    }
  }
</script>

<Modal bind:dialog glass close="disable">
  <div class="flex items-center justify-center">
    <Announcement>
      <div class="prose prose-sm contents whitespace-normal prose-headings:m-0">
        <div class="flex items-center justify-center gap-2">
          <h1>Waiting for players</h1>
          <span class="loading loading-spinner text-accent" />
        </div>
        <p>The first to join will become the second player, the following will be spectators.</p>
      </div>
      <button
        on:click|preventDefault={copyInvite}
        class="btn btn-neutral"
        class:btn-success={inviteCopied}
        class:pointer-events-none={inviteCopied}
      >
        {#if inviteCopied}
          Copied to clipboard
          <Check />
        {:else}
          Copy invite link
          <Copy />
        {/if}
      </button>
    </Announcement>
    <Badge
      intent="ghost"
      class="invisible fixed bottom-4 select-text gap-2 font-normal normal-case sm:visible"
    >
      <i class="select-none text-base text-info">link</i>
      {inviteURL}
    </Badge>
  </div>
</Modal>
