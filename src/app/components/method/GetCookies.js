import Cookies from "js-cookie";

const data = Cookies.get("user")
const parseData = data ? JSON.parse(data) : null;

export default parseData
