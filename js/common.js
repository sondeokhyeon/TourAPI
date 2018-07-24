var common = {

    leftMenuImport : function () {
        var $div = $('#fh5co-main-menu');
        $div.load("../cmm/left-menu.html");
    }, 

    date : new Date(),

    getDate : function () {
        var year = this.date.getFullYear(),
            month = this.date.getMonth() + 1,
            day = this.date.getDate();

        if (month >= 1 && month < 10) {
            month = "0" + month;
        } 			
        day = "0" + 1;
        var result = year + month + day
        return result;
    },

    getInfo: function (method, flag, option, returnFunction) {
        console.log(option)
        $.ajax({
            crossOrigin: true,
            type: method,
            url: "http://api.visitkorea.or.kr/openapi/service/rest/KorService/" + flag,
            data: "ServiceKey=%2B6kreK3SlK%2FHeXSglkdHXVcOjgM%2BHoHwQK%2BbDXAlMNTwbkNSgJXPlywyo7CO1ntAZ5CDfYU4xFI1p%2F9TJ3fbFw%3D%3D&"+ option + "&_type=json",
            dataType: "json",
            success: function (data) {
                if (data.response.header.resultCode !== "0000") {
                    alert('데이터 통신에 오류가 발생하였습니다.\n 지속적으로 문제가 발생하면 개발자에게 문의하세요')
                }
                returnFunction(data)
            }
        });
    },   areaChange : function () {
            $(".areaCodes").click(function() {
                $(".text-right").css("display","block");
                draw.areaCode = $(this).attr("data-toggle");
                $("#travelContents").empty();
                draw.elementCount = 1;
                $(".sigunguLists").empty();
                draw.sigunguCode = '';
                draw.areaSigunguCodeGet();
                draw.elements();
                $(".areaList").css('visibility','hidden');
                $('.area').text($(this).context.innerHTML);
                $('.sigungu').text('전체');
            })
        },

        sigunguChange : function () {
            $('.sigunguLists').on('click', 'li', function(e) {
                draw.sigunguCode = $(this).attr("data-toggle");
                $("#travelContents").empty();
                draw.elementCount = 1;
                draw.elements(); 
                $(".sigunguLists").css('visibility','hidden');
                $('.sigungu').text($(this).context.innerHTML);
            })
        },

        areaDetailCodeParsing : function (data) {
            var list = data.response.body.items.item
            var sigunguDraw = '';
            if (list.code != 1) {
                $.each(list, function (i, item) {
                    i += 1;
                    if (i === 1) {
                        sigunguDraw +=  "<div class='hiddenMenu'>"
                                            +"<li class='sigunguList' data-toggle=''>" + '전체' +'</li>' 
                                            +"<li class='sigunguList' data-toggle="+ item.code +'>'+ item.name +'</li>'
                    } else if (i % 7 === 0) {
                        sigunguDraw +=  "</div><div class='hiddenMenu'>"
                                            +"<li class='sigunguList' data-toggle="+ item.code +'>'+ item.name +'</li>'
                    } else {
                        sigunguDraw += "<li class='sigunguList' data-toggle="+ item.code +">"+ item.name +"</li>" 
                    }
                })
                $(".sigunguLists").append(sigunguDraw);
            } else {
                sigunguDraw = 
                    '<span>상세지역이 없습니다</span>'
                    $(".sigunguLists").append(sigunguDraw)
            }
        },	

        buttonAction : function() {
			$(".area").click(function() {
				$(".sigunguLists").css('visibility','hidden')
				$(".areaList").css('visibility','visible')
			}) 

			$(".sigungu").click(function() {
				$(".areaList").css('visibility','hidden')
				$(".sigunguLists").css('visibility','visible')
			}) 

			$(document).click(function(e) {
				if(e.target.className == '' ) {
					if ($(".areaList").css('visibility') != 'hidden') {
						$(".areaList").css('visibility','hidden')
					}
					if ($(".sigunguLists").css('visibility') != 'hidden') {
						$(".sigunguLists").css('visibility','hidden')
					}
				}	
            });
        },   

        getMonth : function() {
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
    $('#information').css('display','block');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getGeolocation, getError, {
            enableHighAccuracy:true,
            maximumAge : 0,
            timeout : 50000
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
    $('#moreViewWrap').css('display','block');
    $('#information').css('display','none');
    draw.elements();
}

function getError(error) {
    switch(error.code) {
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