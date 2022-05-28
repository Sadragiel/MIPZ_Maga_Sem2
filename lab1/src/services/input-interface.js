const generateId = () => (Math.random() + 1).toString(36).substring(7);

export function createEmptyInputItem() {
    return {
        id: generateId(),
        name: '',
        xl: '',
        yl: '',
        xh: '',
        yh: '',
    };
}
