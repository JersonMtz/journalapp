import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
    toast: true,
    background: '#32373C',
    color: '#fff',
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const dialog = () => {
    return Swal.fire({
        title: 'Do you want delete this note?',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete note',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}