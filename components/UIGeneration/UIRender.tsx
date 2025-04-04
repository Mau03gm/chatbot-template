'use client';

import React from "react";
import { toolComponentMap } from "./registry";
import { handlersMap } from "../handlers";

interface propsUIRender {
    tool: Tool;
    append: any
}
export function UIRender(propsUI: propsUIRender) {
    const toolName = propsUI.tool.toolName.charAt(0).toUpperCase() + propsUI.tool.toolName.slice(1);
    const config = toolComponentMap[toolName];
    const Component = config.component;
    const handlers= handlersMap(propsUI.append);
    const props = config.getProps(propsUI.tool, handlers);

    const { key, ...restProps } = props;
    
    return (
            <Component key={key} {...restProps} />

    );
}
