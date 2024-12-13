import { CommonAPI } from "./CommonApi";


export const fetchMaster = async () => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    try {
        let bodyparam = { deviceToken: `${deviceT}` };

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"MASTERS\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (MASTERS)"
        }

        const response = await CommonAPI(body);
        sessionStorage.setItem("gridMaster", JSON.stringify(response));
        return response;    
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};
