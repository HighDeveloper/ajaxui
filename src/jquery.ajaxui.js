(function () {

    "use strict";

    var Ajaxui = function (options) {

        var settings = {
            formClass: 'ajaxui-form',
            loaderClass: 'single-circle-spin',
            loaderColor: '#ffffff',
            overlayLoadingColor: 'rgba(191, 189, 187, 0.3)',
            enableNotifications: true,
            enableUpdates: true,
            enableActions: true,
            notificationDuration: 5000
        };

        var callbacks = {
            ajax: {
                success: undefined,
                error: undefined,
                complete: undefined
            },
            actions: undefined
        };

        if(options){
            if(options.settings){
                this.settings(options.settings);
            }

            if(options.callbacks){
                this.callbacks(options.callbacks);
            }
        }

        this.settings = function (options) {

            settings.formClass = options.formClass ? options.formClass : settings.formClass;
            settings.loaderClass = options.loaderClass ? options.loaderClass : settings.loaderClass;
            settings.loaderColor = options.loaderColor ? options.loaderColor : settings.loaderColor;
            settings.overlayLoadingColor = options.overlayLoadingColor ? options.overlayLoadingColor : settings.overlayLoadingColor;
            settings.notificationDuration = options.notificationDuration ? options.notificationDuration : settings.notificationDuration;
        };

        this.callbacks = function (options) {

            if(options.ajax){
                callbacks.ajax.success = options.ajax.success;
                callbacks.ajax.error = options.ajax.error;
                callbacks.ajax.complete = options.ajax.complete;
            }

            if(options.actions){
                callbacks.actions = options.actions;
            }
        };

        this.startService = function () {

            $('head').append('<style type="text/css">' +
            '.loading-overlay{background: ' + settings.overlayLoadingColor + ';} ' +
            '.' + settings.loaderClass + ' > div{background: ' + settings.loaderColor + ';}' +
            '</style>');

            $('body').prepend('<div class="loading-overlay"><div class="loader-wrap"><div class="loader-inner ' + settings.loaderClass + '"></div></div></div>');

            var loadersCss = new LoadersCSS();
            loadersCss.completeLoaderElements();

            $('.' + settings.formClass).on('submit', function (event) {

                $.ajax({
                    url: $(this).attr('action'),
                    type: $(this).attr('method'),
                    data: $(this).serialize(),

                    beforeSend: function (xhr, settings) {

                        $('body').loading({
                            overlay: $(".loading-overlay")
                        });
                    },
                    success: function (data, status, xhr) {

                        var notifications = data.notifications;
                        var updates = data.updates;
                        var actions = data.actions;

                        if (notifications !== undefined) {
                            processNotifications(notifications);
                        }
                        if (updates !== undefined) {
                            processUpdates(updates);
                        }
                        if (actions !== undefined) {
                            processActions(actions);
                        }

                        if (typeof callbacks.ajax.success === 'function') {
                            callbacks.ajax.success(data, status, xhr);
                        }
                    },
                    error: function (xhr, status, error) {

                        var notifications = {
                            type: 'danger',
                            fixed: true,
                            title: status,
                            message: error
                        };
                        processNotifications(new Array(notifications));

                        if (typeof callbacks.ajax.error === 'function') {
                            callbacks.ajax.error(xhr, status, error);
                        }
                    },
                    complete: function (xhr, status) {

                        if (typeof callbacks.ajax.complete === 'function') {
                            callbacks.ajax.complete(xhr, status);
                        }

                        $('body').loading('stop');
                    }
                });

                return false;
            });
        };

        function processNotifications(notifications) {

            $.each(notifications, function (index, notification) {

                if (notification.type === 'info') {
                    notification.type = 'default';
                }
                else if (notification.type === 'success') {
                    notification.type = 'notice';
                }
                else if (notification.type === 'danger') {
                    notification.type = 'error';
                }

                $.growl({
                    style: notification.type,
                    fixed: notification.fixed,
                    title: notification.title,
                    message: notification.message,
                    duration: settings.notificationDuration
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

            $.each(actions, function (index, name) {

                if (callbacks.actions) {

                    var action = callbacks.actions[name];

                    if(typeof action === 'function'){
                        action();
                    }
                }
            });
        }
    };

    if (!window.Ajaxui) {
        window.Ajaxui = Ajaxui;
    }

})();