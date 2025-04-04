import { PropertyCard } from "../tools/PropertyCard";


export const propertyTools = {
    StayDuration: {
      component: PropertyCard,
      getProps: (tool:Tool, handlers:any) => ({
        key: tool.toolCallId,
        options: tool.result.options,
        onSelect: handlers.PropertyCard,
      }),
    },
  };