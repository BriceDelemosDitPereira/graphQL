export function showAlert(alertType, messageTitle, message) {
    const alertMainPage = document.getElementById('alert_main_page')
    alertMainPage.innerHTML = ''
    alertMainPage.innerHTML = `
    <div class="alert alert-${alertType} alert-dismissible fade show" role="alert" style="text-align:center;">
        <span><strong>${messageTitle}</strong>${message}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    setTimeout(() => {
        alertMainPage.innerHTML = ''
    }, 5000);
}

/* faille xss
The innerHTML property returns: The text content of the element, including all spacing and inner HTML tags.
The innerText property returns: Just the text content of the element and all its children, without CSS hidden text spacing and tags, except <script> and <style> elements.

innerHTML can be make xss attack because HTML tags are injected
but here it's for a error message so the user can't change the HTML 
*/