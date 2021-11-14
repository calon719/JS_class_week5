"use strict";

var data = [{
  id: 0,
  name: '肥宅心碎賞櫻3日',
  imgUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
  area: '高雄',
  description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
  group: 87,
  price: 1400,
  rate: 10
}, {
  id: 1,
  name: '貓空纜車雙程票',
  imgUrl: 'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
  area: '台北',
  description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
  group: 99,
  price: 240,
  rate: 2
}, {
  id: 2,
  name: '台中谷關溫泉會1日',
  imgUrl: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
  area: '台中',
  description: '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
  group: 20,
  price: 1765,
  rate: 7
}];
var addTicketInputs = document.querySelectorAll('[data-ticketInput');
var addTicketBtn = document.querySelector('#addTicketBtn');
var cardList = document.querySelector('.ticketList');
var searchAreaInput = document.querySelector('.searchRegion');
var searchResultNum = document.querySelector('.searchResultNum');
addTicketBtn.addEventListener('click', checkInput);
searchAreaInput.addEventListener('change', areaFilter);

function checkInput(e) {
  e.preventDefault();
  var checkStatus = true;
  addTicketInputs.forEach(function (item) {
    if (item.getAttribute('data-ticketInput') == 'rate') {
      // 檢查 套票星級
      if (item.value > 10 || item.value < 1) {
        alert('「套票星級」為 1 ~10 分');
        checkStatus = false;
      }

      ;
    } else if (item.value === '') {
      // 檢查空值
      alert("\u300C".concat(item.getAttribute('data-inputName'), "\u300D \u672A\u586B\u5BEB"));
      checkStatus = false;
    } else if (item.getAttribute('data-ticketInput') === 'description' && item.value.length > 100) {
      // 檢查字數
      alert("\u300C".concat(item.getAttribute('data-inputName'), "\u300D \u5B57\u6578\u8D85\u904E 100 \u5B57"));
      checkStatus = false;
    }

    ;
  });
  addTicket(checkStatus);
}

; // 新增套票
// 新增資料到 物件 data

function addTicket(checkStatus) {
  if (checkStatus === true) {
    var obj = {};
    addTicketInputs.forEach(function (item) {
      obj.id = data.length;

      if (item.getAttribute('type') === 'number') {
        obj[item.getAttribute('data-ticketInput')] = parseInt(item.value);
      } else {
        obj[item.getAttribute('data-ticketInput')] = item.value;
      }

      ;
      item.value = '';
    });
    data.push(obj);
    init();
  } else {
    return;
  }
}

; // 預設資料為 3 筆（內容需依照目前提供的 JSON data）
// 網頁初始顯示

function init() {
  var str = '';
  var resultNum = 0;
  data.forEach(function (item) {
    resultNum++;
    str += "<li class=\"flex flex-col bg-white transform hover:scale-105 transition-all duration-700 ease-out rounded relative shadow\">\n        <div class=\"bg-secondary text-white text-xl rounded-r py-2 px-5 absolute -top-5 left-0\">".concat(item.area, "\n        </div>\n        <div class=\"h-45 bg-no-repeat bg-cover bg-center rounded-t\"\n          style=\"background-image: url('").concat(item.imgUrl, "');\"></div>\n        <div class=\"relative text-primary pt-5 pb-4 px-5 flex flex-grow flex-col justify-between\">\n          <div class=\"absolute bg-primary text-white w-10 text-center rounded-r py-1 -top-4 left-0\">").concat(item.rate, "</div>\n          <div>\n            <h2 class=\"font-bold text-2xl pb-1 mb-4 border-b-2\">").concat(item.name, "</h2>\n            <p class=\"text-gray-500 mb-8 break-words\">").concat(item.description, "</p>\n          </div>\n          <div class=\"flex justify-between items-center\">\n            <p>\n              <i class=\"fas fa-exclamation-circle\"></i>\n              <span class=\"font-medium\">\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</span>\n            </p>\n            <p class=\"font-medium flex items-center\">TWD<span class=\"text-4xl ml-1\">$").concat(item.price, "</span></p>\n          </div>\n        </div>\n      </li>");
  });
  cardList.innerHTML = str;
  searchResultNum.textContent = resultNum;
}

init(); // 篩選資料
// 篩選後會顯示『搜尋資料為 ? 筆』

function areaFilter(e) {
  var inputValue = e.target.value;

  if (inputValue === '全部') {
    init();
  } else {
    var str = '';
    var resultNum = 0;
    data.forEach(function (item) {
      if (item.area === inputValue) {
        resultNum++;
        str += "<li class=\"flex flex-col bg-white transform hover:scale-105 transition-all duration-700 ease-out rounded relative shadow\">\n        <div class=\"bg-secondary text-white text-xl rounded-r py-2 px-5 absolute -top-5 left-0\">".concat(item.area, "\n        </div>\n        <div class=\"h-45 bg-no-repeat bg-cover bg-center rounded-t\"\n          style=\"background-image: url('").concat(item.imgUrl, "');\"></div>\n        <div class=\"relative text-primary pt-5 pb-4 px-5 flex flex-grow flex-col justify-between\">\n          <div class=\"absolute bg-primary text-white w-10 text-center rounded-r py-1 -top-4 left-0\">").concat(item.rate, "</div>\n          <div>\n            <h2 class=\"font-bold text-2xl pb-1 mb-4 border-b-2\">").concat(item.name, "</h2>\n            <p class=\"text-gray-500 mb-8 break-words\">").concat(item.description, "</p>\n          </div>\n          <div class=\"flex justify-between items-center\">\n            <p>\n              <i class=\"fas fa-exclamation-circle\"></i>\n              <span class=\"font-medium\">\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</span>\n            </p>\n            <p class=\"font-medium flex items-center\">TWD<span class=\"text-4xl ml-1\">$").concat(item.price, "</span></p>\n          </div>\n        </div>\n      </li>");
      }

      ;
    });
    cardList.innerHTML = str;
    searchResultNum.textContent = resultNum;
  }

  ;
}

;
//# sourceMappingURL=all.js.map
