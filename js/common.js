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
        var that = this
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
    },

    getMonth : function() {
        $('#festivalMonth').append(this.date.getMonth() + 1)
    },

}