import { StayDuration } from "../tools/StayDuration";

export const stayDurationTools = {
  StayDuration: {
    component: StayDuration,
    getProps: (tool:Tool, handlers:any) => ({
      key: tool.toolCallId,
      options: tool.result.options,
      onSelect: handlers.StayDuration,
    }),
  },
};