<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Loader from '@/components/Loader.vue'

type Artist = {
  name: string
  url: string
  mbid: string
}

const loading = ref(true)
const artists = ref<Artist[] | null>(null)
onMounted(async () => {
  loading.value = true

  const key = import.meta.env.VITE_LASTFM_API
  const path = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=allieeecaton&api_key=${key}&format=json&period=7day&limit=10`

  try {
    const res = await axios({
      method: 'get',
      url: path,
    })

    if (res?.data) {
      artists.value = res.data?.topartists?.artist.map((artist: Artist) => {
        return {
          mbid: artist.mbid,
          name: artist.name,
          url: artist.url,
        }
      })
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="spacing">
    <div class="header">top music artists from the last week:</div>

    <Loader v-if="loading" />

    <div v-else v-for="(artist, index) in artists" :key="artist.mbid">
      {{ index + 1 }}.
      <a class="artist" :href="artist.url">{{ artist.name }}</a>
    </div>

    <a class="more" href="https://www.last.fm/user/allieeecaton"
      >see more on lastfm</a
    >
  </div>
</template>

<style scoped lang="scss">
.spacing {
  width: 100%;
  padding: 15px;
  border-radius: 4px;
  align-self: start;
  border: 2px dashed $purple;
  background-color: $purple-light;
}

.artist {
  color: $purple;
}

.header {
  font-weight: bold;
  margin-bottom: 15px;
}

.more {
  display: block;
  color: $base;
  margin-top: 15px;
  font-size: 14px;
}
</style>
