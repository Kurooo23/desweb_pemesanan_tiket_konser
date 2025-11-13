<script setup>
import { computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  // opsional untuk posisi khusus, tetap dipakai
  extraClass: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const route = useRoute()
const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
function close(){ isOpen.value = false }

function onKey(e){ if (e.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
watch(() => route.fullPath, close)
</script>

<template>
  <transition name="sb">
    <aside
      v-if="isOpen"
      class="sb-card"
      :class="extraClass"
      role="dialog"
      aria-modal="true"
      @click.stop
    >
      <nav class="sb-menu" aria-label="Main">
        <RouterLink class="sb-item" active-class="active" to="/home"    @click="close">Home</RouterLink>
        <RouterLink class="sb-item" active-class="active" to="/profile" @click="close">Profile</RouterLink>
        <RouterLink class="sb-item" active-class="active" to="/wallet"  @click="close">Wallet</RouterLink>
        <RouterLink class="sb-item" active-class="active" to="/history" @click="close">History</RouterLink>
        <RouterLink class="sb-item sb-danger" to="/logout" @click="close">Log out</RouterLink>
      </nav>
    </aside>
  </transition>

  <div v-if="isOpen" class="sb-backdrop" @click="close" />
</template>

<style scoped>
  @reference "../assets/tailwind.css";
  .sb-card {
    @apply relative z-60 bg-[#F4F1DE]! text-[#2b1c08]! border! border-black/12! rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.35)] p-[14px_12px];
  }
  .sb-menu {
    @apply flex flex-col gap-2.5;
  }
  .sb-item {
    @apply text-[#2b1c08]! no-underline font-extrabold py-3 px-3.5 rounded-xl;
  }
  .sb-item:hover {
    @apply bg-black/6!;
  }
  .sb-item.active {
    @apply bg-black/10!;
  }
  .sb-danger {
    @apply text-[#6b1b12]!;
  }
  .sb-backdrop {
    @apply fixed inset-0 bg-black/35!;
  }
</style>
