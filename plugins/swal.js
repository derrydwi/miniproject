export default function ({ app }, inject) {
  inject('showAlert', ({ text, icon, timer = 1500 }) => {
    app.$swal({
      toast: true,
      text,
      icon,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
    })
  })
}
