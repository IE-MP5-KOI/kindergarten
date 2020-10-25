var sea_list = []
var pages = {
  num: 10,
  page: 1,
  show: 0
}

function reset() {
  document.getElementById("s-ServiceSubType").value = "--";
  $("#s-ServiceSubType").next().find("span")[0].innerHTML = "--";
  document.getElementById("s-OverallRating").value = "--";
  $("#s-OverallRating").next().find("span")[0].innerHTML = "--";
  document.getElementById("s-ProviderManagementType").value = "--";
  $("#s-ProviderManagementType").next().find("span")[0].innerHTML = "--";
  document.getElementById("s-name").value = "";
  document.getElementById("s-Suburb").value = "";
  document.getElementById("s-Postcode").value = "";
  $("#google-map")[0].style.display = "none";
}

function search() {
  var sbt = $('#s-ServiceSubType').val()
  var rat = $('#s-OverallRating').val()
  var Prv = $('#s-ProviderManagementType').val()
  var name = $('#s-name').val()
  var sea = $('#s-Suburb').val()
  var pos = $('#s-Postcode').val()
  if (sbt != '--' || rat != '--' || Prv != '--' || sea != '' || pos != '' || name != '') {
    sea_list = []
    pages.page = 1
    pages.show = 0
    var box = $('#search_result')[0]
    box.innerHTML = ''
    for (var i = 0; i < searchlist.length; i++) {
      var flag = false
      if (searchlist[i].ServiceSubType == sbt) {
        flag = true
      } else if (sbt != '--' && sbt != null) {
        continue
      }
      if (searchlist[i].OverallRating == rat) {
        flag = true
      } else if (rat != '--' && rat != null) {
        continue
      }
      if (searchlist[i].ProviderManagementType == Prv) {
        flag = true
      } else if (Prv != '--' && Prv != null) {
        continue
      }
      if (name != '') {
        if (searchlist[i].ServiceName.toUpperCase().indexOf(name.toUpperCase()) > -1) {
          flag = true
        } else {
          continue
        }
      }
      if (sea != '') {
        if (searchlist[i].SuburbTown.toUpperCase().indexOf(sea.toUpperCase()) > -1) {
          flag = true
        } else {
          continue
        }
      }
      if (pos != '') {
        if (searchlist[i].Postcode == pos) {
          flag = true
        } else {
          continue
        }
      }
      if (flag) {
        sea_list.push(searchlist[i])
      }
    }
    $("#google-map")[0].style.display = "block";
    if (sea_list.length > 0) {
      createDom()
    } else {
      alert('Sorry！There is no suitable kindergarten recommendation yet!')
    }
  } else {
    alert('The search condition must not be empty!')
  }
}
function createDom() {
  var box = $('#search_result')[0]
  for (var i = 0; i < pages.num; i++) {
    var item = sea_list[pages.num * (pages.page - 1) + i]
    var dom = document.createElement('div')
    dom.innerHTML = `
      <div class="s-list">
        <div class="list-name">${item.ServiceName}</div>
        <div class="list-Address"><span>Address:</span>${item.AddressLine1} ${item.SuburbTown} ${item.Postcode} ${item.AddressState}</div>
        <div class="list-phone"><span>Phone number:</span>${item.ServicePhoneNumber}</div>
        <div class="list-button">
            <div class="s-learn" data-id="${item.field}" onclick="tableBoxShow(this)">
                Learn More
            </div>
            <div class="s-learn" data-id="${item.field}" onclick="mapBoxShow(this)">
                <img src="./img/map.png" class="s-btn-img0" />
                <img src="./img/map1.png" class="s-btn-img1" />
                <span>Find Us</span>
            </div>
            <div style="height: 40px;margin-top: 10px;cursor: pointer;" data-id="${item.field}" onclick="tableBoxShow(this,true)">
              <img src="./img/downloadPdf.png" style="height:40px" class="s-btn-img0" />
            </div>
        </div>
    </div>
    `
    box.append(dom)
    pages.show++
    // if (pages.show == sea_list.length) {
    //   $('#s-more')[0].style.display = 'none'
    //   break
    // } else {
    //   $('#s-more')[0].style.display = 'block'
    // }
  }
}
function showMore() {
  pages.page++
  createDom()
}
function tableBoxClose() {
  $('#s-table')[0].classList.remove('s-close-show')
}
function mapBoxClose() {
  $('#s-map-box')[0].classList.remove('s-close-show')
}
function tableBoxShow(e, status) {
  var item = findList(e.getAttribute('data-id'))
  var box = $('#s-table')[0]
  if (status) {
    var myDivs = document.getElementById("download-pdf");
    myDivs.style.display = "block";

  console.log(item)
    downloadPdf($("#download-pdf")[0], item);
  } else {
    var myDiv = document.getElementById("s-table");
    myDiv.style.position = "fixed";
    myDiv.style.transform = "translate(-50%, -50%)";
    myDiv.style.color = "#212529";
    box.innerHTML = `
      <div class="s-row">
        <div class="span-l">Service Name</div>
        <div class="span-r">${item.ServiceName}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Provider Name</div>
        <div class="span-r">${item.ProviderName}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Provider Management Type</div>
        <div class="span-r">${item.ProviderManagementType}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Managing Jurisdiction</div>
        <div class="span-r">${item.ManagingJurisdiction}</div>
      </div>
       <div class="s-row">
        <div class="span-l">Service Type</div>
        <div class="span-r">${item.ServiceType}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Service email</div>
        <div class="span-r">${item.ServiceEmail}</div>
      </div>
      <div class="s-row">
        <div class="span-l">PreschoolKindergarten Stand Alone</div>
        <div class="span-r">${item.PreschoolKindergartenStandAlone}</div>
      </div>
      <div class="s-row">
        <div class="span-l">PreschoolKindergarten Part of a School</div>
        <div class="span-r">${item.PreschoolKindergartenPartofaSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC BeforeSchool</div>
        <div class="span-r">${item.OSHCBeforeSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC After School</div>
        <div class="span-r">${item.OSHCAfterSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC Vacation Care</div>
        <div class="span-r">${item.OSHCVacationCare}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Nature Care Other</div>
        <div class="span-r">${item.NatureCareOther}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Long Day Care</div>
        <div class="span-r">${item.LongDayCare}</div>
      </div>
      <div class="s-close" onclick="tableBoxClose()">
        close
      </div>
  `
    box.classList.add('s-close-show')
  }
}

function downloadPdf(box, item) {
  box.innerHTML = `
      <div class="s-row">
        <div class="span-l">Service Name</div>
        <div class="span-r">${item.ServiceName}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Address</div>
        <div class="span-r">${item.AddressLine1} ${item.SuburbTown} ${item.Postcode} ${item.AddressState}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Phone number</div>
        <div class="span-r">${item.ServicePhoneNumber}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Provider Name</div>
        <div class="span-r">${item.ProviderName}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Provider Management Type</div>
        <div class="span-r">${item.ProviderManagementType}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Managing Jurisdiction</div>
        <div class="span-r">${item.ManagingJurisdiction}</div>
      </div>
       <div class="s-row">
        <div class="span-l">Service Type</div>
        <div class="span-r">${item.ServiceType}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Service email</div>
        <div class="span-r">${item.ServiceEmail}</div>
      </div>
      <div class="s-row">
        <div class="span-l">PreschoolKindergarten Stand Alone</div>
        <div class="span-r">${item.PreschoolKindergartenStandAlone}</div>
      </div>
      <div class="s-row">
        <div class="span-l">PreschoolKindergarten Part of a School</div>
        <div class="span-r">${item.PreschoolKindergartenPartofaSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC BeforeSchool</div>
        <div class="span-r">${item.OSHCBeforeSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC After School</div>
        <div class="span-r">${item.OSHCAfterSchool}</div>
      </div>
      <div class="s-row">
        <div class="span-l">OSHC Vacation Care</div>
        <div class="span-r">${item.OSHCVacationCare}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Nature Care Other</div>
        <div class="span-r">${item.NatureCareOther}</div>
      </div>
      <div class="s-row">
        <div class="span-l">Long Day Care</div>
        <div class="span-r">${item.LongDayCare}</div>
      </div>
  `
  var element = $("#download-pdf")[0]; // 这个dom元素是要导出pdf的div容器
  var w = element.clientWidth // 获得该容器的宽
  var h = element.clientHeight // 获得该容器的高
  var offsetTop = element.offsetTop; // 获得该容器到文档顶部的距离
  var offsetLeft = element.offsetLeft; // 获得该容器到文档最左的距离
  var canvas = document.createElement("canvas");
  var abs = 0;
  var win_i = $(window).width; // 获得当前可视窗口的宽度（不包含滚动条）
  var win_o = window.innerWidth; // 获得当前窗口的宽度（包含滚动条）
  if (win_o > win_i) {
    abs = (win_o - win_i) / 2; // 获得滚动条长度的一半
  }
  // canvas.width = w * 2; // 将画布宽&&高放大两倍
  // canvas.height = h * 2;
  var context = canvas.getContext("2d");
  // context.scale(2, 2);
  context.translate(-offsetLeft - abs, -offsetTop);
  // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此  
  // translate的时候，要把这个差值去掉
  window.pageYoffset = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  // setTimeout(() => {
  html2canvas(document.querySelector("#download-pdf"), { allowTaint: true, scale: 1 }).then(function (canvas) {
    var contentWidth = canvas.width;
    var contentHeight = canvas.height;
    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = contentWidth / 592.28 * 841.89;
    //未生成pdf的html页面高度
    var leftHeight = contentHeight;
    //页面偏移
    var position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 595.28;
    var imgHeight = 592.28 / contentWidth * contentHeight;
    var pageData = canvas.toDataURL('image/jpeg', 1);
    var pdf = new jsPDF('', 'pt', 'a4');
    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else { // 分页
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight;
        position -= 841.89;
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
      }
    }
    pdf.save(`${item.ServiceName}.pdf`);
  })
  var myDivs = document.getElementById("download-pdf");
  myDivs.style.display = "none";
  // }, 500);
}

function mapBoxShow(e) {
  var item = findList(e.getAttribute('data-id'))
  switchMap(item.ServiceName)
}
function findList(id) {
  return sea_list.filter((item) => item.field == id)[0]
}
let map
let service
let infowindow
function switchMap(search_name) {
  const sydney = new google.maps.LatLng(40.6976637, -74.1197637)
  infowindow = new google.maps.InfoWindow()
  map = new google.maps.Map(document.getElementById('google-map'), {
    center: sydney,
    zoom: 18
  })
  const request = {
    query: `${search_name}`,
    fields: [
      'name',
      'geometry',
      'formatted_address',
      'place_id',
      'icon',
      'photo',
      'opening_hours',
      'rating'
    ]
  }
  service = new google.maps.places.PlacesService(map)
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i])
      }
      map.setCenter(results[0].geometry.location)
    }
  })
}
function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  })
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(`${place.name} <br/> ${place.formatted_address}`)
    infowindow.open(map, this)
  })
}
const questionData = [{
  img: './img/question/1.png',
  questions: 'The RED place is ….',
  answers: ['South Australia', 'Victoria', 'Western Australia', 'Queensland'],
  correct: 2
}, {
  img: './img/question/2.png',
  questions: 'The Letter of Butterfly',
  answers: ['C', 'A', 'B', 'F'],
  correct: 3
}, {
  img: './img/question/3.png',
  questions: 'What is the name of the animal in the picture?',
  answers: ['Koala', 'Kangaroo', 'Wombat', 'Platypus'],
  correct: 1
}, {
  img: './img/question/4.png',
  questions: 'What is this vegetable?',
  answers: ['Corn', 'Broccoli', 'Carrots', 'Eggplant'],
  correct: 4
}, {
  img: './img/question/5.png',
  questions: 'What is the main color in the picture?',
  answers: ['Yellow', 'Purple', 'Red', 'Blue'],
  correct: 2
}]

function showquest(i) {
  var data = questionData[i];
  var box = $('#s-table')[0]
  box.innerHTML = `
        <div class="quest-title">
          Quiz Question
          <span onclick="tableBoxClose()">X</span>
        </div>
         <div class="quest-cont">
          ${data.questions}
        </div>
        <div class="quest-img">
          <img src="${data.img}" alt="">
        </div>
        <div class="quest-button">
          <div class="s-learn s-margin-auto s-que" data-count="1" onclick="answer(this,${i})">${data.answers[0]}</div>
          <div class="s-learn s-margin-auto s-que" data-count="2" onclick="answer(this,${i})">${data.answers[1]}</div>
        </div>
         <div class="quest-button">
          <div class="s-learn s-margin-auto s-que" data-count="3" onclick="answer(this,${i})">${data.answers[2]}</div>
          <div class="s-learn s-margin-auto s-que" data-count="4" onclick="answer(this,${i})">${data.answers[3]}</div>
        </div>`
  box.classList.add('s-close-show')
}
function answer(e, i) {
  var item = e.getAttribute('data-count')
  var data = questionData[i];
  if (item == data.correct) {
    alert('Your answer is right!')
  } else {
    alert('Your answer is wrong!')
  }
}