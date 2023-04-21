export class CourseItem {

    //نوع 
    type(type) {
        switch (type) {
            case "consulting":
                return "مشاوره";
                break;
            case "nutrition":
                return "تغذیه";
                break;
            case "sports":
                return "ورزشی";
                break;
            default:
                break;
        }
    }

    // نوع دسترسی
    typeAccess(typeAccess) {
        switch (typeAccess) {
            case "private":
                return "خصوصی";
                break;
            case "public":
                return "عمومی";
                break;
            default:
                break;
        }
    }

    //آنلاین یا آفلاین
    isOnline(isOnline) {
        switch (isOnline) {
            case "file":
                return "فایل"
                break;
            case "live":
                return "پخش زنده"
                break;
            default:
                break;
        }
    }

    // فعال سازی
    active(active) {
        switch (active) {
            case "1":
                return "فعال"
                break;
            case "2":
                return "غیرفعال"
                break;
            default:
                break;
        }
    }

    //نوع دوره
    typeCourse(typeCourse) {
        switch (typeCourse) {
            case "presence":
                return "حضوری"
                break;
            case "virtual":
                return "مجازی"
                break;
            default:
                break;
        }
    }
}