export const handleMaskValue = (valueMask) => {
    const temp = valueMask?.split('.').join('');
    const rx_live = /^\d*$/;
    if (rx_live.test(temp)) {
        return temp?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } else {
        return temp;
    }
};
export const handleParseMask = (valueMask) => {
    return Number(valueMask.toString().split('.').join(''));
};
