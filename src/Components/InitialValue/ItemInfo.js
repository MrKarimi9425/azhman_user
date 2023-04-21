export class ItemInfo {

    //نوع دوره
    type(type) {
        switch (type) {
            case "sportsLive":
                return "ورزشی پخش زنده";
                break;
            case "sportsClub":
                return "ورزش در باشگاه";
                break;
            case "sportsPackage":
                return "ورزش در باشگاه";
                break;
            case "sportsProgram":
                return "ارائه برنامه ورزشی";
                break;
            case "sportsPrivate":
                return "مربی خصوصی";
                break;
            case "analysisPhysical":
                return "تحلیل بدنی";
                break;
            case "nutrition":
                return "تغذیه";
                break;
            case "process":
                return "روند پیشرفت";
                break;
            case "consultingLive":
                return "دوره مشاوره پخش زنده";
                break;
            case "consultingPackage":
                return "ارائه پکیج مشاوره";
                break;
            case "consultingPrivate":
                return "مشاوره خصوصی";
                break;
            case "psychiatryLive":
                return "دوره روانپزشکی پخش زنده";
                break;
            case "psychiatryPackage":
                return "ارائه پکیج روانپزشکی";
                break;
            case "psychiatryPrivate":
                return "روانپزشکی خصوصی";
                break;
            case "psychologyLive":
                return "دوره روانشناسی پخش زنده";
                break;
            case "psychologyPackage":
                return "ارائه پکیج روانشناسی";
                break;
            case "psychologyPrivate":
                return "روانشناسی خصوصی";
                break;
            case "follow":
                return "پیگیری";
                break;
            case "other":
                return "سایر";
                break;
            default:
                break;
        }
    }

    // نوع دسترسی
    typeFilling(typeFilling) {
        switch (typeFilling) {
            case "together":
                return "یکجا پر شود";
                break;
            case "daily":
                return "روزانه";
                break;
            case "page":
                return "صفحه به صفحه";
                break;
            case "fewDay":
                return "هر چند روز یکبار";
                break;
            default:
                break;
        }
    }

    //آنلاین یا آفلاین
    requirement(requirement) {
        switch (requirement) {
            case "requirement":
                return "بله"
                break;
            case "unnecessary":
                return "خیر"
                break;
            default:
                break;
        }
    }

    // فعال سازی
    active(active) {
        switch (active) {
            case "active":
                return "فعال"
                break;
            case "inActive":
                return "غیرفعال"
                break;
            default:
                break;
        }
    }

}