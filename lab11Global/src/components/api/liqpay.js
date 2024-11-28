import CryptoJS from 'crypto-js';

const LIQPAY_PUBLIC_KEY = 's/XXXXxxxqqq/andbox_i1180960224';  // Ваш LiqPay Public Key
const LIQPAY_PRIVATE_KEY = 'sandbox_XXXXXXX/XysjrvqzETT1mDbWisgJCbUYm1mgh7x2NRJhIa2W';  // Ваш LiqPay Private Key

// Перетворення даних в base64
export const toBase64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
};

// Створення підпису для LiqPay
export const createLiqPaySignature = (base64Data) => {
    return CryptoJS.enc.Base64.stringify(
        CryptoJS.SHA1(LIQPAY_PRIVATE_KEY + base64Data + LIQPAY_PRIVATE_KEY)
    );
};

// Функція для ініціалізації платежу через LiqPay
export const initiateLiqPayPayment = (amount, description) => {
    const paymentData = {
        public_key: LIQPAY_PUBLIC_KEY,
        version: '3',
        action: 'pay',
        amount: amount, // Сума оплати
        currency: 'UAH',
        description: description,
        order_id: `order_${Date.now()}`,  // Унікальний ідентифікатор замовлення
        sandbox: '1',  // Відправка в тестовий режим (sandbox)
    };

    const base64Data = toBase64(JSON.stringify(paymentData));
    const signature = createLiqPaySignature(base64Data);

    // Створення і відправка форми на LiqPay для платежу
    const form = document.createElement('form');
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    form.method = 'POST';
    form.target = '_blank';

    const dataInput = document.createElement('input');
    dataInput.type = 'hidden';
    dataInput.name = 'data';
    dataInput.value = base64Data;

    const signatureInput = document.createElement('input');
    signatureInput.type = 'hidden';
    signatureInput.name = 'signature';
    signatureInput.value = signature;

    form.appendChild(dataInput);
    form.appendChild(signatureInput);
    document.body.appendChild(form);
    form.submit();
    form.remove();
};
