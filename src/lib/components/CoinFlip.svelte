<script lang="ts" context="module">
  import { writable } from 'svelte/store'

  let random = writable(Math.random())
  let dialog: HTMLDialogElement

  export const handleCoinFlip = () => {
    random.set(Math.random())
    dialog.showModal()
  }
</script>

<script lang="ts">
  import Announcement from '$lib/components/Announcement.svelte'
  import Badge from '$lib/components/Badge.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import Transition from '$lib/components/Transition.svelte'

  $: coinFlip = ({ heads, tails } = { heads: 'heads', tails: 'tails' }) =>
    $random < 0.5 ? heads : tails
</script>

<Modal bind:dialog glass close="overlay">
  <Transition key={$random}>
    <Announcement>
      <div class="avatar placeholder animate-bounce">
        <div
          class="glass w-24 rounded-full bg-accent text-accent-content ring ring-accent ring-offset-2 ring-offset-base-100"
        >
          <i class="text-3xl">{coinFlip({ heads: 'face', tails: 'swords' })}</i>
        </div>
      </div>
      <span class="prose uppercase tracking-wider">
        <h1>{coinFlip()}</h1>
      </span>
      <Badge intent="neutral" class="font-normal normal-case">Click anywhere to close</Badge>
    </Announcement>
  </Transition>
</Modal>
