import axios from 'axios'

const CWBURL = 'https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/'
const CWBAuthorization = 'CWB-E990FC05-D262-47A9-A5A3-DB445283884D'

export async function CWBHttpRequest(httpMethod, dataCategory, dataType, errorMessage) {
    switch (httpMethod.toLowerCase()) {
        case 'get':
            return await axios.get(`${CWBURL}${dataCategory}?Authorization=${CWBAuthorization}&format=${dataType}`)
                .catch((error) => {
                    return { error, errorMessage }
                })
    }
}

// Winnie 給的，尚未用上
export const revisedHttpRequest = async (
    RequestMethod,
    Data,
    type,
) => {
    let result = null;
    if (type === "get") {
        result = await axios
            .get(RequestMethod)
            .catch((error) => {
                alert(
                    error.response ?.data ?.error ?.message || "登入失敗 ! 請檢查帳號密碼"
                        ? "登入失敗 ! 請檢查帳號密碼"
                        : "伺服器異常"
          );
            });
    } else if (type === "post") {
        result = await axios
            .post(RequestMethod, Data)
            .catch((error) => {
                alert(
                    error.response ?.data ?.error ?.message || "登入失敗 ! 請檢查帳號密碼"
                        ? "登入失敗 ! 請檢查帳號密碼"
                        : "伺服器異常"
          );
            });
    } else if (type === "delete") {
        result = await axios({
            method: "delete",
            url: RequestMethod,
            data: Data,
        }).catch((error) => {
            alert(error.response ?.data ?.error ?.message || "伺服器異常");
        });
    } else if (type === "put") {
        result = await axios
            .put(RequestMethod, Data)
            .catch((error) => {
                alert(error.response ?.data ?.error ?.message || "伺服器異常");
            });
    }
    return result;
};