import { CommonAPI } from "./CommonApi";


export const fetchFlaskList = async () => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    try {
        let bodyparam = { deviceToken: `${deviceT}` };

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"GETFLASKLIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        }

        const response = await CommonAPI(body);
        sessionStorage.setItem("flasklist", JSON.stringify(response?.Data.rd));
        return response;
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};
