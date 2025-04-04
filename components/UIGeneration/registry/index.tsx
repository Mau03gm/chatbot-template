import { budgetTools } from './budgetTools';
import { stayDurationTools } from './stayDurationTools';
import { locationTools } from './locationTools';
import { roomPreferencesTools } from './roomPreferenceTools';
import { propertyTools } from './propertyTools';

type ToolComponentConfig = {
    component: React.ComponentType<any>;
    getProps: (tool: Tool, handlers: any) => any;
  };
  
export const toolComponentMap : Record<string, ToolComponentConfig> = {
  ...budgetTools,
  ...stayDurationTools,
  ...locationTools,
  ...roomPreferencesTools,
  ...propertyTools,
};
