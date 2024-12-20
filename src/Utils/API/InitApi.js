export const INITMFGAPI = async (decodedString, navigation, toast, APIURL) => {
    if (decodedString) {
      const bodyparam = {
        "deviceID": "DeviceID_SMIT1",
        "deviceName": "DeviceID_SMIT1",
        "brand": "Brand1",
        "model": "Model1",
        "manufacturer": "manufacturer1",
        "appver": "125",
        "appvercode": "125",
        "device_type": "Phone",
        "onesignal_uid": "abc123_onesignal_uid"
      };
  
      const encodedBodyParam = btoa(JSON.stringify(bodyparam));
  
      const body = {
        "con": "{\"id\":\"\",\"mode\":\"INITMFG\",\"appuserid\":\"\"}",
        "p": encodedBodyParam,
        "f": "formname (album)"
      };
  
      const headers = {
        Authorization: `Bearer ${decodedString}`,
        Yearcode: "",
        Version: "V4",
        sp: "2",
        'Content-Type': 'application/json'
      };
  
      try {
        const response = await fetch(APIURL, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data) {
          sessionStorage.setItem("token", JSON.stringify(decodedString));
          localStorage.setItem("initmfg", JSON.stringify(data?.Data?.rd[0]));
          navigation("/homeone");
        }
      } catch (error) {
        console.error("initmfgErr", error);
        toast.error(`error: ${error.message}`);
      }
    }
  };
  