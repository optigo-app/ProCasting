import { CommonAPI } from "./CommonApi";


export const fetchTreeGridList = async (castuniqueno) => {
    let empData = JSON.parse(localStorage.getItem("getemp"))
    let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken

    try {
        const bodyparam = { deviceToken: deviceT };
        console.log('bodyparam: ', bodyparam);

        let ecodedbodyparam = btoa(JSON.stringify(bodyparam))
        let body = {
            "con": `{\"id\":\"\",\"mode\":\"TREELIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
            "p": `${ecodedbodyparam}`,
            "f": "formname (album)"
        }

        // const response = await axios.post(APIURL, body, { headers: header })
        const response = await CommonAPI(body);

        return response;
    } catch (error) {
        console.error("Error fetching cart details:", error);
        throw error;
    }
};




// import { CommonAPI } from "./CommonApi";

// export const fetchTreeGridList = async (castuniqueno) => {
//     let empData = JSON.parse(localStorage.getItem("getemp"));
//     let deviceT = JSON.parse(localStorage.getItem("initmfg"))?.deviceToken;

//     // Alert the values of empData and deviceT for debugging
//     alert("empData: " + JSON.stringify(empData));
//     alert("deviceToken: " + deviceT);

//     try {
//         const bodyparam = { deviceToken: deviceT };

//         // Alert before encoding the body param
//         alert("Before encoding bodyparam: " + JSON.stringify(bodyparam));
        
//         let ecodedbodyparam = btoa(JSON.stringify(bodyparam));

//         // Alert after encoding the body param
//         alert("Encoded bodyparam: " + ecodedbodyparam);

//         let body = {
//             "con": `{\"id\":\"\",\"mode\":\"TREELIST\",\"appuserid\":\"${empData?.empuserid}\"}`,
//             "p": `${ecodedbodyparam}`,
//             "f": "formname (album)"
//         };

//         // Alert the final body structure before sending the request
//         alert("Request Body: " + JSON.stringify(body));

//         // const response = await axios.post(APIURL, body, { headers: header })
//         const response = await CommonAPI(body);

//         // Alert response data
//         alert("Response: " + JSON.stringify(response));

//         return response;
//     } catch (error) {
//         // Alert the error if one occurs
//         alert("Error fetching cart details: " + error.message);
//         console.error("Error fetching cart details:", error);
//         throw error;
//     }
// };
