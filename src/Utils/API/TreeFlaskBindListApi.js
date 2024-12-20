import { CommonAPI } from "./CommonApi";

export const fetchTreeFlaskBindList = async () => {
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
        console.log('deviceT: ', deviceT);

        let bodyparam = { deviceToken: `${deviceT}` };
        let ecodedbodyparam = btoa(JSON.stringify(bodyparam));
        
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"GETTREEFLASKBINDLIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        };

        const response = await CommonAPI(body);
        if (response?.Data.rd) {
            sessionStorage.setItem("TreeFlaskBindList", JSON.stringify(response?.Data.rd));
            return response;
        }
    } catch (error) {
        console.error("Error fetching Flask List:", error);
        throw error;
    }
};
