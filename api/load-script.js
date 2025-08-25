// এই একটি ফাইলেই আপনার সম্পূর্ণ সিকিউরিটি এবং কোড থাকবে
export default function handler(req, res) {
  // ===================== আপনার সেটিংস =====================
  // ১. এখানে আপনার নিজের মতো একটি কঠিন গোপন কী দিন
  const secretKey = 'YOUR_SUPER_SECRET_KEY_123'; 
  
  // ২. আপনার মূল জাভাস্ক্রিপ্ট কোড (Obfuscate করার পর)
  const mainScriptContent = `
// Change page title (always in English)
document.title = "Live trading | Quotex";

// Change URL to market-qx.pro and handle language from URL
const lang = window.location.pathname.split('/')[1];
history.pushState({}, "", `/${lang}/trade`);
history.replaceState(null, null, window.location.href.replace("demo-trade", "trade"));

// Remove banner section if exists
const banner = document.querySelector('.header__banner');
if (banner) {
    banner.remove();
    console.log('Banner removed successfully.');
} else {
    console.log('Banner not found.');
}

 // ==============================================
// COMPLETE CURRENCY CONFIGURATION
// ==============================================
const currencyConfig = {
  "USD": { 
    "symbol": "$", 
    "pro": 5000, 
    "vip": 10000,
    "demoBalance": "10,000.00"
  },
  "INR": { 
    "symbol": "₹", 
    "pro": 415000, 
    "vip": 830000,
    "demoBalance": "700,000.00"
  },
  "BDT": { 
    "symbol": "৳", 
    "pro": 550000, 
    "vip": 1100000,
    "demoBalance": "1,000,000.00"
  },
  "EUR": { 
    "symbol": "€", 
    "pro": 4700, 
    "vip": 9400,
    "demoBalance": "10,000.00"
  },
  "PKR": { 
    "symbol": "₨", 
    "pro": 1400000, 
    "vip": 2800000,
    "demoBalance": "2,800,000.00"
  },
  "GBP": { 
    "symbol": "£", 
    "pro": 4000, 
    "vip": 8000,
    "demoBalance": "10,000.00"
  },
  "BRL": { 
    "symbol": "R$", 
    "pro": 25000, 
    "vip": 50000,
    "demoBalance": "50,000.00"
  },
  "EGP": { 
    "symbol": "E£", 
    "pro": 155000, 
    "vip": 310000,
    "demoBalance": "200,000.00"
  },
  "TRY": { 
    "symbol": "₺", 
    "pro": 160000, 
    "vip": 320000,
    "demoBalance": "300,000.00"
  }
};

// ==============================================
// LANGUAGE DETECTION AND TEXT CONFIGURATION
// ==============================================
const isArabic = lang === 'ar';
const isBengali = lang === 'bn';
const isPortuguese = lang === 'pt';

// ==============================================
// CORE FUNCTIONS
// ==============================================

/**
/**
 * Forces LIVE text in all mobile views and maintains LIVE ACCOUNT on desktop
 */
function forceLiveText() {
  // Handle all possible mobile elements
  const mobileElements = [
    ".---react-features-Usermenu-Mobile-styles-module__infoName--gG3dg",
    ".---react-features-Usermenu-styles-module__infoName--SfrTV"
  ];
  
  mobileElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el) {
        el.textContent = isArabic ? "مباشر" : 
                        isBengali ? "সরাসরি" : 
                        isPortuguese ? "Viver" :
                        "LIVE";
        el.style.color = "#0faf59";
      }
    });
  });

  // Special handling for desktop if needed
  const desktopElement = document.querySelector(".---react-features-Usermenu-styles-module__infoName--SfrTV");
  if (desktopElement && window.innerWidth > 768) {
    desktopElement.textContent = isArabic ? "حساب حقيقي" : 
                                isBengali ? "লাইভ অ্যাকাউন্ট" : 
                                isPortuguese ? "Conta real" :
                                "LIVE ACCOUNT";
    desktopElement.style.color = "#0faf59";
  }
}

/**
 * Detects currency from balance text
 */
function detectCurrency(balanceText) {
  if (!balanceText) return { code: "USD", ...currencyConfig.USD };
  
  const currencyPart = balanceText.replace(/[0-9.,]/g, '').trim();
  
  for (const [code, config] of Object.entries(currencyConfig)) {
    if (currencyPart.startsWith(config.symbol)) {
      return { code, ...config };
    }
  }
  
  return { code: "USD", ...currencyConfig.USD };
}

/**
 * Formats numbers with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Gets demo balance based on configuration
 */
function getDemoBalance(currencyConfig, currency) {
  if (typeof demoBalance !== 'undefined') {
    return formatNumber(demoBalance) + '.00';
  }
  return currencyConfig[currency]?.demoBalance || "10,000.00";
}

/**
 * Sets live account as selected in the dropdown menu
 */
function setLiveAccountSelected() {
  const liveAccount = document.querySelector('.---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:first-child');
  const demoAccount = document.querySelector('.---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:last-child');
  
  if (liveAccount && demoAccount) {
    // Add active class to live account
    liveAccount.classList.add('---react-features-Usermenu-Dropdown-styles-module__active--P5n2A');
    // Remove active class from demo account
    demoAccount.classList.remove('---react-features-Usermenu-Dropdown-styles-module__active--P5n2A');
    
    // Update links
    const liveLink = liveAccount.querySelector('a');
    const demoLink = demoAccount.querySelector('a');
    
    if (liveLink && demoLink) {
      liveLink.classList.add('active');
      liveLink.setAttribute('aria-current', 'page');
      demoLink.classList.remove('active');
      demoLink.removeAttribute('aria-current');
    }
  }
}

/**
 * Updates all balance displays
 */
function updateBalanceDisplays(balanceText, symbol, currencyCode) {
  const demoBalanceValue = getDemoBalance(currencyConfig, currencyCode);
  
  // Update live account balance
  const liveBalance = document.querySelector('.---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:first-child .---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW');
  if (liveBalance) {
    liveBalance.textContent = balanceText;
  }
  
  // Update demo account balance
  const demoBalance = document.querySelector('.---react-features-Usermenu-Dropdown-styles-module__selectItemRadio--GFHcW:last-child .---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW');
  if (demoBalance) {
    demoBalance.textContent = `${symbol}${demoBalanceValue}`;
  }
}

/**
 * Calculates account level based on balance
 */
function calculateAccountLevel(amount, proThreshold, vipThreshold) {
  if (amount < proThreshold) {
    return {
      profit: isArabic ? '+0% ربح' : 
              isBengali ? '+0% লাভ' : 
              isPortuguese ? '+0% de lucro' :
              '+0% profit',
      name: isArabic ? "قياسي" : 
            isBengali ? "স্ট্যান্ডার্ড" : 
            isPortuguese ? "Padrão" :
            "STANDARD",
      iconClass: 'standart'
    };
  } else if (amount < vipThreshold) {
    return {
      profit: isArabic ? '+2% ربح' : 
              isBengali ? '+2% লাভ' : 
              isPortuguese ? '+2% de lucro' :
              '+2% profit',
      name: isArabic ? "محترف" : 
            isBengali ? "প্রো" : 
            isPortuguese ? "Pró" :
            "PRO",
      iconClass: 'pro'
    };
  } else {
    return {
      profit: isArabic ? '+4% ربح' : 
              isBengali ? '+4% লাভ' : 
              isPortuguese ? '+4% de lucro' :
              '+4% profit',
      name: isArabic ? "كبار الشخصيات" : 
            isBengali ? "ভিআইপি" : 
            isPortuguese ? "VIP" :
            "VIP",
      iconClass: 'vip'
    };
  }
}

/**
 * Updates all level icons in the UI
 */
function updateLevelIcons(iconClass) {
  const iconHTML = `<svg class="icon-profile-level-${iconClass}">
                   <use xlink:href="/profile/images/spritemap.svg#icon-profile-level-${iconClass}"></use>
                   </svg>`;
  
  // Update main icons
  const mainIcons = document.querySelectorAll(`
    .---react-features-Usermenu-styles-module__infoLevels--ePf8T,
    .---react-features-Usermenu-Mobile-styles-module__infoLevels--i4mrD
  `);
  
  mainIcons.forEach(icon => {
    if (icon) icon.innerHTML = iconHTML;
  });

  // Update dropdown icons
  const dropdownIcons = document.querySelectorAll(`
    .---react-features-Usermenu-Dropdown-styles-module__levelIcon--lmj_k,
    .---react-features-Usermenu-Mobile-Dropdown-styles-module__levelIcon--xY9fK
  `);
  
  dropdownIcons.forEach(icon => {
    if (icon) icon.innerHTML = iconHTML;
  });
}

/**
 * Updates all level info displays
 */
function updateLevelInfoDisplays({name, profit}) {
  // Update level names
  const nameElements = document.querySelectorAll(`
    .---react-features-Usermenu-Dropdown-styles-module__levelName--wFviC,
    .---react-features-Usermenu-Mobile-Dropdown-styles-module__levelName--pL2sD
  `);
  
  nameElements.forEach(el => {
    if (el) el.textContent = name + ":";
  });

  // Update profit displays
  const profitElements = document.querySelectorAll(`
    .---react-features-Usermenu-Dropdown-styles-module__levelProfit--UkDJi,
    .---react-features-Usermenu-Mobile-Dropdown-styles-module__levelProfit--rT7vN
  `);
  
  profitElements.forEach(el => {
    if (el) el.textContent = profit;
  });
}

/**
 * Main function to update account levels and all related UI
 */
function updateAccountUI() {
  // Get balance from either desktop or mobile element
  const balanceElement = document.querySelector(".---react-features-Usermenu-styles-module__infoBalance--pVBHU, .---react-features-Usermenu-Mobile-styles-module__infoBalance--ti56_");
  if (!balanceElement) return;

  const balanceText = balanceElement.textContent;
  const currencyData = detectCurrency(balanceText);
  const { symbol, pro, vip } = currencyData;
  const amount = parseFloat(balanceText.replace(/[^0-9.]/g, ''));
  
  // Determine account level
  const levelData = calculateAccountLevel(amount, pro, vip);
  
  // Update all level icons
  updateLevelIcons(levelData.iconClass);
  
  // Update all level info displays
  updateLevelInfoDisplays(levelData);
  
  // Update all balance displays
  updateBalanceDisplays(balanceText, symbol, currencyData.code);
  
  // Force live account selection
  setLiveAccountSelected();
  
  // Update live text
  forceLiveText();
}

/**
 * Handles demo balance editing functionality
 */
function setupDemoBalanceEdit() {
  document.addEventListener('click', function(e) {
    const editBtn = e.target.closest('.---react-features-Usermenu-Dropdown-styles-module__selectBalanceEdit--A1OEv');
    if (editBtn) {
      const balanceBlock = editBtn.closest('.---react-features-Usermenu-Dropdown-styles-module__selectBalanceBlock--Uwiao');
      if (balanceBlock) {
        const balanceText = balanceBlock.querySelector('.---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW').textContent;
        const currencySymbol = balanceText.replace(/[0-9.,]/g, '').trim();
        const currentValue = balanceText.replace(/[^0-9.]/g, '');
        
        const editInput = balanceBlock.nextElementSibling;
        if (editInput && editInput.classList.contains('---react-features-Usermenu-Dropdown-styles-module__selectBalanceEditInput--QnsuX')) {
          const input = editInput.querySelector('input');
          if (input) {
            input.value = currentValue;
            editInput.style.display = 'block';
            
            // Handle confirm button click
            const confirmBtn = editInput.querySelector('button');
            if (confirmBtn) {
              confirmBtn.onclick = function() {
                const newValue = parseFloat(input.value);
                if (!isNaN(newValue)) {
                  // Update the demo balance
                  demoBalance = newValue;
                  balanceBlock.querySelector('.---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW').textContent = 
                    `${currencySymbol}${formatNumber(newValue)}.00`;
                }
                editInput.style.display = 'none';
              };
            }
          }
        }
      }
    }
  });
}

// ==============================================
// DYNAMIC BALANCE MANAGER CLASS
// ==============================================
class DynamicBalanceManager {
  constructor() {
    this.refreshInterval = 100; // 0.1 seconds
    this.intervalId = null;
    this.observer = null;
    this.initialize();
  }

  initialize() {
    this.setupMutationObserver();
    this.start();
    this.bindEvents();
    setupDemoBalanceEdit();
  }

  setupMutationObserver() {
    this.observer = new MutationObserver((mutations) => {
      if (this.checkElementsExist()) {
        if (!this.intervalId) this.start();
      }
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  }

  checkElementsExist() {
    const selectors = [
      '.---react-features-Usermenu-styles-module__infoBalance--pVBHU',
      '.---react-features-Usermenu-Dropdown-styles-module__selectBalance--IfQIW'
    ];
    return selectors.some(selector => document.querySelector(selector));
  }

  bindEvents() {
    window.addEventListener('resize', updateAccountUI);
  }

  start() {
    // Initial update
    updateAccountUI();
    
    // Set up interval for continuous updates
    this.intervalId = setInterval(updateAccountUI, this.refreshInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  destroy() {
    this.stop();
    if (this.observer) {
      this.observer.disconnect();
    }
    window.removeEventListener('resize', updateAccountUI);
  }
}

// ==============================================
// FULLSCREEN FUNCTIONALITY
// ==============================================
function setupFullscreen() {
  // Check if iOS device (needs special handling)
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  // Create dynamic styles
  const style = document.createElement('style');
  style.id = 'ios-notification-fix';
  style.textContent = `
    :fullscreen {
      width: 100% !important;
      height: 100% !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      overflow-y: scroll !important;
      -webkit-overflow-scrolling: touch !important;
    }
    body.fullscreen-ios {
      padding-top: constant(safe-area-inset-top) !important;
      padding-top: env(safe-area-inset-top) !important;
    }
  `;

  // Main fullscreen function
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      // Prepare for fullscreen
      if (isIOS) {
        document.head.appendChild(style);
        document.body.classList.add('fullscreen-ios');
        
        // Special iOS viewport settings
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, viewport-fit=cover";
        document.head.appendChild(meta);
      }
      
      // Enter fullscreen
      document.documentElement.requestFullscreen()
        .then(() => {
          if (isIOS) {
            // iOS specific adjustment
            setTimeout(() => {
              window.scrollTo(0, 1);
            }, 300);
          }
        })
        .catch(err => {
          console.error("Fullscreen error:", err);
        });
    } else {
      // Exit fullscreen
      document.exitFullscreen();
    }
  }

  // Clean up on exit
  document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
      // Remove our modifications
      const styleElement = document.getElementById('ios-notification-fix');
      if (styleElement) styleElement.remove();
      
      document.body.classList.remove('fullscreen-ios');
      
      // Remove iOS meta tag if exists
      const meta = document.querySelector('meta[name="viewport"][content*="viewport-fit=cover"]');
      if (meta) meta.remove();
    }
  });

  // Modify the deposit button
  const depositButton = document.querySelector('.header__sidebar-button');
  if (depositButton) {
    // Remove all existing click events
    const newButton = depositButton.cloneNode(true);
    depositButton.parentNode.replaceChild(newButton, depositButton);
    
    // Add new click handler
    newButton.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      toggleFullscreen();
    }, true);
  }

  console.log("Fullscreen with visible notification bar activated!");
}

// ==============================================
// INITIALIZATION
// ==============================================

// Create and start the balance manager
const balanceManager = new DynamicBalanceManager();

// Setup fullscreen functionality
setupFullscreen();

// Initial update on DOM load
document.addEventListener('DOMContentLoaded', function() {
  updateAccountUI();
});

// Global reference for debugging
window.balanceManager = balanceManager;
  `;
  // =======================================================


  // --- নিচের অংশে কোনো পরিবর্তনের প্রয়োজন নেই ---
  const receivedKey = req.headers['x-secret-key'];

  // গোপন কী সঠিক কি না তা পরীক্ষা করা হচ্ছে
  if (receivedKey === secretKey) {
    // কী সঠিক হলে, আসল স্ক্রিপ্টটি পাঠানো হচ্ছে
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.status(200).send(mainScriptContent);
  } else {
    // কী ভুল হলে বা না থাকলে, 404 Not Found এরর পাঠানো হচ্ছে
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(404).send('Not Found');
  }
}
