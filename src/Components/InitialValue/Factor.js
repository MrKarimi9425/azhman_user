export class Factor {

    //وضعیت فاکتور
    status(status) {
        switch (status) {
            case "factorIssued":
                return {
                    status: "صدور فاکتور",
                    color: '#198754'
                }
                break;
            case "factorPaid":
                return {
                    status: "پرداخت فاکتور",
                    color: '#198754'
                }
                break;
            case "paymentOfflinePaid":
                return {
                    status: "فاکتور تایید شده",
                    color: '#198754'
                }
                break;
            case "paymentOfflineRejected":
                return {
                    status: "رد فاکتور",
                    color: '#DC3545'
                }
                break;
            case "paymentOnlineRejected":
                return {
                    status: "رد فاکتور",
                    color: '#DC3545'
                }
                break;
            case "paymentOffline":
                return {
                    status: "در انتظار تایید",
                    color: '#FFD200'
                }
                break;
            default:
                break;
        }
    }

}