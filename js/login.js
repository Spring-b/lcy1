/**
 * 登录界面
 */

$('.login form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    // console.log(data);
    $.ajax({
        type: "POST",
        url: 'http://www.itcbc.com:8080/api/login',
        data: data,
        success: function (res) {
            console.log(res);
            layer.msg(res.message);
            if (res.status === 0) {
                localStorage.setItem("token", res.token)
                location.href = './staice/article_gl.html'
            }
        },
        error: function (xhr) {
            var res = xhr.responseJSON;
            if (res || res.status === 1) {
                layer.msg(res.message);
            }
        },
        complete: function (xhr) {
            var res = xhr.responseJSON;
            console.log(res);
        }
    })
})