let data = [
  {
    id: 0,
    name: '肥宅心碎賞櫻3日',
    imgUrl:
      'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
    area: '高雄',
    description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
    group: 87,
    price: 1400,
    rate: 10,
  },
  {
    id: 1,
    name: '貓空纜車雙程票',
    imgUrl:
      'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台北',
    description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
    group: 99,
    price: 240,
    rate: 2,
  },
  {
    id: 2,
    name: '台中谷關溫泉會1日',
    imgUrl:
      'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    area: '台中',
    description: '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
    group: 20,
    price: 1765,
    rate: 7,
  },
];
const addTicketInputs = document.querySelectorAll('[data-ticketInput');
const addTicketBtn = document.querySelector('#addTicketBtn');
const cardList = document.querySelector('.ticketList');
const searchAreaInput = document.querySelector('.searchRegion');
const searchResultNum = document.querySelector('.searchResultNum');

addTicketBtn.addEventListener('click', checkInput);
searchAreaInput.addEventListener('change', areaFilter);

function checkInput(e) {
  e.preventDefault();
  let checkStatus = true;

  addTicketInputs.forEach(function (item) {
    if (item.getAttribute('data-ticketInput') == 'rate') {
      // 檢查 套票星級
      if (item.value > 10 || item.value < 1) {
        alert('「套票星級」為 1 ~10 分');
        checkStatus = false;
      };
    } else if (item.value === '') {
      // 檢查空值
      alert(`「${item.getAttribute('data-inputName')}」 未填寫`);
      checkStatus = false;
    } else if (item.getAttribute('data-ticketInput') === 'description' && item.value.length > 100) {
      // 檢查字數
      alert(`「${item.getAttribute('data-inputName')}」 字數超過 100 字`);
      checkStatus = false;
    };
  });

  addTicket(checkStatus);
};

// 新增套票
// 新增資料到 物件 data
function addTicket(checkStatus) {
  if (checkStatus === true) {
    let obj = {};

    addTicketInputs.forEach(function (item) {
      obj.id = data.length;
      if (item.getAttribute('type') === 'number') {
        obj[item.getAttribute('data-ticketInput')] = parseInt(item.value);
      } else {
        obj[item.getAttribute('data-ticketInput')] = item.value;
      };
      item.value = '';
    });
    data.push(obj);
    init();
  } else {
    return;
  }
};


// 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 網頁初始顯示
function init() {
  let str = '';
  let resultNum = 0;

  data.forEach(function (item) {
    resultNum++;
    str += `<li class="flex flex-col bg-white transform hover:scale-105 transition-all duration-700 ease-out rounded relative shadow">
        <div class="bg-secondary text-white text-xl rounded-r py-2 px-5 absolute -top-5 left-0">${item.area}
        </div>
        <div class="h-45 bg-no-repeat bg-cover bg-center rounded-t"
          style="background-image: url('${item.imgUrl}');"></div>
        <div class="relative text-primary pt-5 pb-4 px-5 flex flex-grow flex-col justify-between">
          <div class="absolute bg-primary text-white w-10 text-center rounded-r py-1 -top-4 left-0">${item.rate}</div>
          <div>
            <h2 class="font-bold text-2xl pb-1 mb-4 border-b-2">${item.name}</h2>
            <p class="text-gray-500 mb-8 break-words">${item.description}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>
              <i class="fas fa-exclamation-circle"></i>
              <span class="font-medium">剩下最後 ${item.group} 組</span>
            </p>
            <p class="font-medium flex items-center">TWD<span class="text-4xl ml-1">$${item.price}</span></p>
          </div>
        </div>
      </li>`;
  });

  cardList.innerHTML = str;
  searchResultNum.textContent = resultNum;
}
init();

// 篩選資料
// 篩選後會顯示『搜尋資料為 ? 筆』
function areaFilter(e) {
  let inputValue = e.target.value;

  if (inputValue === '全部') {
    init();
  } else {
    let str = '';
    let resultNum = 0;

    data.forEach(function (item) {
      if (item.area === inputValue) {
        resultNum++;
        str += `<li class="flex flex-col bg-white transform hover:scale-105 transition-all duration-700 ease-out rounded relative shadow">
        <div class="bg-secondary text-white text-xl rounded-r py-2 px-5 absolute -top-5 left-0">${item.area}
        </div>
        <div class="h-45 bg-no-repeat bg-cover bg-center rounded-t"
          style="background-image: url('${item.imgUrl}');"></div>
        <div class="relative text-primary pt-5 pb-4 px-5 flex flex-grow flex-col justify-between">
          <div class="absolute bg-primary text-white w-10 text-center rounded-r py-1 -top-4 left-0">${item.rate}</div>
          <div>
            <h2 class="font-bold text-2xl pb-1 mb-4 border-b-2">${item.name}</h2>
            <p class="text-gray-500 mb-8 break-words">${item.description}</p>
          </div>
          <div class="flex justify-between items-center">
            <p>
              <i class="fas fa-exclamation-circle"></i>
              <span class="font-medium">剩下最後 ${item.group} 組</span>
            </p>
            <p class="font-medium flex items-center">TWD<span class="text-4xl ml-1">$${item.price}</span></p>
          </div>
        </div>
      </li>`;
      };
    });

    cardList.innerHTML = str;
    searchResultNum.textContent = resultNum;
  };
};
