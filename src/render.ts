import { diff } from "./vdom/diff";
import { VNode } from "./vnode";

const child = {};

/**
 * 创建组件到dom上
 * @param vnode jsx
 * @param parent 挂载的dom元素
 * @param merge 原dom元素
 */
export function render(vnode: VNode, parent: Element, merge: Element, domChild?: any) {
    return diff(merge, vnode, {}, false, parent, false, domChild || child);
}
