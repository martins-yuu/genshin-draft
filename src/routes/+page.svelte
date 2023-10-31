<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import Avatar from '$lib/components/Avatar.svelte'
  import AvatarSelector, { handleAvatarSelector } from '$lib/components/AvatarSelector.svelte'
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import { preferences } from '$lib/stores/preferences'
  import characters from '$lib/data/characters.json'
  import { CloudOff, Play } from 'lucide-svelte'

  $preferences.id = -1

  const invite = $page.url.searchParams.get('match')

  const handleJoin = () => {
    const match = invite || crypto.randomUUID()
    goto(`/match/${match}`)
  }
</script>

<Card bordered glass={$preferences.backgroundVideo} class="prose prose-headings:m-0">
  <h2>{invite ? 'Join Game' : 'New Game'}</h2>
  <div class="tooltip tooltip-bottom" data-tip="Change Avatar">
    <Avatar on:click={handleAvatarSelector} src={$preferences.avatar} />
  </div>
  <AvatarSelector items={characters} bind:selected={$preferences.avatar} />
  <div class="join">
    <TextInput
      placeholder="Enter your nickname"
      bind:value={$preferences.nickname}
      bordered
      class="join-item text-center text-lg font-semibold"
    />
    <Button on:click={handleJoin} intent="primary" class="join-item font-bold">
      {invite ? 'Join' : 'Play'}
      <Play />
    </Button>
  </div>
  <Button on:click={() => goto('/match/offline')} intent="neutral" block>
    Offline Mode
    <CloudOff />
  </Button>
</Card>
