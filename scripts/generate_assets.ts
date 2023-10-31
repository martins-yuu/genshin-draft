/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import genshinDB from 'npm:genshin-db'
import { dirname, fromFileUrl, join } from 'https://deno.land/std@0.193.0/path/mod.ts'

const items = {
  characters: genshinDB
    .characters('names', {
      matchCategories: true,
      verboseCategories: true,
    })
    .map(character => ({
      name: character.name,
      icon: character.images.icon,
      id: normalizeName(character.name),
    })),
  weapons: genshinDB
    .weapons('names', {
      matchCategories: true,
      verboseCategories: true,
    })
    .map(weapon => ({
      name: weapon.name,
      icon: weapon.images.icon,
      id: normalizeName(weapon.name),
    })),
}

const currentDirectory = dirname(fromFileUrl(import.meta.url))

for (const [key, value] of Object.entries(items)) {
  Deno.writeTextFile(
    join(currentDirectory, '..', 'src', 'lib', 'data', `${key}.json`),
    JSON.stringify(
      value.map(item => ({ ...item, icon: `/assets/${key}/${item.id}.png` })),
      null,
      2,
    ),
    { create: true },
  )

  for (const item of value) {
    if (item.icon) {
      fetchFile(item.icon, join(currentDirectory, '..', 'static', 'assets', key, `${item.id}.png`))
    }
  }
}

async function fetchFile(url: string, path: string) {
  const response = await fetch(url)

  if (response.body) {
    const file = await Deno.open(path, { write: true, create: true })
    await response.body.pipeTo(file.writable)
  }
}

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .replace(/\s/g, '_')
}
