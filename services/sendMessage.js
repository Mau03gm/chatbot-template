export const sendMessage = async (messages) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages)
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { exito: false, mensaje: 'Error al enviar el correo' };
    }
};
