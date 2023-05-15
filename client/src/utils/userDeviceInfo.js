const ua = navigator.userAgent;

export const isMobile = {
  android: () => ua.match(/android/i),
  ios: () => ua.match(/iphone|ipad|ipod/i),
  windowsPh: () => ua.match(/windows phone/i),
  any: function () {
    return this.android() || this.ios() || this.windowsPh();
  },
};
export const isDesktop = {
  linux: () => ua.match(/linux/i),
  mac: () => ua.match(/mac os/i),
  windows: () => ua.match(/windows nt/i),
  any: function () {
    return this.linux() || this.mac() || this.windows();
  },
};
export const isBrowser = {
  chrome: () => ua.match(/chrome/i),
  safari: () => ua.match(/safari/i),
  firefox: () => ua.match(/firefox/i),
  opera: () => ua.match(/opera|opera mini/i),
  ie: () => ua.match(/msie|iemobile/i),
  edge: () => ua.match(/edg/i),
  any: function () {
    return (
      this.chrome() || this.safari() || this.firefox() || this.opera() || this.ie() || this.edge()
    );
  },
};
