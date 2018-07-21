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
            $(document).on('click', '.sigunguList', function(e) {
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
                    if (i === 0) {
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