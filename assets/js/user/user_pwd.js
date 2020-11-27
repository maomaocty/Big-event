$(function () {
  let form = layui.form;
  let layer = layui.layer;


  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须是6到12位，且不能出现空格"],
    // pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验新密码和原密码是否一致
    newPwd: function (value, item) {
      // value 新密码的内容
      let oldPwd = $("[name=oldPwd]").val();
      if (value === oldPwd) {
        return "新密码不能与原密码一致"
      }
    },
    // 校验两次输入的密码是否一致
    samePwd: function (value) {
      // value:确认新密码的值
      let newPwd = $("[name=newPwd]").val()
      if (value !== newPwd) {
        return "两次输入的新密码不一致"
      }
    }
  })

  // 提交form表单 => 密码重置
  let $form = $("#pwdForm");
  $form.on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("重置密码失败" + res.message);
        }
        layer.msg("重置密码成功")
        $form.get(0).reset()
      }
    })
  })
})