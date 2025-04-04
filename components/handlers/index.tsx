export const createDefaultHandler = (label: string, append:any) => (value: string | string[]) => {
    const content = Array.isArray(value)
      ? `${label}: ${value.join(', ')}`
      : `${label}: ${value}`;
  
    append({
      role: 'user',
      content,
    });
  };
  
  export const handlersMap = (append:any) => ({
    BudgetSelector: createDefaultHandler('He seleccionado el presupuesto',append),
    LocationSelector: createDefaultHandler('Me interesa la zona', append),
    RoomPreferences: createDefaultHandler('Mis preferencias son', append),
    StayDuration: createDefaultHandler('Planeo quedarme', append),
    PropertySelector: createDefaultHandler('He seleccionado la propiedad', append),
  });
  