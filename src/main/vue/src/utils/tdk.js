const TARGET_NODE = process.env.VUE_ENV === "server";

function getTdk(vm) {
  const { tdk } = vm.$options;
  if (tdk) {
    return tdk.call(vm);
  }
}

function updateTdk(vm, vdom) {
  const tdk = getTdk(vm);
  if (tdk) {
    vdom.title = tdk.title;
    vdom.description = tdk.description;
    vdom.keywords = tdk.keywords;
    // for append more meta or link seo need
    vdom.ssrHeadAddInfo = tdk.ssrHeadAddInfo;
  }
  if (vdom) {
    vdom.title = vdom.title || "SSR PAGE";
    vdom.description = vdom.description || "";
    vdom.keywords = vdom.keywords || "";
    vdom.ssrHeadAddInfo = vdom.ssrHeadAddInfo || "";
  }
}

function dataPromiseUpdateTdk() {
  if (this.dataPromise) {
    this.dataPromise.then(() => {
      updateTdk(this, document);
    });
  } else {
    updateTdk(this, document);
  }
}

const serverTdkMixin = {
  created() {
    updateTdk(this, this.$ssrContext);
  }
};

const clientTdkMixin = {
  mounted() {
    dataPromiseUpdateTdk.call(this);
  },
  beforeRouteUpdate(to, from, next) {
    next();
    dataPromiseUpdateTdk.call(this);
  }
};

export default (TARGET_NODE ? serverTdkMixin : clientTdkMixin);
