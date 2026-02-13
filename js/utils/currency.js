/** Formateo de precios */
export const Currency = {

    format(amount) {
        return `$U ${amount.toLocaleString('es-UY')}`;
    },

    calculateDiscount(original, descuento) {
        return Math.round(((original - descuento) / original) * 100);
    }
};