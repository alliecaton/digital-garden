<script setup>
import { onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue';

const loading = ref(true);

onMounted(() => {
  try {
  if (window.twttr) {
    window.twttr.widgets.load();
  } else {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('async', '');
    script.setAttribute('charset', 'utf-8');
    document.head.appendChild(script);
    
  }
} catch (e) {
    console.error(e);
  } finally {
    document.querySelectorAll('css-175oi2r').forEach((el) => {
    // hide 
    el.style.display = 'none';
  });

  document.querySelectorAll('r-1q9bdsx').forEach((el) => {
    // no border radisu
    el.style.borderRadius = '0px';
  });
  loading.value = false;
  }

});

</script>

<template>
  <div>
    <a 
      class="twitter-timeline"
      data-height="800"
      href="https://twitter.com/whale_m0m?ref_src=twsrc%5Etfw"
    >
      <Loader />
    </a>
  </div>
</template>