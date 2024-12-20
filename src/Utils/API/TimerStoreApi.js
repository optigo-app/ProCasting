import { CommonAPI } from "./CommonApi";


export const setTimerDetails = async (investmentId, investmentDate) => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    try {
        let bodyparam = {
            "investmentid": `${investmentId ?? ''}`,
            "invstartdate": `${investmentDate ?? ''}`,
            "empid": `${empData?.empid ?? ''}`,
            "empuserid": `${empData?.empuserid ?? ''}`,
            "empcode": `${empData?.empcode ?? ''}`,
            "deviceToken": `${deviceT ?? ''}`
        }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"INVESTMENTSCHEDULE\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        }

        const response = await CommonAPI(body);

        return response;
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};
