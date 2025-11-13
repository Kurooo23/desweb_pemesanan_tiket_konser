<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import DrawerNav from '@/components/DrawerNav.vue'

const route = useRoute()
const sidebarOpen = ref(false)
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)
watch(() => route.fullPath, () => (sidebarOpen.value = false))

// Dummy data
const balancePol = ref(8)

const transactions = ref([
  { id: 1, amount: 100, date: '05/06/2025' },
  { id: 2, amount: 110, date: '03/06/2025' },
  { id: 3, amount: 65,  date: '24/5/2025' },
])

function onTopUp() {
  alert('Top up clicked (frontend-only).')
}
</script>

<template>
  <div class="wallet-page">
    <!-- TOP BAR -->
    <header class="wallet-topbar">
      <div class="wallet-logo-wrap">
        <img src="/logo_with_text.png" alt="AsiqTIX" class="wallet-logo" />
      </div>
      <h1 class="wallet-title">Wallet</h1>

      <button class="wallet-hamburger" @click="toggleSidebar">
        <span></span><span></span><span></span>
      </button>
    </header>

    <!-- SIDE NAV -->
    <DrawerNav v-model="sidebarOpen" />

    <!-- MAIN CONTENT -->
    <main class="wallet-main">
      <section class="wallet-panel">
        
        <!-- BALANCE -->
        <h2 class="wallet-balance-label">My Balance</h2>
        <p class="wallet-balance-value">
          {{ balancePol }} <span class="wallet-balance-unit">POL</span>
        </p>

        <button class="wallet-btn-topup" @click="onTopUp">TOP UP</button>

        <hr class="wallet-separator" />

        <!-- TRANSACTION SECTION -->
        <h3 class="wallet-tx-title">Transaction</h3>

        <ul class="wallet-tx-list">
          <li v-for="t in transactions" :key="t.id" class="wallet-tx-item">
            <span class="wallet-tx-amount">- {{ t.amount }}</span>
            <span class="wallet-tx-date">{{ t.date }}</span>
          </li>

          <li v-if="!transactions.length" class="wallet-tx-item">
            <span class="wallet-tx-amount">–</span>
            <span class="wallet-tx-date">—</span>
          </li>
        </ul>

      </section>
    </main>
  </div>
</template>

<style scoped>
@reference "../assets/tailwind.css";
.wallet-page {
  @apply min-h-screen flex flex-col bg-[#6b0a00] text-[#f4f1de] font-sans;
}

/* TOP BAR */
.wallet-topbar {
  @apply grid grid-cols-[auto_1fr_auto] items-center px-10 py-4 bg-black;
}

.wallet-logo {
  @apply h-10;
}

.wallet-title {
  @apply text-[22px] text-[#f7a930];
}

/* HAMBURGER */
.wallet-hamburger {
  @apply w-9 h-[26px] flex flex-col justify-between bg-transparent border-none cursor-pointer;
}

.wallet-hamburger span {
  @apply h-[3px] bg-[#f6f2e6] rounded-full;
}

/* MAIN */
.wallet-main {
  @apply flex-1 px-[60px] py-10 pb-[60px];
}

.wallet-panel {
  @apply max-w-[800px] mx-auto;
}

/* BALANCE */
.wallet-balance-label {
  @apply text-[#f7a930] text-3xl;
}

.wallet-balance-value {
  @apply text-[56px] font-bold my-2.5 mt-2.5 mb-5;
}

.wallet-balance-unit {
  @apply text-[32px];
}

/* TOP UP BUTTON */
.wallet-btn-topup {
  @apply bg-[#f4f1de] text-gray-900 border-none px-6 py-2 rounded cursor-pointer font-bold text-xs;
}

/* SEPARATOR */
.wallet-separator {
  @apply border-none border-t-2 border-[#f7a930] my-5 mt-10 mb-5;
}

/* TRANSACTIONS */
.wallet-tx-title {
  @apply text-[#f7a930] text-lg mb-2.5;
}

.wallet-tx-list {
  @apply list-none p-0 m-0;
}

.wallet-tx-item {
  @apply flex justify-between py-2.5 border-t border-[#f7a930];
}

.wallet-tx-item:last-child {
  @apply border-b border-[#f7a930];
}

.wallet-tx-amount {
  @apply text-sm;
}

.wallet-tx-date {
  @apply text-[13px];
}

/* RESPONSIVE */
@media (max-width: 960px) {
  .wallet-main {
    @apply px-5 py-[30px] pb-10;
  }
}

@media (max-width: 640px) {
  .wallet-topbar {
    @apply px-4 py-3 grid-cols-[auto_auto_auto];
  }

  .wallet-title {
    @apply text-lg;
  }

  .wallet-balance-value {
    @apply text-[42px];
  }
}
</style>