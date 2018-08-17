/**
 * M6-Core TypeScript 描述
 * Created by xiechunming on 2018/06/05.
 */

declare namespace M6NS {
    class Network {
        static asGet(url, params, opts, successCallback, errorCallback): void;
        static asPost(url, params, opts = {}, successCallback, errorCallback): void;
    }

    class Popup {
        static show(context: any, type: string, textContent: any, opts?: {}): void;
        static dismiss(context: any, type: string, opts?: {}): void;
        static getData(context: any, type: string, callback: (state: {}) => void): void;
        static setState(context: any, state: {}, type: string, callback: (state: {}) => void): void;
    }

    class View {
        constructor(props?: any, Controller?: Controller, config?: any);
        planToWillMount(): void; // 页面即将初始化
        planToDidMount(): void; // 页面初始化完成，可安全访问数据状态对象
        planToWillUnmount(): void; // 页面即将卸载
        getViewData(): {}; // 获取表单数据状态
        setViewData(data: {}, callback: (viewData: {}) => void): void; // 设置表单数据状态
        getViewStyle(): {}; // 获取页面数据状态
        setViewStyle(viewStyle: {}, callback: (viewStyle: {}) => void, refresh?: boolean): void; // 设置页面数据状态
        historyAction(): string; // 获取当前页面在history栈中状态
        getUrl(withoutPrefixSymbol?: boolean): string; // 获取当前页面url路径
        getBundle(url?: string, native?: boolean): {}; // 获取页面传递数据对象
        setBundle(url?: string, bundle?: {}, callback?: () => void): void; // 设置页面传递数据对象
        go(url: string, state: {}, outer: boolean): void; // 路由前进
        goBack(state?: {}): void; // 路由返回
        getController(): Controller; // 获取当前页面注册的控制器
        regDef(name: string): object; // 钩子对象
    }

    class Controller {
        constructor(context: View);
        toBind(methods?: object): void;
        didMount(): void;
        willUnmount(): void;
        setContext(context: View): void;
        getContext(): View;
        go(url: string, state: {}, outer: boolean): void;
        goBack(state?: {}): void;
    }
}

declare interface M6Static {
    Utils: {
        Prototype: any;
        ImgSrc: any;
        Network: M6NS.Network;
        NetworkCfg: any;
        Broadcast: any;
        Storage: {Cookie, LocalFileStorage, LocalStorage, SessionStorage, IndexedDB};
        Service: {Push: {}, MBridge: {}};
        Basic: any;
    };
    /** 网络请求 */
    Fetch(config: {
        url: string;
        method?: string,
        params?: {};
        networkOpt?: {
            timeout?: number,
            processable?: boolean,
            mock?: boolean,
            headers?: {}, // 自定义请求头
            responseType?: string, // 服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            onUploadProgress: (progressEvent: any) => void, // 上传处理进度事件
            onDownloadProgress: (progressEvent: any) => void, // 下载处理进度事件
        };
        callback?: (entity: {
            flag: number, // 服务器响应状态 链路异常-1，网络异常0，网络正常1
            result: {}, // 服务器提供的响应
            response: {}, // 服务器响应
            error: any,
        }) => void;
    }): void;
    /** 弹窗事件 */
    Popup: M6NS.Popup;
    /** 数据状态订阅 */
    Connect: any;
    Dom: any;
    Router: {
        Ro: any;
        Re: any;
        Shortcut: any;
        Dialog: any;
    };
    Components: {
        FrameComponent: any;
        BoxCell: any; BoxCellLabel: any; BoxCellIcon: any; BoxCellSpan: any;
        Header: any; NavBtn: any; Search: any; Exit: any;
        Layout: any; Root: any; Body: any; Div: any; Horizontal: any; Visible: any; Quote: any; Form: any;
        InputArea: any; Lake: any; Button: any; Buttons: any; List: any; ListItem: any; Dictionary: any; DateTime: any; Table: any; SecurityCode: any;
        Img: any; Icon: any;
        Select: any; Toggle: any; Checkbox: any;
        Schedule: any; Signature: any; Map: any; Progress: any;
    };
    View: M6NS.View;
    Controller: M6NS.Controller;
}

declare const M6Core: M6Static;
export default M6Core;
export declare module "m6-core" {
    export = M6Core;
}