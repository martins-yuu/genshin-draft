<script lang="ts">
  import { page } from '$app/stores'
  import Announcement from '$lib/components/Announcement.svelte'
  import Badge from '$lib/components/Badge.svelte'
  import Link from '$lib/components/Link.svelte'
  import { ChevronLeft } from 'lucide-svelte'
</script>

<Announcement glass>
  <div class="prose contents">
    <Badge size="lg" state="error">{$page.status}</Badge>
    <h1>{$page.error?.message}</h1>
  </div>
  <Link href="/" intent="neutral" size="sm" class="mt-4">
    <ChevronLeft />
    Go Back
  </Link>
</Announcement>
