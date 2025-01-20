import { CommonAPI } from "./CommonApi";


export const QuanchingStart = async (castuniqueno, flashCode) => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    try {
        let bodyparam = {
            "castuniqueno": `${castuniqueno ?? ''}`,
            "flaskids": `${flashCode ?? ''}`,
            "empid": `${empData?.empid}`,
            "empuserid": `${empData?.empuserid}`,
            "empcode": `${empData?.empcode}`,
            "deviceToken": `${deviceT}`
        }

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"QUENCHINGSTART\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (QUENCHINGSTART)"
        }

        const response = await CommonAPI(body);

        return response;
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};
