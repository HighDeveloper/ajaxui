(function () {
    "use strict";
    var Ajaxui = function () {

        var settings = {
            formClass: 'xhr-form',
            loaderClass: 'single-circle-spin',
            overlayLoadingColor: '#bfbdbb',
            enableNotifications: true,
            enableUpdates: true,
            enableActions: true
        };

        var actionCallbacks = {};

        this.settings = function(options){

            settings.formClass = options.formClass ? options.formClass : settings.formClass;
            settings.loaderClass = options.loaderClass ? options.loaderClass : settings.loaderClass;
            settings.overlayLoadingColor = options.overlayLoadingColor ? options.overlayLoadingColor : settings.overlayLoadingColor;
        };

        this.actionCallbacks = function(callbacks){

        };

        this.startService = function () {

            $('body').prepend('<div class="loading-overlay" style="background-color: '+settings.overlayLoadingColor+'"><div class="loader-wrap"><div class="loader-inner '+settings.loaderClass+'"></div></div></div>');

            return $('.'+settings.formClass).on('submit', function (event) {

                $('body').loading({
                    overlay: $(".loading-overlay")
                });

                $.ajax({
                    url: $(this).attr('action'),
                    type: $(this).attr('method'),
                    data: $(this).serialize(),

                    success: function (response) {
                        processResponse(response);
                    },
                    error: function (response) {
                        processResponse(response);
                    },
                    complete: function () {
                        $('body').loading('stop');
                    }
                });

                return false;
            });
        };
    };

    function processResponse(response) {

        var notifications = response.notifications;
        var updates = response.updates;
        var actions = response.actions;

        if (notifications !== undefined) {
            processNotifications(notifications);
        }
        if (updates !== undefined) {
            processUpdates(updates);
        }
        if (actions !== undefined) {
            processActions(actions);
        }
    }

    function processNotifications(notifications) {

        var duration = 5000;

        $.each(notifications, function (index, notification) {

            var type = notification.type;

            if (type === 'info') {
                type = 'default';
            }
            else if (type === 'success') {
                type = 'notice';
            }
            else if (type === 'danger') {
                type = 'error';
            }

            $.growl({
                style: type,
                fixed: notification.fixed,
                title: notification.title,
                message: notification.message,
                duration: duration
            });
        });
    }

    function processUpdates(updates) {

        $.each(updates, function (index, update) {

            var form_id = update.form_id;
            var fields = update.fields;

            $.each(fields, function (field, value) {

                if (form_id === 'none') {
                    $('#' + field + '').val(value);
                }
                else {
                    $('#' + form_id + '').find('[name="' + field + '"]').val(value);
                }
            });
        });
    }

    function processActions(actions) {

    }

    if (!window.Ajaxui) {
        window.Ajaxui = Ajaxui;
    }

})();