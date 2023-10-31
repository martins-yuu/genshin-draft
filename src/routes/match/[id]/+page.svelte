<script lang="ts">
  import { onMount, type ComponentEvents } from 'svelte'
  import Navbar from '$lib/components/Navbar.svelte'
  import Avatar from '$lib/components/Avatar.svelte'
  import Button from '$lib/components/Button.svelte'
  import Card from '$lib/components/Card.svelte'
  import Clock from '$lib/components/Clock.svelte'
  import DebugWindow from '$lib/components/DebugWindow.svelte'
  import Divider from '$lib/components/Divider.svelte'
  import ItemGrid, { type GridData } from '$lib/components/ItemGrid.svelte'
  import LoadMenu, { dialog as loadMenuDialog } from '$lib/components/LoadMenu.svelte'
  import NameInput from '$lib/components/NameInput.svelte'
  import type { Item } from '$lib/components/ItemSelector.svelte'
  import { preferences } from '$lib/stores/preferences'
  import characters from '$lib/data/characters.json'
  import weapons from '$lib/data/weapons.json'
  import { ArrowRightLeft, Pause, Play, TimerIcon } from 'lucide-svelte'
  import { Timer } from 'easytimer.js'
  import { io, type Socket } from 'socket.io-client'
  import stc from 'string-to-color'
  import { page } from '$app/stores'

  interface Player {
    nickname?: string
    avatar?: string
    picks: Item[]
    bans: Item[]
    timer: Timer
  }

  let players: [Player, Player] = [
    { nickname: '', avatar: '', picks: [], bans: [], timer: new Timer() },
    { nickname: '', avatar: '', picks: [], bans: [], timer: new Timer() },
  ]

  const picks: GridData[] = [
    {
      items: characters,
      positions: [...Array(8).keys()],
    },
  ]

  const bans: GridData[] = [
    {
      items: characters,
      positions: [...Array($preferences.characterBans).keys()],
      placeholder: '<i>face</i>',
    },
    {
      items: weapons,
      positions: Array.from(
        { length: $preferences.weaponBans },
        (_, i) => $preferences.characterBans + i,
      ),
      placeholder: '<i>swords</i>',
    },
  ]

  let isPaused = false
  let currentPlayer: Player | undefined

  const handleSwap = () => {
    const timerStarted = players.at(0)?.timer.getTimeValues().seconds

    if (timerStarted) {
      players.forEach(player =>
        player.timer.isRunning() ? player.timer.pause() : player.timer.start(),
      )
    } else {
      players.forEach(player => player.timer.start({ callback: () => (players = players) }))
      players.at(-1)?.timer.pause()
    }
  }

  const handlePause = () => {
    if (isPaused) {
      currentPlayer?.timer.start()
    } else {
      players.forEach(player => {
        if (player.timer.isRunning()) {
          currentPlayer = player
          player.timer.pause()
        }
      })
    }
  }

  const offline = $page.params.id === 'offline'

  let socket: Socket

  onMount(() => {
    if (offline) return

    socket = io()

    socket.emit('join', {
      nickname: $preferences.nickname,
      avatar: $preferences.avatar,
      id: $preferences.id,
      match: $page.params.id,
    })

    socket.on('join', match => {
      match.forEach((player: Player & { id: number }) => {
        players[player.id]['nickname'] = player.nickname
        players[player.id]['avatar'] = player.avatar
      })

      if ($preferences.id === -1) {
        $preferences.id = match.at(-1).id
      }

      if ($preferences.id === 0) {
        if (match.length < 2) {
          loadMenuDialog.showModal()
        } else {
          if (loadMenuDialog.open) {
            loadMenuDialog.close()
          }
        }
      }
    })

    socket.on('lock', data => {
      players[0]['picks'] = data[0]['picks']
      players[0]['bans'] = data[0]['bans']
      players[1]['picks'] = data[1]['picks']
      players[1]['bans'] = data[1]['bans']
    })
  })

  const handleLock = (event: ComponentEvents<ItemGrid>['select']) => {
    setTimeout(() => {
      socket?.emit('lock', { ...players, match: $page.params.id })
    }, Math.floor(Math.random() * 500) + 1)
  }
</script>

<DebugWindow key="p" value={players} />

<svelte:head>
  {#each characters as character}
    <link rel="preload" href={character.icon} as="image" />
  {/each}
</svelte:head>

<main class="contents">
  <LoadMenu />
  <div
    class="flex w-full scale-75 flex-col items-center justify-around gap-16 lg:scale-90 lg:flex-row xl:scale-100"
  >
    {#each players as player, i}
      {@const color = player.nickname && stc(player.nickname.trim().toLowerCase())}
      <div class="contents" class:pointer-events-none={!offline && $preferences.id !== i}>
        <Card bordered glass={$preferences.backgroundVideo}>
          <div
            data-side={i % 2 === 0 ? 'left' : 'right'}
            class="absolute top-4 data-[side=left]:left-4 data-[side=right]:right-4"
          >
            <Clock
              min={player.timer.getTimeValues().minutes}
              sec={player.timer.getTimeValues().seconds}
              isRunning={player.timer.isRunning()}
            />
          </div>
          <div
            class="flex flex-col items-center justify-center gap-2"
            class:pointer-events-none={!offline}
          >
            <Avatar src={player.avatar} size={16} class="pointer-events-none" />
            <NameInput placeholder="Player {i + 1}" bind:value={player.nickname} />
          </div>
          <ItemGrid on:select={handleLock} data={picks} {color} bind:selected={player.picks} />
          <Divider class="m-0 mt-8">BANS</Divider>
          <ItemGrid
            on:select={handleLock}
            data={bans}
            cols={5}
            size={5}
            hexagon
            bind:selected={player.bans}
          />
        </Card>
      </div>
    {/each}
  </div>
  <Navbar
    glass={$preferences.backgroundVideo}
    gap={4}
    class="rounded-t-box fixed bottom-0 z-10 w-full border-t lg:rounded-box lg:bottom-4 lg:w-fit lg:border"
  >
    <svelte:fragment slot="center">
      <TimerIcon />
      <Button on:click={handleSwap} disabled={isPaused} intent="neutral" wide>
        <ArrowRightLeft />
      </Button>
      <label class="btn btn-square btn-warning btn-outline swap swap-rotate">
        <input on:change={handlePause} type="checkbox" bind:checked={isPaused} />
        <Pause class="swap-off" />
        <Play class="swap-on" />
      </label>
    </svelte:fragment>
  </Navbar>
</main>
