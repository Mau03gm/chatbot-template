type Option = {
    id: string;
    label: string;
    value: string;
  };

  type Property = {
    id: string;
    name: string;
    price: number;
    location: string;
    features: string[];
    imageUrl: string;
  };
  
  type Tool = {
    toolName: string;
    toolCallId: string;
    state: string;
    result: {
        options?: string[];
        properties?: any[];
    };
}