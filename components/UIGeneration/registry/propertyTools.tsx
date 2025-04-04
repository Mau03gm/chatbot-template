import { PropertyCard } from "../tools/PropertyCard";


export const propertyTools = {
    PropertyCard: {
      component: PropertyCard,
      getProps: (tool:Tool, handlers:any) => ({
        key: tool.toolCallId,
        properties: tool.result.properties,
        onSelect: handlers.PropertyCard,
      }),
    },
  };