<script setup>
import { ref, computed, onMounted } from 'vue'

const title = 'DRAM 物價追蹤站'
const sourceSite = 'https://www.trendforce.com.tw/price/dram/dram_spot'
const localStorageKey = 'dram-price-tracker-records'
const date = ref(new Date().toISOString().slice(0, 10))
const product = ref('DDR5 5600')
const price = ref('')
const filter = ref('')
const records = ref([])
const status = ref('資料會儲存在本機瀏覽器 localStorage，可直接部署到 GitHub Pages。')

const loadRecords = () => {
  const raw = localStorage.getItem(localStorageKey)
  if (raw) {
    try {
      records.value = JSON.parse(raw)
    } catch {
      records.value = []
    }
  } else {
    records.value = [
      {
        id: Date.now(),
        date: '2026-06-10',
        product: 'DDR5 5600',
        price: 2350,
        source: sourceSite,
      },
    ]
    localStorage.setItem(localStorageKey, JSON.stringify(records.value))
  }
}

const saveRecords = () => {
  localStorage.setItem(localStorageKey, JSON.stringify(records.value))
}

const filteredRecords = computed(() => {
  const all = [...records.value].sort((a, b) => {
    if (a.date === b.date) return b.id - a.id
    return a.date < b.date ? 1 : -1
  })
  const q = filter.value.trim().toLowerCase()
  if (!q) {
    return all
  }
  return all.filter((record) => {
    return (
      record.date.includes(q) ||
      record.product.toLowerCase().includes(q) ||
      String(record.price).includes(q) ||
      record.source.toLowerCase().includes(q)
    )
  })
})

const addPrice = () => {
  if (!date.value || !product.value.trim() || !price.value) {
    status.value = '請填寫日期、商品名稱與價格。'
    return
  }

  records.value.unshift({
    id: Date.now(),
    date: date.value,
    product: product.value.trim(),
    price: Number(price.value),
    source: sourceSite,
  })
  saveRecords()
  status.value = '已新增記錄。'
  price.value = ''
}

const clearFilter = () => {
  filter.value = ''
}

const statusMessage = computed(() => {
  if (!records.value.length) {
    return '目前尚無紀錄，請新增價格。'
  }
  return `共 ${filteredRecords.value.length} 筆顯示結果`
})

onMounted(loadRecords)
</script>

<template>
  <div class="app-shell">
    <header>
      <h1>{{ title }}</h1>
      <p class="subtitle">
        關注商品：記憶體價格 — 來源網站：
        <a :href="sourceSite" target="_blank" rel="noopener">TrendForce DRAM Spot</a>
      </p>
      <p class="hint">此版本為純靜態前端練習作品，資料儲存在本機 localStorage。</p>
    </header>

    <section class="card entry-card">
      <h2>新增價格紀錄</h2>
      <div class="form-grid">
        <label>
          日期
          <input type="date" v-model="date" />
        </label>
        <label>
          商品名稱
          <input type="text" v-model="product" placeholder="例如：DDR5 5600" />
        </label>
        <label>
          價格 (NT$)
          <input type="number" v-model="price" placeholder="輸入價格" min="0" />
        </label>
      </div>
      <button class="primary" type="button" @click="addPrice">新增紀錄</button>
    </section>

    <section class="card search-card">
      <h2>查詢與物價變化</h2>
      <div class="search-row">
        <input
          type="text"
          v-model="filter"
          placeholder="搜尋記憶體類型、日期或價格"
        />
        <button type="button" @click="clearFilter">清除搜尋</button>
      </div>
      <p class="status">{{ statusMessage }}</p>
      <table>
        <thead>
          <tr>
            <th>日期</th>
            <th>商品名稱</th>
            <th>價格 (NT$)</th>
            <th>來源</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in filteredRecords" :key="record.id">
            <td>{{ record.date }}</td>
            <td>{{ record.product }}</td>
            <td>{{ record.price }}</td>
            <td>
              <a :href="record.source" target="_blank" rel="noopener">TrendForce</a>
            </td>
          </tr>
          <tr v-if="filteredRecords.length === 0">
            <td colspan="4" class="empty-row">找不到符合條件的紀錄。</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
.app-shell {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #111;
}
header {
  margin-bottom: 24px;
}
h1 {
  font-size: clamp(2rem, 3vw, 3rem);
  margin-bottom: 8px;
}
.subtitle,
.hint {
  color: #555;
  margin: 0;
}
.hint {
  margin-top: 8px;
}
.card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  padding: 20px 24px;
  margin-bottom: 20px;
}
.form-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-bottom: 18px;
}
label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: 600;
}
input {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 1rem;
}
button.primary {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
}
button.primary:hover,
button[type='button']:hover {
  background: #1d4ed8;
}
.search-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid #e5e7eb;
}
th {
  background: #f8fafc;
}
.status {
  margin: 0 0 12px;
  color: #444;
}
.empty-row {
  text-align: center;
  color: #888;
  padding: 14px 0;
}
</style>
