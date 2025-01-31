import { CommonAPI } from "./CommonApi";

export const fetchFlaskList = async () => {
    let empData = JSON.parse(localStorage.getItem("getemp"));

    const getDeviceToken = () => {
        return new Promise((resolve, reject) => {
            let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;
            if (deviceT) {
                resolve(deviceT);
            } else {
                reject("Device Token not found");
            }
        });
    };

    try {
        const deviceT = await getDeviceToken();

        let bodyparam = { deviceToken: `${deviceT}` };
        let ecodedbodyparam = btoa(JSON.stringify(bodyparam));
        
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"GETFLASKLIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        };

        const response = await CommonAPI(body);
        if (response?.Data.rd) {
            sessionStorage.setItem("flasklist", JSON.stringify(response?.Data.rd));
        }
        return response;
    } catch (error) {
        console.error("Error fetching Flask List:", error);
        throw error;
    }
};
