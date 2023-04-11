import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface"

const openNotification = (type: String, message: String, description: String, placement: NotificationPlacement) => {
   

    switch (type) {

        case "succes": notification.success({ message, description, placement: placement })
            break;
        case "info": notification.info({ message, description, placement: placement })
            break;
        case "warning": notification.warning({ message, description, placement: placement })
            break;
        case "error": notification.error({ message, description, placement: placement })
            break;

    }
}

export const successNotification = (message: String, description: String, placement: NotificationPlacement) => openNotification('succes', message, description, placement);
export const errorNotification = (message: String, description: String, placement: NotificationPlacement) => openNotification('error', message, description, placement);
export const infoNotification = (message: String, description: String, placement: NotificationPlacement) => openNotification('info', message, description, placement);
export const warningNotification = (message: String, description: String, placement: NotificationPlacement) => openNotification('warning', message, description, placement);