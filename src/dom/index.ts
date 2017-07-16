import { IS_NON_DIMENSIONAL } from "../constants";
import options from "../options";

export function createNode(nodeName: string, isSvg: boolean): HTMLElement {
    const node: any = isSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", nodeName)
        : document.createElement(nodeName);
    node.normalizedNodeName = nodeName;
    return node;
}

export function removeNode(node: HTMLElement) {
    const parentNode = node.parentNode;
    if (parentNode) {
        parentNode.removeChild(node);
    }
}

export function setAccessor(
    node: HTMLElement,
    name: string,
    old: any,
    value: any,
    isSvg: boolean,
) {
    if (name === "className") {
        name = "class";
    }
    if ("ref" === name) {
        if (old) {
            old(null);
        }
        if (value) {
            value(node);
        }
    } else if ("class" === name) {
        node.className = value || "";
    } else if ("style" === name) {
        if (!value || typeof value === "string" || typeof old === "string") {
            node.style.cssText = value || "";
        }
        if (value && typeof value === "object") {
            if (typeof old !== "string") {
                for (const i in old) {
                    if (!(i in value)) {
                        node.style[i] = "";
                    }
                }
            }
            for (const i in value) {
                node.style[i] = typeof value[i] === "number"
                && IS_NON_DIMENSIONAL.test(i) === false ? (value[i] + "px") : value[i];
            }
        }
    } else if ("dangerouslySetInnerHTML" === name) {
        if (value) {
            node.innerHTML = value._html || "";
        }
    } else if (name[0] === "o" && name[1] === "n") {
        const oldName = name;
        name = name.replace(/Capture$/, "");
        const useCapture = oldName !== oldName;
        name = name.toLowerCase().substring(2);
        if (value) {
            if (!old) {
                node.addEventListener(name, eventProxy, useCapture);
            }
        } else {
            node.removeEventListener(name, eventProxy, useCapture);
        }
        const n: any = node;
        if (!n._listeners) {
            n._listeners = {};
        }
        n._listeners[name] = value;
    } else if (name !== "list" && name !== "type" && !isSvg && name in node) {
        setProperty(node, name, value == null ? "" : value);
        if (value == null || value === false) {
            node.removeAttribute(name);
        }
    } else {
        const ns = isSvg && (name !== (name = name.replace(/^xlink\:?/, "")));
        // null || undefined || void 0 || false
        if (value == null || value === false) {
            if (ns) {
                node.removeAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    name.toLowerCase(),
                );
            } else {
                node.removeAttribute(name);
            }
        } else if (typeof value !== "function") {
            if (ns) {
                node.setAttributeNS(
                    "http://www.w3.org/1999/xlink",
                    name.toLowerCase(),
                    value,
                );
            } else {
                node.setAttribute(name, value);
            }
        }
    }
}

function setProperty(node, name, value) {
    try {
        node[name] = value;
    } catch (e) { }
}

function eventProxy(e) {
    return this._listeners[e.type](options.event && options.event(e) || e);
}