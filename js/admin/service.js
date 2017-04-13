app.service('DataServices', function ($http, $q, $state, $ionicLoading) {
    var context = function(callback) {
        try {
            var currentDB = alasql.databases["SSISDB"];
            if (!currentDB) {
                try {
                    try {alasql('DROP DATABASE SSISDB');}catch(e){}
                    alasql('CREATE DATABASE SSISDB;USE SSISDB;');
                    var sql = '';//http://localhost:8014/Tables/SQLScript
                    alasql(sql, function(res){
                        var xxx = window.localStorage.getItem("ssisapp-db");
                        if (xxx) {
                            var localDB = JSON.parse(xxx.substr(0, xxx.length));
                            alasql.use("SSISDB");
//http://localhost:8014/Tables/SQLScript
                            callback();
                        }
                        else {
                            callback();
                        }
                    });
                }
                catch (e) {}
            }
            else {
                if (alasql.useid != "SSISDB") {
                    if (!alasql.databases["SSISDB"]) {
                        alasql.databases["SSISDB"] = currentDB;
                    }
                    alasql.use("SSISDB");
                }
                callback();
            }
        } catch (e) { }
    }

    var token = '';
    var apiGET = function(url, callback){
        try {
            token = JSON.parse(window.localStorage.getItem('ssisapp-au')).token;
        } catch (e) { }
        $ionicLoading.show();
        if (window.global.CONNECT_MODE == 1) {
            $http({
                method: 'GET',
                url: window.global.apiServiceBaseUri + 'api/' + url,
                headers: {'Authorization': 'Bearer ' + token},
            }).then(function success(res) {
                callback(res.data);
                $ionicLoading.hide();
            }, function error(res) {
                $ionicLoading.hide();
                if (res.status == 401) $state.go('app.auth');
                else try { alert(res.data.Message); } catch(e) { alert(res.statusText); }
            });
        } else {
            var SSISDB = context(function() {
            try { 
                alasql(url, function(res){
                    callback(res);
                });
            }
            catch (e) {}
            });
        }
        $ionicLoading.hide();
    };
    var apiPOST = function(url, callback, data){
        try {
            token = JSON.parse(window.localStorage.getItem('ssisapp-au')).token;
        } catch (e) { }
        $ionicLoading.show();
        if (window.global.CONNECT_MODE == 1) {
            $http({
                method: 'POST',
                url: window.global.apiServiceBaseUri + 'api/' + url,
                headers: {'Authorization': 'Bearer ' + token},
                data: data
            }).then(function success(res) {
                callback(res.data);
                $ionicLoading.hide();
            }, function error(res) {
                $ionicLoading.hide();
                if (res.status == 401) $state.go('app.auth');
                else try { alert(res.data.Message); } catch(e) { alert(res.statusText); }
            });
        } else {
            var SSISDB = context(function() {
            try { 
                alasql(url, data, function(res) {
                    try
                    {
                        var localDB = JSON.stringify(alasql.databases);
                        var xxx = localDB.substr(0, localDB.length);
                        window.localStorage.setItem("ssisapp-db", xxx);
                    }
                    catch (e) {}
                    callback(res);
                });
            }
            catch (e) {}
            });
        }
        $ionicLoading.hide();
    };

    return {

    }
})