import { LocationSelector } from "../tools/LocationSelector";

export const locationTools = {
    LocationSelector: {
      component: LocationSelector,
      getProps: (tool:Tool, handlers:any) => ({
        key: tool.toolCallId,
        options: tool.result.options,
        onSelect: handlers.LocationSelector,
      }),
    },
  };