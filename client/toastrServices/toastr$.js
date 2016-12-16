/*
* $toastr service for toastr configuration
*/
angular.module('sampleApp')
    .factory("$toastr", [function() {
      toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "500",
            "hideDuration": "1500",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        return {
            warning:   toastr.warning,
            success:   toastr.success,
            info:   toastr.info,
            error:   toastr.error
        };
    }]);
