import {login_connexion, login_page} from "./login.js";

const user_log_info_str = localStorage.getItem("user_login"); // get our localStorage
const userData = localStorage.getItem('user_login');
//console.log("user_log_info : ", user_log_info_str)

if (user_log_info_str) {
    login_connexion()
} else {
    login_page()
}