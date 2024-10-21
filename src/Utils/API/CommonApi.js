import axios from "axios";

// const APIURL=`http://zen/api/store.aspx`;
const APIURL=`https://api.optigoapps.com/test/store.aspx`;

export const CommonAPI = async (body) => {

    let Token = JSON.parse(sessionStorage.getItem("token"))
    try{
        const header = {
            // Authorization: `Bearer 9065471700535651`,
            Authorization: `Bearer ${Token}`,
            Yearcode: "",
            Version: "V4",
            sp: "2",
        };

        const response = await axios.post(APIURL, body, { headers: header });

        return response?.data;
    } catch (error) {
        console.error('error is..', error);
    }
}
