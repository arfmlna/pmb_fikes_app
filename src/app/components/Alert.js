import Swal from 'sweetalert2'

export const Alert = (title, text, icon, confimBtnText) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confimBtnText
    })
}
