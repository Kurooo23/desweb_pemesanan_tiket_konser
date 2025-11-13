<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DrawerNav from '@/components/DrawerNav.vue'
import { useConfirmLogout } from '@/composables/useConfirmLogout'
import profileSvg from '@/assets/profile.svg'   // <-- PAKAI SVG SEBAGAI IMAGE

/* ---------- ROUTE + DRAWER ---------- */
const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(false)
const toggleSidebar = () => (sidebarOpen.value = !sidebarOpen.value)
watch(() => route.fullPath, () => (sidebarOpen.value = false))

/* ---------- DUMMY DATA (FRONTEND SAJA) ---------- */
const orders = ref([
  {
    id: 1,
    eventId: 'hindia-balikpapan',
    event: 'Hindia in Balikpapan',
    date: '05/06/2025',
    price: '100 POL',
    status: 'Successful'
  },
  {
    id: 2,
    eventId: 'mltr',
    event: 'MLTR',
    date: '03/06/2025',
    price: '110 POL',
    status: 'Successful'
  },
  {
    id: 3,
    eventId: 'kla-project',
    event: 'KLA Project',
    date: '24/05/2025',
    price: '65 POL',
    status: 'Successful'
  }
])

const walletBalance = ref('8 POL')
const walletAccount = ref('0x7z2...y52a')

function goDetail (eventId) {
  if (!eventId) return
  router.push(`/events/${eventId}`)
}

const { confirmLogout } = useConfirmLogout()
function onLogout () {
  confirmLogout()
}
</script>

<template>
  <div class="profile-page">
    <!-- HEADER -->
    <header class="header">
      <h1 class="sr-only">Profile</h1>
      <button
        class="hamburger"
        type="button"
        aria-label="Toggle sidebar"
        @click="toggleSidebar"
      >
        <span />
        <span />
        <span />
      </button>
    </header>

    <DrawerNav v-model="sidebarOpen" />

    <!-- MAIN CONTENT -->
    <main class="content">
      <div class="profile-shell">
        <!-- TOP ROW: AVATAR + HISTORY -->
        <div class="top-row">
          <!-- AVATAR CARD -->
          <aside class="profile-card">
            <div class="avatar-frame">
              <div class="avatar-inner">
                <!-- pakai SVG sebagai img supaya nggak jadi background halaman -->
                <img :src="profileSvg" alt="Profile avatar" class="avatar-img" />
              </div>
            </div>

            <!-- kalau mau tombol logout, aktifkan lagi -->
            <!--
            <button class="logout-btn" type="button" @click="onLogout">
              Logout
            </button>
            -->
          </aside>

          <!-- PURCHASE HISTORY CARD -->
          <section class="history-card">
            <h2>Purchase History</h2>

            <div class="history-table">
              <div class="thead">
                <div>Concert(s)</div>
                <div>Payment Date</div>
                <div>Price</div>
                <div>Status</div>
                <div>Action</div>
              </div>

              <div class="tbody">
                <div
                  v-for="o in orders"
                  :key="o.id"
                  class="trow"
                >
                  <div>{{ o.event }}</div>
                  <div>{{ o.date }}</div>
                  <div>{{ o.price }}</div>
                  <div>{{ o.status }}</div>
                  <div>
                    <button
                      class="detail-btn"
                      type="button"
                      @click="goDetail(o.eventId)"
                    >
                      DETAIL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- MY WALLET CARD -->
        <section class="wallet-card">
          <h3>My Wallet</h3>
          <div class="wallet-amount">{{ walletBalance }}</div>
          <p class="wallet-account">
            account number: {{ walletAccount }}
          </p>

          <div class="wallet-actions">
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@reference "../assets/tailwind.css";
.profile-page {  @apply min-h-screen flex flex-col bg-[#f7efcf] text-[#1f2933];}
/* HEADER + HAMBURGER */
.header {  @apply w-full flex justify-end items-center px-10 py-[18px];}
.hamburger {  @apply inline-flex flex-col justify-center gap-1 p-2 rounded-lg border border-black bg-transparent cursor-pointer;}
.hamburger span {  @apply block w-[18px] h-0.5 rounded-full bg-black;}
/* MAIN CONTENT */
.content {   @apply flex-1 w-full px-6 pt-6 pb-[72px];}
.profile-shell {  @apply max-w-[1040px] mx-auto flex flex-col gap-8;}
.top-row {   @apply flex gap-10 items-start;}
/* AVATAR CARD */
.profile-card {  @apply w-[190px] h-[190px] rounded-xl bg-[#6b0a00] flex flex-col justify-center px-4 py-[18px];}
.avatar-frame {  @apply flex-1 flex items-center justify-center;}
.avatar-inner {  @apply w-[120px] h-[120px] rounded-3xl overflow-hidden;}
/* gambar SVG di dalam avatar */
.avatar-img {  @apply w-full h-full object-cover;}
/* PURCHASE HISTORY CARD */
.history-card {  @apply flex-1 rounded-lg bg-[#141c4a] px-8 pt-6 pb-7 text-gray-50;}
.history-card h2 {  @apply text-xl font-bold mb-[18px] text-[#f5c86b];}
/* TABLE */
.history-table {  @apply w-full text-xs;}
.history-table .thead {  @apply grid grid-cols-[2.4fr_1.3fr_1fr_1.2fr_0.9fr] gap-x-3 pb-2 border-b border-[#f5c86b] font-semibold;}
.history-table .tbody {  @apply mt-1;}
.history-table .trow {  @apply grid grid-cols-[2.4fr_1.3fr_1fr_1.2fr_0.9fr] gap-x-3 items-center py-1.5 border-b border-slate-50/22;}
.history-table .trow:last-child {  @apply border-b-0;}
.detail-btn {  @apply text-[10px] px-2.5 py-1 rounded-sm bg-[#f5c86b] text-gray-900 font-semibold border-none cursor-pointer;}
/* MY WALLET CARD */
.wallet-card {  @apply rounded-lg bg-[#6b0a00] px-8 pt-6 pb-[22px] text-[#fef3c7] max-w-[640px] ml-[230px];}
.wallet-card h3 {  @apply text-xl font-bold mb-3;}
.wallet-amount {  @apply text-[40px] font-bold mb-1;}
.wallet-account {  @apply text-[11px] opacity-90;}
.wallet-actions {  @apply mt-2.5 flex justify-end;}
/* RESPONSIVE */
@media (max-width: 900px) {
  .top-row {
    @apply flex-col items-center;
  }

  .history-card {
    @apply w-full;
  }

  .wallet-card {
    @apply max-w-full ml-0;
  }
}

@media (max-width: 640px) {
  .content {
    @apply px-4;
  }
}
</style>
