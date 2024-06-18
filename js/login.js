import * as constant from './const.js';
import {showAlert} from './alerts.js';
import { getData } from './get_data.js';

export function login_page() {
    const section = document.createElement('section')
    section.id = 'log_section'

    const form_container = document.createElement('div')
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    wrapper.id = "login_wrap"

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'btn'
    button.textContent = 'Login'
    // Add event listener to the login button
    button.addEventListener('click', login_connexion)

    // Add the wrapper to the body
    document.body.appendChild(section)
    section.appendChild(form_container)
    form_container.appendChild(wrapper)

    // Input box
    const inputBoxes = []
    const inputFields = [
         {type: 'text', placeholder: 'Username / Email', name: 'username', id: 'username'},
         {type: 'password', placeholder: 'Password', name: 'password', id: 'password'},
    ]

    inputFields.forEach((field) => {
        const inputBox = document.createElement('div')
        inputBox.className = 'input-box'

        const input = document.createElement('input')
        input.type = field.type
        input.placeholder = field.placeholder
        input.name = field.name
        input.id = field.id
        input.required = true
        input.classList.add(
            'form-control',
        )
        input.setAttribute('style', 'padding-left: 35px; margin-left:-25px')

        inputBox.classList.add(
            'col-6',
            'mb-4',
            'mx-auto',
        )
        inputBox.setAttribute('style', 'display:flex; align-items:center; width:auto; padding-left:15px;')

        /*Example SVG
        const iconSVG = document.createElement('svg');
        const svgPath = document.createElement('path')
        if (field.type === 'password') {
            iconSVG.className = 'size-6'
            iconSVG.setAttribute("xmlns","http://www.w3.org/2000/svg")
            iconSVG.setAttribute("width","16")
            iconSVG.setAttribute("height","16")
            iconSVG.setAttribute("fill","currentColor")
            iconSVG.setAttribute("viewBox","0 0 24 24")
            svgPath.setAttribute("fill-rule", "evenodd")
            svgPath.setAttribute("d","M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z")
            svgPath.setAttribute("clip-rule", "evenodd")
            iconSVG.appendChild(svgPath)
            // Tu a des icon la ?
        }*/
        const icon = document.createElement('i')
        //icon.className = `bx ${field.type === 'password'? 'bxs-lock-alt' : 'bxs-user'}`
        if (field.type === 'password') {
            icon.className = 'bx bxs-lock-alt'
            //icon.setAttribute("style", "position:absolute; top:59%; right:30%")
        } else {
            icon.className = 'bx bxs-user'
            //icon.setAttribute("style", "position:absolute; top:46.5%; right:30%")
        }
        // document.querySelector('.bxs-user').style.position = 'absolute'; it's possible but need 3 lines
        const spanIcon = document.createElement('span')
        icon.setAttribute('style', 'display:flex; position:sticky; z-index:1; color:#b1c1f2')

        // Import div, with bootstrap class, in inputBoxes
        spanIcon.appendChild(icon)
        inputBox.appendChild(spanIcon)
        inputBox.appendChild(input)
        inputBoxes.push(inputBox)
    })
    //console.log(inputBoxes)

    const cardHeader = document.createElement('div')
    cardHeader.classList.add('card-header')
    cardHeader.innerHTML = '<h3 style="padding-top: 0.5rem;">Login</h3>'
    cardHeader.setAttribute('style', 'text-align: center;')

    const cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    inputBoxes.forEach((inputBox) => cardBody.appendChild(inputBox)) // can be make in last foreach but need to go back up wrapper.appendChild(h1)
    cardBody.appendChild(button)

    // Assemble the page
    wrapper.appendChild(cardHeader)
    wrapper.appendChild(cardBody)

    // Bootstrap class
    section.classList.add('vh-100')

    form_container.classList.add(
        'row',
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'h-100'
    )

    wrapper.classList.add(
        'card',
        'col-md-4',
        'h-50',
        'text-center',
        'justify-content-center'
    )
    wrapper.setAttribute('style', 'padding-left:0px; padding-right:0px;')

    cardBody.setAttribute('style', 'margin-top: 3rem;')

    button.classList.add(
        'btn',
        'btn-primary',
        'text-center',
        'justify-content-center',
        'mx-auto'
    )
    button.setAttribute('style', 'margin-top: 1rem;background: #F8F8F8; border-color: #B1C1F2; color: black;')
    button.addEventListener('mouseover', function() {
        button.style.background = '#B1C1F2'
        button.style.color = 'white'
    })
    button.addEventListener('mouseout', function() { // without mouseout, hover never come back hidden
        button.style.background = '#F8F8F8'
        button.style.color = 'black'
    })
}

export function login_connexion() {
    const user_log_info_str= localStorage.getItem('user_login');
    if (user_log_info_str) {
        const user_log_info = JSON.parse(user_log_info_str);
        const username = user_log_info.username;
        const password = user_log_info.password;
        whoIsIt(username, password);
    } else {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        whoIsIt(username, password);
    }
}

function whoIsIt(username, password) {
    const user_log_info = {
        username: username,
        password: password
    }
    //console.log(user_log_info)
    const user_log_info_str = JSON.stringify(user_log_info)
    //console.log(user_log_info_str)
    
    const binaryToAscii = btoa(username + ':' + password)
    console.log('binarytoAscii: ', binaryToAscii)

    fetch(constant.ApiSignin, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + binaryToAscii
        }
    }).then(r => {
        //console.log("then after fetch")
        if (!r.ok) {
            console.log("Error, status : ", r.status) // 401 => user not found
            // 403 => forbidden, server understand but refuse (sometimes wrong password)
            if (r.status === 401) {
                showAlert('danger', '! User not found ', '- Please check your username / email or your password !')
            } else {
                showAlert('danger', 'Error', r.status)
            }
            localStorage.removeItem("user_login")
            throw new Error(`Error : ${r.status}`) // the throw statement throws a user-defined exception. Execution of the current function will stop.
        } else {
            localStorage.setItem('user_login', user_log_info_str)
            // We can't setItem an object, so we need our
            return r.json()

            /*
r is the response object from the fetch request, which contains the data sent by the server in response to the request.
r.json() is a method of the Response object that allows you to parse the response body (the content of the response) into JSON (JavaScript Object Notation).
It takes an optional options object as an argument, but in this case, it doesn't have one.
When called, r.json() returns a promise that resolves with the parsed JSON object. This promise is then handled in the second then block.

In other words, return r.json() says: "Wait for the response to be available, then parse the response body into JSON and return the result as a promise".
*/
        }
    }).then(data => {
        constant.content_type.Authorization = 'Bearer ' + data
        getData(constant.content_type)
        console.log('le 2eme .then fonctionne')
    }).catch(error => {
        console.error('Error in data recovery: ', error)
    })
}

/*
L'authentification Bearer est liée à la fonction btoa (binary to ascii) en JavaScript.

btoa est une fonction native de JavaScript qui convertit un string en une chaîne de caractères codée en base64.
Elle est utilisée pour encoder des informations sensibles, comme des clés d'accès ou des tokens d'accès, avant de les envoyer sur le réseau.

Lorsqu'un développeur utilise l'authentification Bearer,
il généralement génère un token d'accès unique pour chaque utilisateur et l'encode en base64 à l'aide de la fonction btoa.
Le résultat est un string de caractères alphanumériques qui peut être envoyé dans le header de la requête HTTP.


L'authentification Bearer (ou Bearer Token) est une méthode d'authentification pour les API qui utilise un token d'accès en tant que mécanisme de vérification de l'identité de l'utilisateur.

L'idée derrière : lorsque vous vous connectez à une API, vous recevez un token d'accès unique qui contient des informations d'identification sur vous.
Ce token est utilisé pour authentifier vos requêtes ultérieures à l'API, au lieu de vous demander à chaque fois de vous reconnecter avec vos informations d'identification (nom d'utilisateur et mot de passe).

Lorsqu'un client (par exemple, un navigateur web) envoie une requête à l'API, il inclut le token d'accès dans le header de la requête,
généralement dans le champ Authorization. L'API vérifie le token d'accès pour s'assurer que c'est effectivement le client autorisé à accéder à l'API.

Voici un exemple de header de requête qui inclut un token d'accès Bearer :
Authorization: Bearer <your_access_token>
*/