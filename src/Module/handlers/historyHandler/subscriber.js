/**
 * Created by yunxian on 2017/6/1.
 */
export default class UrlSubscriber {
  constructor($history) {
    this.$history = $history;
  }
  triggerQueryHandler(query) {
    if (typeof this.$history.queryChange === 'function') {
      this.$history.queryChange(query);
    }
  }
  triggerPathHandler(path) {
    if (typeof this.$history.pathChange === 'function') {
      this.$history.pathChange(path);
    }
  }
}