import { VNode } from "./vnode";
import { Component } from "component";

const options: {
    beforeUnmount?: (component: Component) => void;
    afterMount?: (component: Component) => void;
    syncComponentUpdates?: boolean;
    debounceRendering?: (render: () => void) => void;
    vnode?: (vnode: VNode) => void;
    event?: (event: Event) => Event;
} = {};

export default options;