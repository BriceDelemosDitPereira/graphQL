import * as constant from './const.js';
import { show_user_info } from "./user_page.js"

export async function getData() {
    constant.param.body = JSON.stringify(constant.user_info)
    // No body in param but we can initialize a key outside an object
    // we initialize our command graphQL
    console.log('Body of param: ', constant.param.body)

    const response_user_info = await fetch(constant.apiGraphQLUrl, constant.param)
    console.log('fetch user_info response', response_user_info)

    const user_data = await response_user_info.json()
    console.log('Info completes user, ration audit: ', user_data)

    const loginSection = document.getElementById('log_section');
    if (loginSection) {
      loginSection.style.display = 'none'; // It's an one page application so if the login is good, don't show it anymore
    }
    show_user_info(user_data)
}