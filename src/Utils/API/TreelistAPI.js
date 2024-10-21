import { CommonAPI } from "./CommonApi";


export const fetchTreeGridList = async (castuniqueno) => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    try {
        const bodyparam = { deviceToken: deviceT };

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"TREELIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
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
