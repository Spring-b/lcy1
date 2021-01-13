/**
 * ajax初始化
 */
ajaxcs();
/**
 * 页面加载
 */
rendCategory();
/**
 * 删除
 */
$('.count tbody').on("click", '.del', function () {
    del(this);
})
/**
 * 修改
 */
$('.count tbody').on("click", '.exit', function () {
    var that = this
    exit(that);
})
/**
 * 添加
 */
$('button:contains("添加类别")').on('click', function () {
    add();
})

function dorm(data, index) {
    $('form input').eq(0).val(data.name)
    $('form input').eq(1).val(data.alias)
    $('form input').eq(2).val(data.id)
    $('form').on("submit", function (e) {
        e.preventDefault();
        var data = $('form').serialize();
        $.ajax({
            type: 'POST',
            url: "/my/category/update",
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    rendCategory();
                    layer.close(index);
                }
            },
        });
    });
}

function ajaxcs() {
    var URL = 'http://www.itcbc.com:8080';
    $.ajaxPrefilter(function (option) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        };
        option.url = URL + option.url;
        option.complete = function (xhr) {
            var res = xhr.responseJSON;
            if (res && res && res.status === 1 && res.message === "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '../login.html';
            }
        }
    });
};

function rendCategory() {
    $.ajax({
        url: "/my/category/list",
        success: function (res) {
            if (res.status === 0) {
                var html = template("tpl-list", res);
                $('.count tbody').html(html);
            }
        },
    })
};

function del(that) {

    var id = $(that).data('id');
    $.ajax({
        url: '/my/category/delete',
        data: {
            id: id
        },
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                var html = template("tpl-list", res);
                $('.count tbody').html(html);
            }
            rendCategory();
        },
    });

}


function add() {
    var index = layer.open({
        type: 1,
        title: '添加分类',
        content: $('#eye').html(),
        area: ["500px", "250px"]
    });
    $('form').on("submit", function (e) {
        e.preventDefault();
        var data = $('form').serialize();
        $.ajax({
            type: 'POST',
            url: "/my/category/add",
            data: data,
            success: function (res) {
                layer.msg(res.message);
                if (res.status == 0) {
                    rendCategory();
                    layer.close(index);
                }
            },
        });
    });
    // $('.option').css({
    //     "display": "block"
    // });
    // $('.add').one("click", function (e) {
    //     e.preventDefault();
    //     var data = $('form').serialize();
    //     $.ajax({
    //         type: 'POST',
    //         url: "/my/category/add",
    //         data: data,
    //         success: function (res) {
    //             layer.msg(res.message);
    //             if (res.status == 0) {
    //                 $('.option').css({
    //                     "display": "none"
    //                 });
    //                 $('.option input').val('');
    //                 rendCategory();
    //             }
    //         },
    //     });
    // });

}

function exit(that) {
    var index = layer.open({
        type: 1,
        title: '添加分类',
        content: $('#exit').html(),
        area: ["500px", "250px"]
    });
    $.ajax({
        url: "/my/category/list",
        success: function (res) {
            if (res.status === 0) {
                var data = $(that).data();
                console.log(data);
                dorm(data, index);
            }
        },
    })
}