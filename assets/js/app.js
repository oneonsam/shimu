/**
 * CPAGRIP & CPASHIMU - Core Interactive Engine
 * 100% English - Deep Orange & Crisp White Theme
 */

// Global State
let currentOffers = [];
let activeCategory = 'all';

// Real-Time Conversion Pool for Landing Page Ticker & Notifications
const conversionTickerData = [
  { flag: '🇺🇸', user: 'Alex_Media', offer: 'Cash App $100 Gift Card', amount: '$4.20', geo: 'United States', time: 'Just now' },
  { flag: '🇩🇪', user: 'Klaus_Aff', offer: 'Raid: Shadow Legends', amount: '$12.50', geo: 'Germany', time: '12s ago' },
  { flag: '🇬🇧', user: 'LondonScale', offer: 'PayPal $750 Voucher', amount: '$2.85', geo: 'United Kingdom', time: '25s ago' },
  { flag: '🇨🇦', user: 'MapleLead', offer: 'Roblox 10,000 Robux Card', amount: '$2.10', geo: 'Canada', time: '40s ago' },
  { flag: '🇦🇺', user: 'SydneyClicks', offer: 'SurveyJunkie Rewards', amount: '$3.10', geo: 'Australia', time: '1m ago' },
  { flag: '🇫🇷', user: 'ParisDigital', offer: 'Binance First Trade Deposit', amount: '$38.00', geo: 'France', time: '2m ago' }
];

// Fallback Offers (100% English)
const defaultOffers = [
  {
    "id": "OFF-1092",
    "title": "Claim $750 PayPal Gift Card Voucher",
    "category": "Sweepstakes",
    "payout": 2.85,
    "epc": 0.42,
    "cr": "14.8%",
    "countries": ["US", "CA"],
    "devices": ["All Devices"],
    "type": "CPA / SOI",
    "status": "HOT"
  },
  {
    "id": "OFF-2041",
    "title": "Cash App: Sign Up & Claim $100 Reward",
    "category": "Finance",
    "payout": 4.20,
    "epc": 0.68,
    "cr": "16.2%",
    "countries": ["US", "UK"],
    "devices": ["iOS", "Android"],
    "type": "CPI / Install",
    "status": "EXCLUSIVE"
  },
  {
    "id": "OFF-3382",
    "title": "Raid: Shadow Legends - Level 10 Unlock",
    "category": "Gaming",
    "payout": 12.50,
    "epc": 1.15,
    "cr": "9.2%",
    "countries": ["US", "UK", "DE", "FR", "CA"],
    "devices": ["Desktop", "Windows"],
    "type": "CPA / Action",
    "status": "HIGH PAY"
  },
  {
    "id": "OFF-4190",
    "title": "SurveyJunkie - Free Market Opinion Survey",
    "category": "Surveys",
    "payout": 3.10,
    "epc": 0.54,
    "cr": "17.4%",
    "countries": ["US", "AU", "UK"],
    "devices": ["All Devices"],
    "type": "CPL / Lead",
    "status": "HOT"
  },
  {
    "id": "OFF-5512",
    "title": "Binance Crypto App - First Trade Bonus",
    "category": "Crypto",
    "payout": 38.00,
    "epc": 2.80,
    "cr": "7.4%",
    "countries": ["GLOBAL", "DE", "FR"],
    "devices": ["iOS", "Android"],
    "type": "FTD / Deposit",
    "status": "VIP"
  },
  {
    "id": "OFF-6204",
    "title": "TikTok Lite - Install & Watch 3 Minutes",
    "category": "Mobile CPI",
    "payout": 1.95,
    "epc": 0.38,
    "cr": "19.5%",
    "countries": ["US", "BR", "ID"],
    "devices": ["Android"],
    "type": "CPI / Install",
    "status": "TRENDING"
  },
  {
    "id": "OFF-7719",
    "title": "Amazon Prime 30-Day Free Trial",
    "category": "E-Commerce",
    "payout": 5.00,
    "epc": 0.85,
    "cr": "17.0%",
    "countries": ["US", "UK", "DE"],
    "devices": ["All Devices"],
    "type": "CPA / Free Trial",
    "status": "HOT"
  },
  {
    "id": "OFF-9944",
    "title": "Roblox 10,000 Robux Card Promo",
    "category": "Gaming",
    "payout": 2.10,
    "epc": 0.51,
    "cr": "24.3%",
    "countries": ["US", "CA", "UK"],
    "devices": ["Mobile", "Desktop"],
    "type": "CPA / Locker",
    "status": "VIRAL"
  }
];

// CPAGrip Authentic Shoutbox Chat Messages
const cpagripChatStream = [
  { time: '8:35 am', user: 'Sincere', type: 'user', text: 'hello everyone, good morning!' },
  { time: '8:38 am', user: 'Sincere', type: 'user', text: '@Support when are weekly payments going out?' },
  { time: '8:48 am', user: 'TINO1976', type: 'user', text: 'Looking forward to testing the new locker theme today.' },
  { time: '2:23 pm', user: 'System', type: 'system', text: 'Steve has earned $392.65 alltime with 196 Leads.' },
  { time: '3:57 pm', user: 'System', type: 'system', text: 'URANIUM earned $12.42 today. | 5 Views | 4 Clicks | 3 Leads' },
  { time: '9:10 pm', user: 'System', type: 'system', text: 'HSarkar earned $10.05 in the last 7 days. | 170 Views | 204 Clicks | 5 Leads' },
  { time: '10:09 pm', user: 'Jurig', type: 'user', text: 'Converter malangbong is on fire right now' },
  { time: '10:23 pm', user: 'System', type: 'system', text: 'TINO1976 earned $2.89 today. | 15 Views | 14 Clicks | 2 Leads' },
  { time: '11:01 pm', user: 'grayson', type: 'user', text: 'what is the best country to target with file lockers?' },
  { time: '11:46 pm', user: 'System', type: 'system', text: '3301 has earned $103,194.68 alltime with 37,320 Leads.' },
  { time: '12:13 am', user: 'JohnW (AM)', type: 'admin', text: '@grayson US, UK, Canada and Germany have the highest EPC right now.' },
  { time: '12:46 am', user: 'System', type: 'system', text: 'URANIUM earned $31.12 today. | 43 Views | 40 Clicks | 9 Leads' },
  { time: '2:15 am', user: 'sizar199', type: 'user', text: 'Payments received via Wire! Thank you CPAGrip!' }
];

document.addEventListener('DOMContentLoaded', () => {
  initServerClock();
  initChatShoutbox();
  initLandingTicker();
  initOffersTable();
  initEarningsCalculator();
});

/* ==========================================================================
   1. Live Server Clock (CPAGrip Top Bar)
   ========================================================================== */
function initServerClock() {
  const clockEl = document.getElementById('cpagrip-server-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    clockEl.innerText = `${hours}:${minutes}${ampm}`;
  }

  updateClock();
  setInterval(updateClock, 30000);
}

/* ==========================================================================
   2. CPAGrip Public Chat (#Public Chat)
   ========================================================================== */
function initChatShoutbox() {
  const chatContainer = document.getElementById('cpagrip-chat-messages');
  if (!chatContainer) return;

  renderChatMessages();

  // Periodically add new system or user notifications
  const autoNewEvents = [
    { time: '3:05 pm', user: 'System', type: 'system', text: 'ApexTraffic earned $18.50 today. | 22 Views | 19 Clicks | 4 Leads' },
    { time: '3:12 pm', user: 'David_NY', type: 'user', text: 'My landing page CR jumped to 24% after changing CTA button.' },
    { time: '3:18 pm', user: 'System', type: 'system', text: 'Affiliate_99 earned $4.20 today on Cash App Lead.' }
  ];

  let nextIdx = 0;
  setInterval(() => {
    if (nextIdx < autoNewEvents.length) {
      cpagripChatStream.push(autoNewEvents[nextIdx]);
      renderChatMessages();
      nextIdx++;
    }
  }, 12000);
}

function renderChatMessages() {
  const chatContainer = document.getElementById('cpagrip-chat-messages');
  if (!chatContainer) return;

  chatContainer.innerHTML = cpagripChatStream.map(msg => {
    if (msg.type === 'system') {
      return `
        <div class="chat-message-row py-1 px-2 border-b border-gray-100 flex items-start gap-2 bg-orange-50/40">
          <span class="text-gray-400 font-mono text-[10px] shrink-0">${msg.time}</span>
          <div class="flex-1">
            <span class="font-bold text-orange-600 font-mono">System:</span>
            <span class="text-gray-800 text-[11px]">${msg.text}</span>
          </div>
        </div>
      `;
    }

    const nameColor = msg.type === 'admin' ? 'text-blue-600 font-bold' : 'text-emerald-700 font-semibold';
    return `
      <div class="chat-message-row py-1 px-2 border-b border-gray-100 flex items-start gap-2">
        <span class="text-gray-400 font-mono text-[10px] shrink-0">${msg.time}</span>
        <div class="flex-1">
          <span class="${nameColor} font-mono">${msg.user}:</span>
          <span class="text-gray-700 text-[11px] ml-1">${msg.text}</span>
        </div>
      </div>
    `;
  }).join('');

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendChatMessage() {
  const input = document.getElementById('cpagrip-chat-input');
  if (!input || !input.value.trim()) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;

  cpagripChatStream.push({
    time: `${hours}:${minutes} ${ampm}`,
    user: 'You (Demo)',
    type: 'user',
    text: input.value.trim()
  });

  input.value = '';
  renderChatMessages();
}

/* ==========================================================================
   3. Landing Page Live Ticker (CPAShimu Hero)
   ========================================================================== */
function initLandingTicker() {
  const tickerEl = document.getElementById('landing-live-ticker');
  if (!tickerEl) return;

  let idx = 0;
  function cycle() {
    const item = conversionTickerData[idx];
    tickerEl.innerHTML = `
      <div class="flex items-center gap-2 text-xs font-mono">
        <span>${item.flag}</span>
        <span class="text-orange-400 font-bold">${item.user}</span>
        <span class="text-gray-400">converted</span>
        <span class="text-white font-medium truncate max-w-[150px]">${item.offer}</span>
        <span class="bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded font-bold">+${item.amount}</span>
      </div>
    `;
    idx = (idx + 1) % conversionTickerData.length;
  }

  cycle();
  setInterval(cycle, 3500);
}

/* ==========================================================================
   4. Live Offers Table
   ========================================================================== */
function initOffersTable() {
  const tableBody = document.getElementById('offers-table-body');
  if (!tableBody) return;

  fetch('api/offers.json')
    .then(res => res.json())
    .then(data => {
      currentOffers = data;
      renderOffersTable(currentOffers);
    })
    .catch(() => {
      currentOffers = defaultOffers;
      renderOffersTable(currentOffers);
    });

  const searchInput = document.getElementById('offer-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => filterOffers());
  }

  const countrySelect = document.getElementById('offer-country-select');
  if (countrySelect) {
    countrySelect.addEventListener('change', () => filterOffers());
  }
}

function filterOffers() {
  const search = document.getElementById('offer-search-input')?.value.toLowerCase() || '';
  const country = document.getElementById('offer-country-select')?.value.toUpperCase() || 'ALL';

  const filtered = currentOffers.filter(offer => {
    const matchesCategory = activeCategory === 'all' || offer.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesCountry = country === 'ALL' || offer.countries.includes(country) || offer.countries.includes('GLOBAL');
    const matchesSearch = offer.title.toLowerCase().includes(search) || 
                          offer.category.toLowerCase().includes(search);
    return matchesCategory && matchesCountry && matchesSearch;
  });

  renderOffersTable(filtered);
}

function setOfferCategory(category, btnElement) {
  activeCategory = category;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.remove('bg-orange-500', 'text-white', 'font-bold');
    btn.classList.add('bg-gray-100', 'text-gray-700');
  });
  if (btnElement) {
    btnElement.classList.remove('bg-gray-100', 'text-gray-700');
    btnElement.classList.add('bg-orange-500', 'text-white', 'font-bold');
  }
  filterOffers();
}

function renderOffersTable(offers) {
  const tableBody = document.getElementById('offers-table-body');
  if (!tableBody) return;

  if (offers.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-gray-400">
          No offers found matching your current filter.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = offers.map(o => {
    const geos = o.countries.map(c => `<span class="bg-gray-100 text-gray-700 text-[10px] px-1.5 py-0.5 rounded font-mono border border-gray-200">${c}</span>`).join(' ');
    
    return `
      <tr class="hover:bg-orange-50/30 transition-colors">
        <td class="py-3 px-3 font-mono text-xs text-gray-500 font-semibold">${o.id}</td>
        <td class="py-3 px-3">
          <div class="font-semibold text-gray-900 hover:text-orange-600 transition-colors cursor-pointer" onclick="openOfferModal('${o.id}')">${o.title}</div>
          <span class="text-[11px] text-gray-500">${o.type} • ${o.devices.join(', ')}</span>
        </td>
        <td class="py-3 px-3">
          <span class="bg-gray-100 text-gray-800 text-[11px] px-2 py-0.5 rounded-full font-medium">${o.category}</span>
        </td>
        <td class="py-3 px-3">
          <div class="flex flex-wrap gap-1">${geos}</div>
        </td>
        <td class="py-3 px-3 font-mono font-semibold text-blue-600">$${o.epc.toFixed(2)}</td>
        <td class="py-3 px-3 font-mono text-orange-600 font-bold text-sm">$${o.payout.toFixed(2)}</td>
        <td class="py-3 px-3 text-right">
          <button onclick="openOfferModal('${o.id}')" class="btn-orange-glow text-white font-bold text-xs px-3 py-1.5 rounded-md inline-flex items-center gap-1">
            <span>Get Link</span>
            <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

/* ==========================================================================
   5. Interactive Earnings Calculator
   ========================================================================== */
function initEarningsCalculator() {
  const visitorsSlider = document.getElementById('calc-visitors');
  const crSlider = document.getElementById('calc-cr');
  const payoutSlider = document.getElementById('calc-payout');

  if (!visitorsSlider || !crSlider || !payoutSlider) return;

  function calculate() {
    const visitors = parseInt(visitorsSlider.value);
    const cr = parseFloat(crSlider.value);
    const payout = parseFloat(payoutSlider.value);

    document.getElementById('val-visitors').innerText = visitors.toLocaleString() + ' / day';
    document.getElementById('val-cr').innerText = cr.toFixed(1) + '%';
    document.getElementById('val-payout').innerText = '$' + payout.toFixed(2);

    const conversions = Math.round(visitors * (cr / 100));
    const dailyTotal = conversions * payout;
    const monthlyTotal = dailyTotal * 30;

    document.getElementById('res-daily-conversions').innerText = conversions.toLocaleString() + ' Leads';
    document.getElementById('res-daily-earnings').innerText = '$' + dailyTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('res-monthly-earnings').innerText = '$' + monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  visitorsSlider.addEventListener('input', calculate);
  crSlider.addEventListener('input', calculate);
  payoutSlider.addEventListener('input', calculate);

  calculate();
}

/* ==========================================================================
   6. Tracking Link Modal
   ========================================================================== */
function openOfferModal(offerId) {
  const offer = currentOffers.find(o => o.id === offerId) || defaultOffers.find(o => o.id === offerId);
  if (!offer) return;

  const modal = document.getElementById('offer-details-modal');
  if (!modal) return;

  document.getElementById('modal-offer-title').innerText = offer.title;
  document.getElementById('modal-offer-id').innerText = offer.id;
  document.getElementById('modal-offer-payout').innerText = '$' + offer.payout.toFixed(2);
  document.getElementById('modal-offer-epc').innerText = '$' + offer.epc.toFixed(2);
  document.getElementById('modal-offer-category').innerText = offer.category;
  document.getElementById('modal-offer-geos').innerText = offer.countries.join(', ');

  const trackingInput = document.getElementById('modal-tracking-link');
  if (trackingInput) {
    trackingInput.value = `https://cpagrip.link/track/${offer.id}?sub1=social_traffic&sub2=campaign_01`;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeOfferModal() {
  const modal = document.getElementById('offer-details-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function copyTrackingLink() {
  const input = document.getElementById('modal-tracking-link');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('Tracking link copied to clipboard!');
  }
}
