"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var Add;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  return {
    setters: [],
    execute: function () {
      Add =
      /*#__PURE__*/
      function () {
        function Add() {
          _classCallCheck(this, Add);
        }

        _createClass(Add, [{
          key: "fn",
          value: function fn() {
            $('#js-submit').click(yd.throttle(function () {
              var content = {
                bookname: $('#inputBookname').val(),
                author: $('#inputAuthor').val(),
                price: $('#inputPrice').val()
              };
              fetch('/create', {
                method: 'post',
                body: JSON.stringify(content),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(function (res) {
                if (res.ok) {
                  return res.json();
                }
              }).then(function (json) {
                if (json.message === 'ok') {
                  return layer.msg('添加书籍成功', {
                    icon: 1,
                    time: 1500
                  });
                }
              });
            }, 5000));
          }
        }]);

        return Add;
      }();

      _export("default", Add);
    }
  };
});
