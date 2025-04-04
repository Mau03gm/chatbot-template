import { RoomPreferences } from "../tools/RoomPreferences";


export const roomPreferencesTools = {
    RoomPreferences: {
      component: RoomPreferences,
      getProps: (tool:Tool, handlers:any) => ({
        key: tool.toolCallId,
        options: tool.result.options,
        onSelect: handlers.RoomPreferences,
      }),
    },
  };