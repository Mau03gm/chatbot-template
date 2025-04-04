import { budgetTools } from './budgetTools';
import { stayDurationTools } from './stayDurationTools';
import { locationTools } from './locationTools';

type ToolComponentConfig = {
    component: React.ComponentType<any>;
    getProps: (tool: Tool, handlers: any) => any;
  };
  
export const toolComponentMap : Record<string, ToolComponentConfig> = {
  ...budgetTools,
  ...stayDurationTools,
  ...locationTools,
};
