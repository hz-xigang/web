import { notification } from  'antdv-next';

const TOAST_Z_INDEX = 100000;
const TOAST_STYLE_ID = 'toast-z-index-style';

function ensureToastZIndex() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(TOAST_STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = TOAST_STYLE_ID;
    style.textContent = `
.ant-notification {
  z-index: ${TOAST_Z_INDEX} !important;
}
.ant-notification-notice {
  z-index: ${TOAST_Z_INDEX} !important;
}
`;

    document.head.appendChild(style);
}

function error(description, message = '提示') {
    ensureToastZIndex();
    notification.error({
        message,
        description,
        duration: 2,
    })
}

function success(description, message = '提示') {
    ensureToastZIndex();
    notification.success({
        message,
        description,
        duration: 2,
    })
}

function actionSuccess() {
    success('操作成功')
}

let ToastUtil = {
    error,
    success,
    actionSuccess,
};

export default ToastUtil;