app.service('DataServices', function ($http, $q, $state, $ionicLoading) {
    var context = function(callback) {
        try {
            var currentDB = alasql.databases["SSISDB"];
            if (!currentDB) {
                try {
                    try {alasql('DROP DATABASE SSISDB');}catch(e){}
                    alasql('CREATE DATABASE SSISDB;USE SSISDB;');
                    var sql = 'CREATE TABLE QLSPChannel_Tb( QLSPChannel_id INT AUTO_INCREMENT, QLSPChannel_title nvarchar(500) NULL, QLSPChannel_created datetime2(0) NULL, QLSPThanhVien_id int NOT NULL); CREATE TABLE QLSPInvoice_Tb( QLSPInvoice_id INT AUTO_INCREMENT, QLSPChannel_id int NOT NULL, QLSPKhachHang_title nvarchar(500) NULL, QLSPKhachHang_mobile varchar(50) NULL, QLSPInvoice_created datetime2(0) NULL, QLSPInvoice_total int NULL); CREATE TABLE QLSPKhachHang_Tb( QLSPKhachHang_id INT AUTO_INCREMENT, QLSPKhachHang_title nvarchar(500) NULL, QLSPKhachHang_code varchar(50) NULL, QLSPKhachHang_email varchar(150) NULL, QLSPKhachHang_mobile varchar(50) NULL, QLSPThanhVien_id int NOT NULL); CREATE TABLE QLSPOrder_Tb( QLSPOrder_id INT AUTO_INCREMENT, QLSPInvoice_id int NULL, QLSPSanPham_code varchar(50) NULL, QLSPSanPham_title nvarchar(500) NULL, QLSPOrder_created datetime2(0) NULL, QLSPOrder_count int NULL, QLSPOrder_total int NULL); CREATE TABLE QLSPSanPham_Tb( QLSPSanPham_id INT AUTO_INCREMENT, QLSPSanPham_title nvarchar(500) NULL, QLSPSanPham_cover varchar(500) NULL, QLSPSanPham_code varchar(50) NULL, QLSPSanPham_price1 int NULL, QLSPSanPham_price2 int NULL, QLSPSanPham_note nvarchar(500) NULL, QLSPThanhVien_id int NOT NULL); CREATE TABLE QLSPThanhVien_Tb( QLSPThanhVien_id int NOT NULL, QLSPChannel_id int NOT NULL, Title nvarchar(1000) NULL, GhiChu nvarchar(1000) NULL, IsOwner smallint NOT NULL)';
                    alasql(sql, function(res){
                        var xxx = window.localStorage.getItem("ssisapp-db");
                        if (xxx) {
                            var localDB = JSON.parse(xxx.substr(0, xxx.length));
                            alasql.use("SSISDB");
                            alasql.tables.QLSPChannel_Tb.data = localDB.SSISDB.tables.QLSPChannel_Tb.data;
                            alasql.tables.QLSPInvoice_Tb.data = localDB.SSISDB.tables.QLSPInvoice_Tb.data;
                            alasql.tables.QLSPOrder_Tb.data = localDB.SSISDB.tables.QLSPOrder_Tb.data;
                            alasql.tables.QLSPKhachHang_Tb.data = localDB.SSISDB.tables.QLSPKhachHang_Tb.data;
                            alasql.tables.QLSPSanPham_Tb.data = localDB.SSISDB.tables.QLSPSanPham_Tb.data;
                            alasql.tables.QLSPThanhVien_Tb.data = localDB.SSISDB.tables.QLSPThanhVien_Tb.data;
                            alasql.databases["SSISDB"].tables["QLSPChannel_Tb"].identities = localDB.SSISDB.tables.QLSPChannel_Tb.identities;
                            alasql.databases["SSISDB"].tables["QLSPInvoice_Tb"].identities = localDB.SSISDB.tables.QLSPInvoice_Tb.identities;
                            alasql.databases["SSISDB"].tables["QLSPOrder_Tb"].identities = localDB.SSISDB.tables.QLSPOrder_Tb.identities;
                            alasql.databases["SSISDB"].tables["QLSPKhachHang_Tb"].identities = localDB.SSISDB.tables.QLSPKhachHang_Tb.identities;
                            alasql.databases["SSISDB"].tables["QLSPSanPham_Tb"].identities = localDB.SSISDB.tables.QLSPSanPham_Tb.identities;
                            alasql.databases["SSISDB"].tables["QLSPThanhVien_Tb"].identities = localDB.SSISDB.tables.QLSPThanhVien_Tb.identities;
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
        if (window.global.CONNECT_MODE == 0) {
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