dataImport = function () {
    $.getJSON("Data/tonnage_paris.json", function (json) {
        tonnage_paris = json;
        $.getJSON("Data/paris.json", function (json) {
            paris = json;
            $.getJSON("Data/dansMaRue_paris_type.json", function (json) {
                dansMaRue_paris_type = json;
                $('#loading > div > div:nth-of-type(2)').css('height', '5.5em');
                $.getJSON("Data/arr.geojson", function (json) {
                    arr_geo = json;
                    $('#loading > div > div:nth-of-type(2)').css('height', '4.5em');
                    $.getJSON("Data/tonnage_arr.json", function (json) {
                        tonnage_arr = json;
                        $.getJSON("Data/tonnageIndex_arr.json", function (json) {
                            tonnageIndex_arr = json;
                            $('#loading > div > div:nth-of-type(2)').css('height', '4em');
                            $.getJSON("Data/scatter_arr.json", function (json) {
                                scatter_arr = json;
                                $.getJSON("Data/tonnageHab_arr.json", function (json) {
                                    tonnageHab_arr = json;
                                    $('#loading > div > div:nth-of-type(2)').css('height', '3.5em');
                                    $.getJSON("Data/iris.geojson", function (json) {
                                        iris_geo = json;
                                        $('#loading > div > div:nth-of-type(2)').css('height', '2.5em');
                                        $.getJSON("Data/triMobile.geojson", function (json) {
                                            triMobile_geo = json;
                                            $('#loading > div > div:nth-of-type(2)').css('height', '1.5em');
                                            $.getJSON("Data/mobilier_75101.geojson", function (json) {
                                                mobilier_75101_geo = json;
                                                $.getJSON("Data/mobilier_75102.geojson", function (json) {
                                                    mobilier_75102_geo = json;
                                                    $.getJSON("Data/mobilier_75103.geojson", function (json) {
                                                        mobilier_75103_geo = json;
                                                        $.getJSON("Data/mobilier_75104.geojson", function (json) {
                                                            mobilier_75104_geo = json;
                                                            $.getJSON("Data/mobilier_75105.geojson", function (json) {
                                                                mobilier_75105_geo = json;
                                                                $.getJSON("Data/mobilier_75106.geojson", function (json) {
                                                                    mobilier_75106_geo = json;
                                                                    $.getJSON("Data/mobilier_75107.geojson", function (json) {
                                                                        mobilier_75107_geo = json;
                                                                        $.getJSON("Data/mobilier_75108.geojson", function (json) {
                                                                            mobilier_75108_geo = json;
                                                                            $.getJSON("Data/mobilier_75109.geojson", function (json) {
                                                                                mobilier_75109_geo = json;
                                                                                $.getJSON("Data/mobilier_75110.geojson", function (json) {
                                                                                    mobilier_75110_geo = json;
                                                                                    $.getJSON("Data/mobilier_75111.geojson", function (json) {
                                                                                        mobilier_75111_geo = json;
                                                                                        $.getJSON("Data/mobilier_75112.geojson", function (json) {
                                                                                            mobilier_75112_geo = json;
                                                                                            $.getJSON("Data/mobilier_75113.geojson", function (json) {
                                                                                                mobilier_75113_geo = json;
                                                                                                $.getJSON("Data/mobilier_75114.geojson", function (json) {
                                                                                                    mobilier_75114_geo = json;
                                                                                                    $.getJSON("Data/mobilier_75115.geojson", function (json) {
                                                                                                        mobilier_75115_geo = json;
                                                                                                        $.getJSON("Data/mobilier_75116.geojson", function (json) {
                                                                                                            mobilier_75116_geo = json;
                                                                                                            $.getJSON("Data/mobilier_75117.geojson", function (json) {
                                                                                                                mobilier_75117_geo = json;
                                                                                                                $.getJSON("Data/mobilier_75118.geojson", function (json) {
                                                                                                                    mobilier_75118_geo = json;
                                                                                                                    $.getJSON("Data/mobilier_75119.geojson", function (json) {
                                                                                                                        mobilier_75119_geo = json;
                                                                                                                        $.getJSON("Data/mobilier_75120.geojson", function (json) {
                                                                                                                            mobilier_75120_geo = json;
                                                                                                                            $('#loading > div > div:nth-of-type(2)').css('height', '0em');
                                                                                                                            $('body').load('index_body.html');
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
};