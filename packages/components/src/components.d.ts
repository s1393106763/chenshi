/*
 * @Description:
 * @Date: 2023-02-20 19:20:06
 * @Author: didi
 * @LastEditTime: 2023-05-22 16:12:52
 */
import * as components from './index';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CsButton: typeof components.Button;
    CsHeader: typeof components.Header;
    CsImageViewer: typeof components.ImageViewer;
    CsLoading: typeof components.Loading;
    CsDialog: typeof components.Dialog;
    CsToast: typeof components.Toast;
    CsLayout: typeof components.Layout;
    CsSplit: typeof components.Split;
    CsVideoPlayer: typeof components.VideoPlayer;
  }
}
export {};
