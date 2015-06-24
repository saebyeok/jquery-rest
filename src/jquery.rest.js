/**
 * Rest API for jQuery
 * @author Saebyeok Lee
 */
'use strict';
(function($){


    $.rest = {
        _url : '',
        _success : function(data, status, jqXHR){
            // debug
            console.error('Please add success function into your rest parameter!', data);
        },
        _error : function(jqXHR, status) {
            // debug
            console.log('Error', jqXHR);
        },
        url : function(url){
            this._url = url;
            return this;
        },
        get : function(opt){

            opt.param = opt.param || {};
            opt.success = opt.success || this._success;
            opt.error = opt.error|| this._error;

            if(this._url == ''){
                console.error('Url is undefined');
                return;
            }
            $.get(this._url + '?' + $.param(opt.param))
                .success(opt.success).error(opt.error);
            return this;
        },
        post : function(opt){
            return this.http(opt, 'post');
        },
        patch : function(opt){
            return this.http(opt, 'patch');
        },
        put : function(opt){
            return this.http(opt, 'put');
        },
        remove : function(opt){
            opt.param = opt.param || (opt.data || {});
            $.ajax({
                type: 'DELETE',
                url: this._url,
                data: JSON.stringify(opt.param),
                contentType : 'application/json; charset=UTF-8',
                success : opt.success,
                error : opt.error
            })
            return this;
        },
        http : function(opt, method){
            opt.param = opt.param || (opt.data || {});
            opt.success = opt.success || this._success;
            opt.error = opt.error|| this._error;

            if(this._url == ''){
                console.error('Url is undefined');
                return;
            }

            $.ajax({
                type : method,
                url: this._url,
                contentType : 'application/json; charset=UTF-8',
                data: JSON.stringify(opt.param),
                success : opt.success,
                error : opt.error
            });

            return this;
        },
        success : function(fn){
            if(typeof fn == 'function'){
                this._success = fn;
            }else{
                console.error('success callback is not a function');
            }
            return this;
        },
        error : function(fn){
            if(typeof fn == 'function'){
                this._error = fn;
            }else{
                console.error('error callback is not a function');
            }
            return this;
        }
    }

})(jQuery);