var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by yunxian on 2017/6/1.
 */
var UrlSubscriber = function () {
  function UrlSubscriber($history) {
    _classCallCheck(this, UrlSubscriber);

    this.$history = $history;
  }

  _createClass(UrlSubscriber, [{
    key: 'triggerQueryHandler',
    value: function triggerQueryHandler() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof this.$history.queryChange === 'function') {
        this.$history.queryChange(query);
      }
    }
  }, {
    key: 'triggerPathHandler',
    value: function triggerPathHandler(path) {
      if (typeof this.$history.pathChange === 'function') {
        this.$history.pathChange(path);
      }
    }
  }]);

  return UrlSubscriber;
}();

export { UrlSubscriber as default };