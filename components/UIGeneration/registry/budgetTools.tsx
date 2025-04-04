import { BudgetSelector } from "../tools/BudgetSelector";

export const budgetTools = {
  BudgetSelector: {
    component: BudgetSelector,
    getProps: (tool: Tool, handlers: any) => ({
      key: tool.toolCallId,
      options: tool.result.options,
      onSelect: handlers.BudgetSelector,
    }),
  },
};
