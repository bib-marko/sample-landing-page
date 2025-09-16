import { computed, watchEffect } from "vue";
import { useWindowSize } from "@vueuse/core";

function detectDeviceType() {
  const USER_AGENT = navigator.userAgent.toLowerCase();

  const isMobile =
    /iphone|ipod|android.*mobile|windows phone|blackberry|iemobile|opera mini/.test(
      USER_AGENT
    );
  const isTablet = /ipad|android(?!.*mobile)|tablet/.test(USER_AGENT);
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

export function useOrientation() {
  const WINDOW_SIZE = useWindowSize();

  const WIDTH = computed(() => WINDOW_SIZE.width.value);
  const HEIGHT = computed(() => WINDOW_SIZE.height.value);

  const IS_LANDSCAPE = computed(() => HEIGHT.value < WIDTH.value);
  const IS_PORTRAIT = computed(() => HEIGHT.value >= WIDTH.value);

  const DEVICE = detectDeviceType();

  const IS_MOBILE = computed(() => DEVICE.isMobile);

  const IS_TABLET = computed(() => DEVICE.isTablet);

  const IS_DESKTOP = computed(() => WIDTH.value >= 1439 && IS_LANDSCAPE.value);

  const IS_MOBILE_PORTRAIT = computed(
    () => IS_MOBILE.value && IS_PORTRAIT.value
  );

  const IS_MOBILE_LANDSCAPE = computed(
    () => IS_MOBILE.value && IS_LANDSCAPE.value
  );

  const IS_TABLET_PORTRAIT = computed(
    () => WIDTH.value >= 720 && WIDTH.value <= 1280 && IS_PORTRAIT.value
  );

  const IS_TABLET_LANDSCAPE = computed(
    () => WIDTH.value >= 768 && WIDTH.value <= 1438 && IS_LANDSCAPE.value
  );

  // Log all values when screen size changed. Uncomment this for checking
  watchEffect(() => {
    // console.clear();
    // console.log("Window Size:", WIDTH.value, "x", HEIGHT.value);
    // console.log("IS_MOBILE:", IS_MOBILE.value);
    // console.log("IS_TABLET:", IS_TABLET.value);
    // console.log("IS_DESKTOP:", IS_DESKTOP.value);
    // console.log("IS_LANDSCAPE:", IS_LANDSCAPE.value);
    // console.log("IS_PORTRAIT:", IS_PORTRAIT.value);
    // console.log("IS_MOBILE_PORTRAIT:", IS_MOBILE_PORTRAIT.value);
    // console.log("IS_MOBILE_LANDSCAPE:", IS_MOBILE_LANDSCAPE.value);
    // console.log("IS_TABLET_PORTRAIT:", IS_TABLET_PORTRAIT.value);
    // console.log("IS_TABLET_LANDSCAPE:", IS_TABLET_LANDSCAPE.value);
    // console.log("===============================================");
  });

  return {
    IS_LANDSCAPE,
    IS_PORTRAIT,
    IS_MOBILE,
    IS_TABLET,
    IS_DESKTOP,
    IS_MOBILE_PORTRAIT,
    IS_MOBILE_LANDSCAPE,
    IS_TABLET_PORTRAIT,
    IS_TABLET_LANDSCAPE,
  };
}
