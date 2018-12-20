var common = {

	leftMenuImport: function () {
		var $div = $('#fh5co-main-menu');
		$div.load("../cmm/left-menu.html");
	},

	date: new Date(),

	getDate: function () {
		var year = this.date.getFullYear(),
			month = this.date.getMonth() + 1

		if (month >= 1 && month < 10) {
			month = "0" + month;
		}
		day = "0" + 1;
		var result = year.toString() + month.toString() + day
		return result;
	},

	getInfo: function (method, flag, option, returnFunction) {
		//	console.log(option)
		$.ajax({
			crossOrigin: true,
			type: method,
			url: "https://api.visitkorea.or.kr/openapi/service/rest/KorService/" + flag,
			data: "ServiceKey=%2B6kreK3SlK%2FHeXSglkdHXVcOjgM%2BHoHwQK%2BbDXAlMNTwbkNSgJXPlywyo7CO1ntAZ5CDfYU4xFI1p%2F9TJ3fbFw%3D%3D&" + option + "&_type=json",
			dataType: "json",
			success: function (data) {
				if (data.response.header.resultCode !== "0000") {
					alert('데이터 통신에 오류가 발생하였습니다.\n 지속적으로 문제가 발생하면 개발자에게 문의하세요')
				}
				returnFunction(data)
			}
		});
	}, areaChange: function () {
		$(".areaCodes").click(function () {
			$(".text-right").css("display", "block");
			draw.areaCode = $(this).attr("data-toggle");
			$("#travelContents").empty();
			draw.elementCount = 1;
			$(".sigunguLists").empty();
			draw.sigunguCode = '';
			draw.areaSigunguCodeGet();
			draw.elements();
			$(".areaList").css('visibility', 'hidden');
			$('.area').text($(this).context.innerHTML);
			$('.sigungu').text('전체');
		})
	},

	sigunguChange: function () {
		$('.sigunguLists').on('click', 'li', function (e) {
			draw.sigunguCode = $(this).attr("data-toggle");
			$("#travelContents").empty();
			draw.elementCount = 1;
			draw.elements();
			$(".sigunguLists").css('visibility', 'hidden');
			$('.sigungu').text($(this).context.innerHTML);
		})
	},

	areaDetailCodeParsing: function (data) {
		var list = data.response.body.items.item
		var sigunguDraw = '';
		if (list.code != 1) {
			$.each(list, function (i, item) {
				i += 1;
				if (i === 1) {
					sigunguDraw += "<div class='hiddenMenu'>"
						+ "<li class='sigunguList' data-toggle=''>" + '전체' + '</li>'
						+ "<li class='sigunguList' data-toggle=" + item.code + '>' + item.name + '</li>'
				} else if (i % 7 === 0) {
					sigunguDraw += "</div><div class='hiddenMenu'>"
						+ "<li class='sigunguList' data-toggle=" + item.code + '>' + item.name + '</li>'
				} else {
					sigunguDraw += "<li class='sigunguList' data-toggle=" + item.code + ">" + item.name + "</li>"
				}
			})
			$(".sigunguLists").append(sigunguDraw);
		} else {
			sigunguDraw =
				'<span>상세지역이 없습니다</span>'
			$(".sigunguLists").append(sigunguDraw)
		}
	},

	buttonAction: function () {
		$(".area").click(function () {
			$(".sigunguLists").css('visibility', 'hidden')
			$(".areaList").css('visibility', 'visible')
		})

		$(".sigungu").click(function () {
			$(".areaList").css('visibility', 'hidden')
			$(".sigunguLists").css('visibility', 'visible')
		})

		$(document).click(function (e) {
			if (e.target.className == '') {
				if ($(".areaList").css('visibility') != 'hidden') {
					$(".areaList").css('visibility', 'hidden')
				}
				if ($(".sigunguLists").css('visibility') != 'hidden') {
					$(".sigunguLists").css('visibility', 'hidden')
				}
			}
		});
	},

	detailPageIntroInfoDraw: function (data) {
		var InfoElements;
		var list = data.response.body.items.item
		var ref = list.contenttypeid
		if (ref === 12) { //관광지
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>문의 및 안내  </em></td><td class='introRight'>" + list.infocenter + "</td><li>"
				+ "<tr><td class='introLeft'><em>수용인원 	 </em></td><td class='introRight'>" + list.accomcount + "</td><li>"
				+ "<tr><td class='introLeft'><em>쉬는날	   </em></td><td class='introRight'>" + list.restdate + "</td><li>"
				+ "<tr><td class='introLeft'><em>개장일 </em></td><td class='introRight'>" + list.opendate + "</td><li>"
				+ "<tr><td class='introLeft'><em>이용시기  </em></td><td class='introRight'>" + list.useseason + "</td><li>"
				+ "<tr><td class='introLeft'><em>이용시간  </em></td><td class='introRight'>" + list.usetime + "</td><li>"
				+ "<tr><td class='introLeft'><em>체험안내	   </em></td><td class='introRight'>" + list.expguide + "</td><li>"
				+ "<tr><td class='introLeft'><em>체험가능연령 </em></td><td class='introRight'>" + list.expagerange + "</td><li>"
				+ "<tr><td class='introLeft'><em>유모차대여여부 	 </em></td><td class='introRight'>" + list.chkbabycarriage + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차가능 여부  </em></td><td class='introRight'>" + list.parking + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 14) { // 문화시설
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>문의 및 안내  </em></td><td class='introRight'>" + list.infocenterculture + "</td><li>"
				+ "<tr><td class='introLeft'><em>관람소요시간      </em></td><td class='introRight'>" + list.spendtime + "</td><li>"
				+ "<tr><td class='introLeft'><em>수용인원 	   </em></td><td class='introRight'>" + list.accomcountculture + "</td><li>"
				+ "<tr><td class='introLeft'><em>규모      </em></td><td class='introRight'>" + list.scale + "</td><li>"
				+ "<tr><td class='introLeft'><em>할인정보      </em></td><td class='introRight'>" + list.discountinfo + "</td><li>"
				+ "<tr><td class='introLeft'><em>이용시간 	  </em></td><td class='introRight'>" + list.usetimeculture + "</td><li>"
				+ "<tr><td class='introLeft'><em>이용요금 	   </em></td><td class='introRight'>" + list.usefee + "</td><li>"
				+ "<tr><td class='introLeft'><em>쉬는날	   </em></td><td class='introRight'>" + list.restdateculture + "</td><li>"
				+ "<tr><td class='introLeft'><em>유모차대여여부	 </em></td><td class='introRight'>" + list.chkbabycarriageculture + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차시설	   </em></td><td class='introRight'>" + list.parkingculture + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차요금  </em></td><td class='introRight'>" + list.parkingfee + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 15) { // 축제정보
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<div>" + list.program + "</div>"
				+ "<div>" + list.subevent + "</div>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>행사장소  </em></td><td class='introRight'>" + list.eventplace + "</td><li>"
				+ "<tr><td class='introLeft'><em>행사장위치안내 	 </em></td><td class='introRight'>" + list.placeinfo + "</td><li>"
				+ "<tr><td class='introLeft'><em>이용요금 	 </em></td><td class='introRight'>" + list.usetimefestival + "</td><li>"
				+ "<tr><td class='introLeft'><em>할인정보 	 </em></td><td class='introRight'>" + list.discountinfofestival + "</td><li>"
				+ "<tr><td class='introLeft'><em>예매처 	 </em></td><td class='introRight'>" + list.bookingplace + "</td><li>"
				+ "<tr><td class='introLeft'><em>행사시작일 	 </em></td><td class='introRight'>" + list.eventstartdate + "</td><li>"
				+ "<tr><td class='introLeft'><em>행사종료일	   </em></td><td class='introRight'>" + list.eventenddate + "</td><li>"
				+ "<tr><td class='introLeft'><em>관람가능연령	   </em></td><td class='introRight'>" + list.agelimit + "</td><li>"
				+ "<tr><td class='introLeft'><em>관람소요시간 </em></td><td class='introRight'>" + list.spendtimefestival + "</td><li>"
				+ "<tr><td class='introLeft'><em>할인정보 </em></td><td class='introRight'>" + list.discountinfofestival + "</td><li>"
				+ "<tr><td class='introLeft'><em>공연시간  </em></td><td class='introRight'>" + list.playtime + "</td><li>"
				+ "<tr><td class='introLeft'><em>주최자  </em></td><td class='introRight'>" + list.sponsor1 + "</td><li>"
				+ "<tr><td class='introLeft'><em>주최자연락처 </em></td><td class='introRight'>" + list.sponsor1tel + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 25) { // 여행코스
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>문의 및 안내  </em></td><td class='introRight'>" + list.infocentertourcourse + "</td><li>"
				+ "<tr><td class='introLeft'><em>코스테마	   </em></td><td class='introRight'>" + list.theme + "</td><li>"
				+ "<tr><td class='introLeft'><em>코스일정  </em></td><td class='introRight'>" + list.schedule + "</td><li>"
				+ "<tr><td class='introLeft'><em>코스총거리	   </em></td><td class='introRight'>" + list.distance + "</td><li>"
				+ "<tr><td class='introLeft'><em>코스총소요시간  </em></td><td class='introRight'>" + list.taketime + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 28) { //레포츠
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>문의 및 안내  </em></td><td class='introRight'>" + list.infocenterleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>예약 안내	   </em></td><td class='introRight'>" + list.reservation + "</td><li>"
				+ "<tr><td class='introLeft'><em>입장료	   </em></td><td class='introRight'>" + list.usefeeleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>수용인원 </em></td><td class='introRight'>" + list.accomcountleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>개장기간	   </em></td><td class='introRight'>" + list.openperiod + "</td><li>"
				+ "<tr><td class='introLeft'><em>개장시간  </em></td><td class='introRight'>" + list.openperiod + "</td><li>"
				+ "<tr><td class='introLeft'><em>이용시간  </em></td><td class='introRight'>" + list.usetimeleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>쉬는날 	 </em></td><td class='introRight'>" + list.restdateleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차시설  </em></td><td class='introRight'>" + list.parkingleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차요금		   </em></td><td class='introRight'>" + list.parkingfeeleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>유모차대여여부 	 </em></td><td class='introRight'>" + list.chkbabycarriageleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>신용카드가능여부  </em></td><td class='introRight'>" + list.chkcreditcardleports + "</td><li>"
				+ "<tr><td class='introLeft'><em>애완동물가능여부 </em></td><td class='introRight'>" + list.chkpetleports + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 32) { // 숙박정보 
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>문의 및 안내  </em></td><td class='introRight'>" + list.infocenterlodging + "</td><li>"
				+ "<tr><td class='introLeft'><em>예약 안내	   </em></td><td class='introRight'>" + list.reservationlodging + "</td><li>"
				+ "<tr><td class='introLeft'><em>예약 안내홈페이지 </em></td><td class='introRight'>" + list.reservationurl + "</td><li>"
				+ "<tr><td class='introLeft'><em>부대시설	   </em></td><td class='introRight'>" + list.subfacility + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차가능 여부  </em></td><td class='introRight'>" + list.parkinglodging + "</td><li>"
				+ "<tr><td class='introLeft'><em>객실내취사여부  </em></td><td class='introRight'>" + list.chkcooking + "</td><li>"
				+ "<tr><td class='introLeft'><em>식음료장  </em></td><td class='introRight'>" + list.foodplace + "</td><li>"
				+ "<tr><td class='introLeft'><em>객실수		   </em></td><td class='introRight'>" + list.roomcount + "</td><li>"
				+ "<tr><td class='introLeft'><em>수용가능인원 	 </em></td><td class='introRight'>" + list.accomcountlodging + "</td><li>"
				+ "<tr><td class='introLeft'><em>체크인 시간 	 </em></td><td class='introRight'>" + list.checkintime + "</td><li>"
				+ "<tr><td class='introLeft'><em>체크아웃 시간  </em></td><td class='introRight'>" + list.checkouttime + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차가능 여부  </em></td><td class='introRight'>" + list.parkinglodging + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 38) { // 쇼핑
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>매장안내 </em></td><td class='introRight'>" + list.shopguide + "</td><li>"
				+ "<tr><td class='introLeft'><em>문의및안내 </em></td><td class='introRight'>" + list.infocentershopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>영업시간</em></td><td class='introRight'>" + list.opentime + "</td><li>"
				+ "<tr><td class='introLeft'><em>쉬는날  </em></td><td class='introRight'>" + list.restdateshopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>규모 </em></td><td class='introRight'>" + list.scaleshopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>장서는날 </em></td><td class='introRight'>" + list.fairday + "</td><li>"
				+ "<tr><td class='introLeft'><em>문화센터바로가기  </em></td><td class='introRight'>" + list.culturecenter + "</td><li>"
				+ "<tr><td class='introLeft'><em>화장실 </em></td><td class='introRight'>" + list.restroom + "</td><li>"
				+ "<tr><td class='introLeft'><em>신용카드가능여부	   </em></td><td class='introRight'>" + list.chkbabycarriageshopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>신용카드가능여부	   </em></td><td class='introRight'>" + list.chkcreditcardshopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>애완동물가능여부	   </em></td><td class='introRight'>" + list.chkpetshopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차시설	   </em></td><td class='introRight'>" + list.parkingshopping + "</td><li>"
				+ "<tr><td class='introLeft'><em>판매품목별가격  </em></td><td class='introRight'>" + list.saleitemcost + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		} else if (ref === 39) { // 음식점
			InfoElements = "<div class='col-md-12'>"
				+ "<div class='col-md-12'>"
				+ "<div class='cntBox'>"
				+ "<table class='table table-responsive'>"
				+ "<tr><td colspan='2'><em>상세 정보</em></td><p style='text-align:justify;'></tr>"
				+ "<tr><td class='introLeft'><em>대표메뉴 </em></td><td class='introRight'>" + list.firstmenu + "</td><li>"
				+ "<tr><td class='introLeft'><em>취급메뉴 </em></td><td class='introRight'>" + list.treatmenu + "</td><li>"
				+ "<tr><td class='introLeft'><em>문의및안내 </em></td><td class='introRight'>" + list.infocenterfood + "</td><li>"
				+ "<tr><td class='introLeft'><em>할인정보 </em></td><td class='introRight'>" + list.discountinfofood + "</td><li>"
				+ "<tr><td class='introLeft'><em>영업시간  </em></td><td class='introRight'>" + list.opentimefood + "</td><li>"
				+ "<tr><td class='introLeft'><em>주차가능 여부</em></td><td class='introRight'>" + list.parkingfood + "</td><li>"
				+ "<tr><td class='introLeft'><em>급연/흡연 여부  </em></td><td class='introRight'>" + list.smoking + "</td><li>"
				+ "<tr><td class='introLeft'><em>포장가능 여부  </em></td><td class='introRight'>" + list.packing + "</td><li>"
				+ "<tr><td class='introLeft'><em>쉬는날  </em></td><td class='introRight'>" + list.restdatefood + "</td><li>"
				+ "<tr><td class='introLeft'><em>신용카드가능여부	   </em></td><td class='introRight'>" + list.chkcreditcardfood + "</td><li>"
				+ "</table>"
				+ "</div>"
				+ "</div>"
			$("#detailIntro").append(InfoElements)
		}

	},

	getMonth: function () {
		$('#festivalMonth').append(this.date.getMonth() + 1)
	},
}

function moreView() {
	draw.elementCount += 1;
	draw.elements();
}

function getLocation() {
	$('#travelContents').empty();
	$('#notification').text("위치정보를 가져오고 있습니다...");
	$('#information').css('display', 'block');
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(getGeolocation, getError, {
			enableHighAccuracy: true,
			maximumAge: 0,
			timeout: 50000
		});
	} else {
		alert('현재 사용하는 브라우저는 위치정보를 가져올수 없습니다.')
	}
}

//geolocation api 
//https://hudi.kr/geolocation-api-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%94%94%EB%B0%94%EC%9D%B4%EC%8A%A4-%EC%9C%84%EC%B9%98-%EC%A0%95%EB%B3%B4-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0/
//참고

function getGeolocation(position) {
	draw.mapY = position.coords.latitude;
	draw.mapX = position.coords.longitude;
	$('#moreViewWrap').css('display', 'block');
	$('#information').css('display', 'none');
	draw.elements();
}

function getError(error) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			alert("위치정보 확인을 거부하였습니다.")
			$('#notification').text("위치정보를 확인할 수 없습니다.");
			break;
		case error.POSITION_UNAVAILABLE:
			alert("위치정보를 사용할 수 없습니다.")
			$('#notification').text("위치정보를 확인할 수 없습니다.");
			break;
		case error.TIMEOUT:
			alert("위치정보를 확인하는데 실패하였습니다.\n(TIMEOUT)")
			$('#notification').text("위치정보를 확인할 수 없습니다.");
			break;
		case error.UNKNOWN_ERROR:
			alert("위치정보를 확인하는데 실패하였습니다.\n(알수없는 오류)")
			$('#notification').text("위치정보를 확인할 수 없습니다.");
			break;
	}
}