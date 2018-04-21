dataImport = function () {
    $.getJSON("Data/tonnage_paris.json", function (json) {
        tonnage_paris = json;
        $('#loading > div > div:nth-of-type(2)').css('height', '5.8em');
        $.getJSON("Data/paris.json", function (json) {
            paris = json;
            $('#loading > div > div:nth-of-type(2)').css('height', '5.6em');
            $.getJSON("Data/dansMaRue_paris.json", function (json) {
                dansMarue_paris = json;
                $('#loading > div > div:nth-of-type(2)').css('height', '5.4em');
                $.getJSON("Data/arr.geojson", function (json) {
                    arr_geo = json;
                    $('#loading > div > div:nth-of-type(2)').css('height', '5.2em');
                    $.getJSON("Data/tonnage_arr.json", function (json) {
                        tonnage_arr = json;
                        $('#loading > div > div:nth-of-type(2)').css('height', '5em');
                        $.getJSON("Data/tonnageIndex_arr.json", function (json) {
                            tonnageIndex_arr = json;
                            $('#loading > div > div:nth-of-type(2)').css('height', '4.8em');
                            $.getJSON("Data/scatter_arr.json", function (json) {
                                scatter_arr = json;
                                $('#loading > div > div:nth-of-type(2)').css('height', '4.6em');
                                $.getJSON("Data/tonnageHab_arr.json", function (json) {
                                    tonnageHab_arr = json;
                                    $('#loading > div > div:nth-of-type(2)').css('height', '4.4em');
                                    $.getJSON("Data/iris.geojson", function (json) {
                                        iris_geo = json;
                                        $('#loading > div > div:nth-of-type(2)').css('height', '4.2em');
                                        $.getJSON("Data/triMobile.geojson", function (json) {
                                            triMobile_geo = json;
                                            $('#loading > div > div:nth-of-type(2)').css('height', '4em');
                                            $.getJSON("Data/mobilier_75101.geojson", function (json) {
                                                mobilier_75101_geo = json;
                                                $('#loading > div > div:nth-of-type(2)').css('height', '3.8em');
                                                $.getJSON("Data/mobilier_75102.geojson", function (json) {
                                                    mobilier_75102_geo = json;
                                                    $('#loading > div > div:nth-of-type(2)').css('height', '3.6em');
                                                    $.getJSON("Data/mobilier_75103.geojson", function (json) {
                                                        mobilier_75103_geo = json;
                                                        $('#loading > div > div:nth-of-type(2)').css('height', '3.4em');
                                                        $.getJSON("Data/mobilier_75104.geojson", function (json) {
                                                            mobilier_75104_geo = json;
                                                            $('#loading > div > div:nth-of-type(2)').css('height', '3.2em');
                                                            $.getJSON("Data/mobilier_75105.geojson", function (json) {
                                                                mobilier_75105_geo = json;
                                                                $('#loading > div > div:nth-of-type(2)').css('height', '3em');
                                                                $.getJSON("Data/mobilier_75106.geojson", function (json) {
                                                                    mobilier_75106_geo = json;
                                                                    $('#loading > div > div:nth-of-type(2)').css('height', '2.8em');
                                                                    $.getJSON("Data/mobilier_75107.geojson", function (json) {
                                                                        mobilier_75107_geo = json;
                                                                        $('#loading > div > div:nth-of-type(2)').css('height', '2.6em');
                                                                        $.getJSON("Data/mobilier_75108.geojson", function (json) {
                                                                            mobilier_75108_geo = json;
                                                                            $('#loading > div > div:nth-of-type(2)').css('height', '2.4em');
                                                                            $.getJSON("Data/mobilier_75109.geojson", function (json) {
                                                                                mobilier_75109_geo = json;
                                                                                $('#loading > div > div:nth-of-type(2)').css('height', '2.2em');
                                                                                $.getJSON("Data/mobilier_75110.geojson", function (json) {
                                                                                    mobilier_75110_geo = json;
                                                                                    $('#loading > div > div:nth-of-type(2)').css('height', '2em');
                                                                                    $.getJSON("Data/mobilier_75111.geojson", function (json) {
                                                                                        mobilier_75111_geo = json;
                                                                                        $('#loading > div > div:nth-of-type(2)').css('height', '1.8em');
                                                                                        $.getJSON("Data/mobilier_75112.geojson", function (json) {
                                                                                            mobilier_75112_geo = json;
                                                                                            $('#loading > div > div:nth-of-type(2)').css('height', '1.6em');
                                                                                            $.getJSON("Data/mobilier_75113.geojson", function (json) {
                                                                                                mobilier_75113_geo = json;
                                                                                                $('#loading > div > div:nth-of-type(2)').css('height', '1.4em');
                                                                                                $.getJSON("Data/mobilier_75114.geojson", function (json) {
                                                                                                    mobilier_75114_geo = json;
                                                                                                    $('#loading > div > div:nth-of-type(2)').css('height', '1.2em');
                                                                                                    $.getJSON("Data/mobilier_75115.geojson", function (json) {
                                                                                                        mobilier_75115_geo = json;
                                                                                                        $('#loading > div > div:nth-of-type(2)').css('height', '1em');
                                                                                                        $.getJSON("Data/mobilier_75116.geojson", function (json) {
                                                                                                            mobilier_75116_geo = json;
                                                                                                            $('#loading > div > div:nth-of-type(2)').css('height', '0.8em');
                                                                                                            $.getJSON("Data/mobilier_75117.geojson", function (json) {
                                                                                                                mobilier_75117_geo = json;
                                                                                                                $('#loading > div > div:nth-of-type(2)').css('height', '0.6em');
                                                                                                                $.getJSON("Data/mobilier_75118.geojson", function (json) {
                                                                                                                    mobilier_75118_geo = json;
                                                                                                                    $('#loading > div > div:nth-of-type(2)').css('height', '0.4em');
                                                                                                                    $.getJSON("Data/mobilier_75119.geojson", function (json) {
                                                                                                                        mobilier_75119_geo = json;
                                                                                                                        $('#loading > div > div:nth-of-type(2)').css('height', '0.2em');
                                                                                                                        $.getJSON("Data/mobilier_75120.geojson", function (json) {
                                                                                                                            mobilier_75120_geo = json;
                                                                                                                            $('#loading > div > div:nth-of-type(2)').css('height', '0.1em');
                                                                                                                            $.getJSON("Data/paris.geojson", function (json) {
                                                                                                                                paris_geo = json;
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
    });
};