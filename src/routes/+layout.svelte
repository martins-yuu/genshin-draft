<script lang="ts">
  import '../app.css'
  import CoinFlip from '$lib/components/CoinFlip.svelte'
  import DebugWindow from '$lib/components/DebugWindow.svelte'
  import Header from '$lib/components/Header.svelte'
  import Preferences from '$lib/components/Preferences.svelte'
  import { preferences, defaultPreferences } from '$lib/stores/preferences'
  import { getVideoID, ID_LENGTH } from '$lib/utils/getVideoID'
</script>

<DebugWindow
  key="l"
  value={$preferences}
  resetHandler={() => ($preferences = defaultPreferences)}
/>

<svelte:head>
  <title>Genshin Draft</title>
</svelte:head>

<div
  spellcheck={false}
  class="flex min-h-screen flex-col items-center justify-center from-base-100 to-base-200 bg-fixed"
  class:bg-gradient-to-b={!$preferences.backgroundVideo}
>
  <Preferences />
  <CoinFlip />
  <Header
    rounded="b"
    bordered="b"
    glass={$preferences.backgroundVideo}
    class="fixed top-0 z-10 w-full"
  />
  <slot />
  {#if $preferences.backgroundVideo}
    {@const videoID = getVideoID($preferences.backgroundURL)}
    {#if videoID.length === ID_LENGTH}
      <div
        class="fixed top-0 -z-10 grid h-screen w-screen place-items-center overflow-hidden opacity-50 mix-blend-overlay grayscale"
      >
        <iframe
          src="https://www.youtube-nocookie.com/embed/{videoID}?playlist={videoID}&loop=1&autoplay=1&mute=1&controls=0"
          title="YouTube video player"
          frameborder="0"
          allow="autoplay"
          class="pointer-events-none aspect-video min-h-full w-auto min-w-full max-w-none"
        />
      </div>
    {/if}
  {/if}
</div>
