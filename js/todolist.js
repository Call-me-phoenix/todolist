$(function () {
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您想要的内容")
            } else {
                var local = getData();
                local.push({ title: $(this).val(), done: false });
                saveData(local);
                load();
                $(this).val("");
            }
        }
    })
    // 点击删除对应的小li
    // 点击之后的处理顺序
    // 获取本地存储的数据
    // 修改数据
    // 保存到本地存储
    // 重新渲染结果
    $("ol,ul").on("click", "a", function () {
        var data = getData();
        var index = $(this).attr("id");
        console.log(index);
        data.splice(index, 1);
        saveData(data);
        load();
    })
    // checked复选框操作
    $("ol,ul").on("click", "input", function () {
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        saveData(data);
        load();
    });
    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存数据到本地存储
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    };
    // 渲染添加小li
    function load() {
        $("ol,ul").empty();
        var data = getData();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' ><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' ><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>");
                todoCount++;
            }
        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})