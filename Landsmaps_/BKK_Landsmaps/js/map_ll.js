var wms_service_url = 'http://122.155.1.146:8998/geoserver/cite/wms?';
var min_z = 4;
var max_z = 23;
var max_zn = 19;
var openstreetmap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    minZoom: 4,
    maxZoom: 19,
    //iconURL: 'images/map_thumbnail/m01.PNG',
    label: 'Open Street Map',
    attribution: '',
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    //    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
    //,pane:'basemap_pane'
});
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 4,
    maxZoom: 19,
    //iconURL: 'images/map_thumbnail/m02.PNG',
    label: 'World Street Map',
    attribution: '',
    //pane: 'basemap_pane'
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 4,
    maxZoom: 19,
    label: 'World Imagery',
    attribution: '',
    //pane: 'basemap_pane'
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var ESRI_StreetMap_World_2D = L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/ESRI_StreetMap_World_2D/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 4,
    maxZoom: 19,
    label: 'StreetMap World',
    attribution: '',
    //pane: 'basemap_pane'
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
var World_Topo_Map = L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    minZoom: 4,
    maxZoom: 19,
    label: 'World Topo',
    attribution: '',
    //pane: 'basemap_pane'
    //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


var Google_Roads = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    minZoom: 4,
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    label: 'Google Map',
    attribution: '',
    //pane: 'basemap_pane'
});

var Google_Satellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    minZoom: 4,
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    label: 'Google Satellite',
    attribution: '',
    //pane: 'basemap_pane'
});


var Google_Hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    minZoom: 4,
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    label: 'Google Hybrid',
    attribution: '',
    //pane: 'basemap_pane'
});

var getdata = true;

var map = L.map('mapmain', {
    center: [12, 100.5],
    zoom: 6,
    maxZoom: 20,
    zoomDelta: 0.25,
    zoomSnap: 0.25,
    zoomControl: false,
    //layers: [Esri_WorldStreetMap]
});
//map.createPane("basemap_pane").style.zIndex = 50;
//map.createPane("bingmap_pane").style.zIndex = 100;

document.getElementById('mapmain').style.cursor = 'default';
var zoom_bar;
var zoom_bar = new L.Control.ZoomBar({ position: 'topleft' }).addTo(map);

Esri_WorldStreetMap.setZIndex(0);
Esri_WorldImagery.setZIndex(0);
openstreetmap.setZIndex(0);
World_Topo_Map.setZIndex(0);
Google_Roads.setZIndex(0);
Google_Satellite.setZIndex(0);
Google_Hybrid.setZIndex(0);

//var basemaps = [Esri_WorldStreetMap, Esri_WorldImagery, openstreetmap, World_Topo_Map, Google_Roads, Google_Satellite, Google_Hybrid];
var basemaps = [Google_Roads, Google_Hybrid];
//BASEMAP----------------------------------------------------------------------
var basemap_ctrl = L.control.basemaps({
    basemaps: basemaps,
    tileX: 6382,  // tile X coordinate 12 199 398 797 1594 3191
    tileY: 3776,  // tile Y coordinate 7 118 236 472  943 1888
    tileZ: 13  // tile zoom level 4 8 9 10 11 12
});
basemap_ctrl.addTo(map);
setParent(basemap_ctrl.getContainer(), document.getElementById('basemap_ctrl'));

//var customControl = L.Control.extend({

//    options: {
//        position: 'topleft'
//    },

//    onAdd: function (map) {
//        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

//        container.style.backgroundColor = 'white';
//        container.style.backgroundImage = "url(https://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
//        container.style.backgroundSize = "30px 30px";
//        container.style.width = '30px';
//        container.style.height = '30px';

//        container.onclick = function () {
//            console.log('buttonClicked');
//        }

//        return container;
//    }
//});
//map.addControl(new customControl());



//console.log('basemaps', basemaps); 
//console.log('tilePane', map.getPane('tilePane')); 
//var bing_basemap = {
//    'Bing_Aerial_L': Bing_Aerial_L, 'Bing_Road': Bing_Road};
//L.control.layers(bing_basemap).addTo(map);

//Bing_Aerial_L.addTo(map);

//$.getJSON(pkk_ADMIN_A_url, function (json) {
//    pkk_ADMIN_A_geojson = json;
//    pkk_ADMIN_A = L.geoJSON(pkk_ADMIN_A_geojson, {
//        style: hydro_style
//    });
//    console.log("pkk_ADMIN_A_geojson", pkk_ADMIN_A_geojson);
//});
//var pkk_ADMIN_A_url = 'geojson/pakkret_area.geojson';
//var pkk_ADMIN_A_geojson = [];
//var pkk_ADMIN_A;
//var pkk_HYDRO_A_url = 'geojson/HYDRO_A.geojson';
//var pkk_ROADCL_L_url = 'geojson/ROADCL_L.geojson';
//var pkk_BLDG_PKK_url = 'geojson/BLDG_PKK.geojson';
//var pkk_BUS_SHELTER_url = 'geojson/BUS_SHELTER.geojson';



//var pkk_HYDRO_A_geojson = [];
//var pkk_ROADCL_L_geojson = [];
//var pkk_BLDG_PKK_geojson = [];
//var pkk_BUS_SHELTER_geojson = [];


//var pkk_HYDRO_A;
//var pkk_ROADCL_L;
//var pkk_BLDG_PKK;
//var pkk_BUS_SHELTER;



//var area_style = {
//    fillColor: "#a2b4be",//
//    color: "#FFFFFF",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};
//var hydro_style = {
//    fillColor: "#007bff",
//    color: "#618295",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};
//var road_style = {
//    color: "#618295",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};
//var bldg_style = {
//    fillColor: "#007bff",
//    color: "#618295",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};
//var bus_style = {
//    radius: 4,
//    fillColor: "#ff7800",
//    color: "#000",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};
//var tran_style = {
//    radius: 4,
//    fillColor: "#ff7800",
//    color: "#000",
//    weight: 1,
//    opacity: 1,
//    fillOpacity: 0.8
//};

//$.getJSON(pkk_ADMIN_A_url, function (json) {
//    pkk_ADMIN_A_geojson = json;
//    pkk_ADMIN_A = L.geoJSON(pkk_ADMIN_A_geojson, {
//        style: hydro_style
//    });
//    console.log("pkk_ADMIN_A_geojson", pkk_ADMIN_A_geojson);
//});
//$.getJSON(pkk_HYDRO_A_url, function (json) {
//    pkk_HYDRO_A_geojson = json;
//    pkk_HYDRO_A = L.geoJSON(pkk_HYDRO_A_geojson, {
//        style: hydro_style
//    });
//});
//$.getJSON(pkk_ROADCL_L_url, function (json) {
//    pkk_ROADCL_L_geojson = json;
//    //pkk_ROADCL_L = L.geoJSON(pkk_ROADCL_L_geojson, {
//    //    style: road_style
//    //});
//    console.log(pkk_ROADCL_L_geojson);
//    lyr_grid_init(pkk_ROADCL_L_geojson);
//});
//$.getJSON(pkk_BLDG_PKK_url, function (json) {
//    pkk_BLDG_PKK_geojson = json;
//    pkk_BLDG_PKK = L.geoJSON(pkk_BLDG_PKK_geojson, {
//        style: bldg_style
//    });
//});
//$.getJSON(pkk_BUS_SHELTER_url, function (json) {
//    pkk_BUS_SHELTER_geojson = json;
//    pkk_BUS_SHELTER= L.geoJSON(pkk_BUS_SHELTER_geojson, {
//        style: bus_style
//    });
//});
//function LoadGeojson(url, geojson, style) {
//    var layer;
//    $.getJSON(url, function (json) {
//        geojson = json;
//        layer = L.geoJSON(geojson, {
//            style: style
//        });
//    });

//    return layer;
//};

function tran_marker_display(feature, latlng) {
    if (feature.properties)
    {
        return L.circleMarker(latlng, tran_style);
    };
}


//---BASE MAP ---------------------------------------------------------

//MEASUREMENT----------------------------------------------------------------------
//var measure_ctrl = L.control.measure({ primaryLengthUnit: 'meters', secondaryLengthUnit: 'kilometers', primaryAreaUnit: 'sqmeters', secondaryAreaUnit: undefined });
//measure_ctrl.addTo(map);
//setParent(measure_ctrl.getContainer(), document.getElementById('measure_ctrl'));


//SCALEBAR----------------------------------------------------------------------
var scale_ctrl = L.control.scale({ maxWidth: 200, imperial: false });
scale_ctrl.addTo(map);



// Finally append that node to the new parent.
function setParent(el, newParent) {
    newParent.appendChild(el);
}
//CCTV GEOJSON----------------------------------------------------------------------
var cctvIcon_small = {
    radius: 4,
    fillColor: "#008aff",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var cctvIcon = L.icon({
    iconUrl: 'images/cctv_normal_24.png',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    //popupAnchor: [-3, -76],
    shadowUrl: 'images/cctv_shadow_24.png',
    shadowSize: [24, 24],
    shadowAnchor: [12, 12]
});
var alarmIcon = L.icon({
    iconUrl: 'images/alarm_pin01.png',
    iconSize: [60, 60],
    iconAnchor: [30, 55]
});

var cctv_layer;
var cctv_photo_layer;
var alarm_layer;

var currentZoom = map.getZoom();
var zoomlv_camdisplay = 14;
var cam_display_type = 1;

function cam_icon_display() {
    var s = parseInt(document.querySelector('input[name=cam_display_icon]:checked').value);
    cam_display_type = s;
    render_cctv_onmap();
    render_alarm_onmap();
}

function cctv_marker_display(feature, latlng) {

    if (feature.properties) {
        if (feature.properties.isShow) {
            if (currentZoom >= zoomlv_camdisplay) {
                return L.marker(latlng, { icon: cctvIcon, rotationAngle: feature.properties.heading - 90 });
            }
            else {
                return L.circleMarker(latlng, cctvIcon_small);
            }
        }

    };
};

//Photo Marker EVENT ----------------------------------------------------------------------
function marker_hover(e) {

}
function alarm_marker_display(feature) {

    if (feature.properties && feature.properties.alarm_count > 0) {
            var latlng = [feature.properties.lat, feature.properties.lon];
            return L.marker(latlng, {
                icon: alarmIcon
            });

        };

};




function Filter_CCTV_AOI()
{

}

function get_camera_alarm() {
    camera_alarm_json = camdt;

}


function zoom_to_coor(lat,lon,zoom =false) {
    
    var zm = map.getZoom();
    if (zoom) {
        if (zm < 18) { zm = 18 }
    }
    map.setView([lat, lon], zm);


}


var isShowalarm_ntf = true;
function alarm_notification_display()
{
    if (!isShowalarm_ntf) return;
    var data = alarm_json_all.data.rows;
    var n = data.length;
    if (n <= 0) return;

    var i = 0;
    var cnt = 0;
    var newalarm = '';
    while (i < n && cnt < maxntf)
    {
            var tmp1 = "";
        tmp1 += "<div id='{alarm_bar_id}' class='alarm_bar01'><div  onclick='zoom_to_coor({latlon});alarm_photo_popup_show({alarmid});' style='display:flex'>";
            tmp1 += "<div class='alarm_bar_photo'><img src='{imgurl}' style='width:80px;vertical-align: bottom;'/></div>";
            tmp1 += "<div class='alarm_bar_info'>{alarm_text}</div></div>";
            tmp1 += "<div class='alarm_bar_close' onclick='remove_div({alarm_bar_divid})'>&#9587;</div></div>";

            var nid = 'n_' + data[i].alarmid;
            var chk = arr_alarm_notify_close.indexOf(nid);

            if (chk < 0) {
                var chk2 = AOI_cam_id.indexOf(data[i].cam_id);
                if (chk2 >= 0) {
                    tmp1 = tmp1.replace('{alarmid}', data[i].alarmid);
                    tmp1 = tmp1.replace('{latlon}', data[i].lat + ',' + data[i].lon);
                    tmp1 = tmp1.replace('{alarm_bar_id}', nid);
                    tmp1 = tmp1.replace('{alarm_bar_divid}', '"' + nid + '"');

                    var dt = new Date(parseInt(data[i].timestamputc));
                    var imgurl = alarm_image_server + dt.getFullYear() + '/' + formatnum((dt.getMonth() + 1), 2) + '/' + formatnum(dt.getDate(), 2) + '/' + data[i].alarmid + '.png';

                    tmp1 = tmp1.replace('{imgurl}', imgurl);
                    var txt = data[i].cam_id + ' | ' + data[i].place + '<br>Alarm ID : ' + data[i].alarmid + '<br>' + datetostring(dt);
                    tmp1 = tmp1.replace('{alarm_text}', txt);

                    //arr_alarm_notify.push(tmp1);
                    newalarm += tmp1;
                    cnt++;
                }
            }
            i++;
    }

    document.getElementById("alarm_notify_list").innerHTML = newalarm;

    var p_element = document.getElementById("alarm_notify_list");
    var numberOfChildren = p_element.children.length;
    if (numberOfChildren <= 0) {
        toggle_notify(false);
    } else {
        toggle_notify(true);
    }
}
function alarm_display() {
    var n = 0;
    var data = alarm_json_all.data.rows;
    n = data.length;
    var newalarm = '';
    for (var i = 0 ; i < n ; i++) {
        var chk = AOI_cam_id.indexOf(data[i].cam_id);
        if (chk >= 0) {
            var tmp1 = "";
            tmp1 += "<div id='{alarm_bar_id}' class='alarm_list'><div onclick='zoom_to_coor({latlon});alarm_photo_popup_show({alarmid});'>";
            tmp1 += "<div class='alarm_list_photo'><img src='{imgurl}' class='img01'/></div>";
            tmp1 += "<div class='alarm_list_info'>{alarm_text}</div>";
            tmp1 += "</div></div>";

            var nid = 'a_' + data[i].alarmid;
            tmp1 = tmp1.replace('{alarmid}', data[i].alarmid);
            tmp1 = tmp1.replace('{latlon}', data[i].lat + ',' + data[i].lon);
            tmp1 = tmp1.replace('{alarm_bar_id}', nid);
            tmp1 = tmp1.replace('{alarm_bar_divid}', '"' + nid + '"');

            var dt = new Date(parseInt(data[i].timestamputc));
            var imgurl = alarm_image_server + dt.getFullYear() + '/' + formatnum((dt.getMonth() + 1), 2) + '/' + formatnum(dt.getDate(), 2) + '/' + data[i].alarmid + '.png';

            tmp1 = tmp1.replace('{imgurl}', imgurl);
            var txt = '';
            txt += '<p><b><i class="fa fa-exclamation-circle" style="font-size:1.5em;color:#ff5f00"></i> ' + data[i].cam_id + ' | ' + data[i].place + '</b> ' + datetostring(dt) + '</p>';
            //txt += '<p>' + datetostring(dt) + '</p>';
            txt += '<p>Alarm ID : ' + data[i].alarmid + '</p>';
            txt += '<p>Object : ' + data[i].primaryobject + ' [' + data[i].abnormalmeasure + ']</p>';

            tmp1 = tmp1.replace('{alarm_text}', txt);
            newalarm += tmp1;
            arr_alarm_all.push(tmp1);
        }
    }

    document.getElementById("alarm_list_all").innerHTML = newalarm;
}


var cctv_photo_cluster = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyDistanceMultiplier: 6,
    maxClusterRadius: 80
});

function render_cctv_onmap()
{
    if (cctv_layer != null){ 
        map.removeLayer(cctv_layer); 
    }
    if (cctv_photo_layer != null) {
        map.removeLayer(cctv_photo_layer);
    }
    if (cctv_photo_cluster != null) {
        cctv_photo_cluster.clearLayers();
    }

    switch(cam_display_type) {
        case 1:
            map.removeLayer(cctv_photo_cluster);
            cctv_layer = L.geoJSON(cctv_geojson, {
                pointToLayer: cctv_marker_display,
                onEachFeature: onEach_cam_Feature
            });

            //console.log(cctv_layer);
            map.addLayer(cctv_layer);
            break;
        case 2:
            cctv_photo_layer = L.geoJSON(cctv_geojson, {
                pointToLayer: cctv_photomarker_display,
                onEachFeature: onEach_cam_Feature
            });
            cctv_photo_cluster.addLayer(cctv_photo_layer);

            map.addLayer(cctv_photo_cluster);
            break;
    }
}

function render_alarm_onmap() {

    if (alarm_layer != null) {
        map.removeLayer(alarm_layer);
    }
    if (alarm_json_all == null) {
        return;
    }
    var data = alarm_json_all.data.rows;
    n = data.length;
   
    if (n > 0) {
        var arrmarker = [];
        arrmarker.length = 0;
        for (i = 0; i < n ; i++) {
            var chk = AOI_cam_id.indexOf(data[i].cam_id);
           
            if (chk >= 0) {
                var latlng = [data[i].lat, data[i].lon];
                var mk = L.marker(latlng, {
                    icon: alarmIcon,
                    opacity: 0.5,
                    alarm_id: data[i].alarmid
                });
                mk.on('click', function (e) { on_alarm_mouseover(e, this) });
                arrmarker.push(mk);
            }


        }
        alarm_layer = L.layerGroup(arrmarker);
        alarm_layer.addTo(map);
    }

}


//ALARM SHOW WINDOW ------------------------------------------------------------
var alarm_video_window;
var alarm_video_popup;
var alarm_photo_popup;
function on_alarm_mouseover(e,obj) {
    alarm_photo_popup_show(obj.options.alarm_id);
}
function alarm_video_popup_show(alm_id) {

    if (alarm_json_all == null) return;
    
    var sel_alarm = alarm_json_all.data.rows.filter(function (entry) {
        return entry.alarmid === alm_id;
    });
    
    if (sel_alarm.length <= 0) return;
    var data = sel_alarm[0];
    var title = '<i class="fa fa-play-circle-o" style="color:#ff5f00"></i>';//'Alarm ID : ' + data.alarmid + ' | ' + data.place;
   

    var content = '<div style="text-align:center;padding:3px">';
    content += '{alarmtext}';
    content += '<video controls autoplay><source src="{vdourl}" type="video/mp4" style="background-color:#f3f3f3"></video>';
    content += '<p style="margin-top:8px"><a href="{dl_vdourl}" download target="_blank"><i class="fa fa-download" style="color:#ff5f00;font-size:1.5em;"></i> Download video</a></p>';
    content += '</div>';

    if (data) {
        var dt = new Date(parseInt(data.timestamputc));
        var dnow = datetostring(dt);

        content = content.replace('{alarmtext}', '<p style="margin-bottom: 5px;"><b>Alarm ID : ' + data.alarmid + '</b></p><p style="margin-bottom: 5px;">' + data.place + ' | ' + dnow + '</p>');
        var url = alarm_vdo_server + data.cameraid + '/v' + data.alarmid + '.mp4'
        content = content.replace('{vdourl}', url);
        content = content.replace('{dl_vdourl}', url); 
    }
    //var docw = document.body.clientWidth;
    //var doch = document.body.clientHeight;

    alarm_video_window = L.control.window(map, { title: title, content: content }).show('center_up');

}
function alarm_photo_popup_show(alm_id) {

    if (alarm_json_all == null) return;

    var sel_alarm = alarm_json_all.data.rows.filter(function (entry) {
        return entry.alarmid === alm_id;
    });

    if (sel_alarm.length <= 0) return;
    var data = sel_alarm[0];

    var content = '';
    content += '<div class="cam_popup">';
    content += '<div>{alarmtext}</div>';

 
    content += '<div class="alarm_img_container01" onclick="alarm_video_popup_show({p_alarmid})">';
    content += '<img src="{imgurl}" onerror="this.onerror=null;this.src={error_img};" />';
    content += '<a href="#"><span class="fa fa-play-circle-o fa-5x"></span></a></div>';

    content += '<div style="width:100%;line-height:1.6em;margin: 2px 0;">';
    content += '<a href="#" onclick="alarm_video_popup_show({alarmid})"><i class="fa fa-play-circle-o" style="font-size:1.5em;"></i> View Video</a> &nbsp; | &nbsp;';
    content += '<a href="#" onclick="selectrow_camera({camid})"><i class="fa fa-info-circle" style="font-size:1.5em;"></i> View Camera Detail</a></div>';
    content += '</div>';


    var dt = new Date(parseInt(data.timestamputc));
    var dnow = datetostring(dt);
    var atxt = '<p><i class="fa fa-exclamation-circle" style="font-size:1.5em;color:#ff5f00"></i><b> Alarm ID : ' + data.alarmid + '</b></p><p>' + data.place + ' | ' + dnow + '</p>';
    content = content.replace('{alarmtext}', atxt);
    content = content.replace('{alarmid}', data.alarmid);
    content = content.replace('{p_alarmid}', data.alarmid);
    content = content.replace('{camid}', data.cam_id);

    var imgurl = alarm_image_server + dt.getFullYear() + '/' + formatnum((dt.getMonth() + 1), 2) + '/' + formatnum(dt.getDate(), 2) + '/' + data.alarmid + '.png';
    var errimg = "'images/cctv_no_photo.PNG'";
    content = content.replace('{imgurl}', imgurl);
    content = content.replace('{error_img}', errimg);


            alarm_photo_popup = L.popup({
                        offset: new L.Point(0,0)
                    })
            .setLatLng([data.lat, data.lon])
            .setContent(content)
            .openOn(map);
    
}


function _pxTOmm(px) {
    var heightRef = document.createElement('div');
    heightRef.style = 'height:1mm;display:none';
    heightRef.id = 'heightRef';
    document.body.appendChild(heightRef);

    heightRef = document.getElementById('heightRef');
    var pxPermm = $('#heightRef').height();

    heightRef.parentNode.removeChild(heightRef);
    //console.log('pxPermm : ',pxPermm);
    return  px / pxPermm;
    
}

function getscale_factor() {

    var CenterOfMap = map.getSize().y / 2;
    var RealWorlMetersPer100Pixels = map.distance(
        map.containerPointToLatLng([0, CenterOfMap]),
        map.containerPointToLatLng([100, CenterOfMap])
    );

    var ScreenMetersPer100Pixels = _pxTOmm(100) / 1000;
    var scaleFactor = RealWorlMetersPer100Pixels / ScreenMetersPer100Pixels;
    //.replace formats the scale with commas 50000 -> 50,000

    //console.log('RealWorlMetersPer100Pixels', RealWorlMetersPer100Pixels, currentZoom);
    document.getElementById('scalefactor').innerHTML = 'Scale  1 : ' + Math.round(scaleFactor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //document.getElementById('txtmapscale_print').innerHTML = 'มาตราส่วน  1 : ' + Math.round(scaleFactor).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

function getmap_coor(lat,lng) {
    var lat = Number(lat).toFixed(5);
    var lng = Number(lng).toFixed(5);
    document.getElementById('mlatlon').innerHTML = "Lat, Lon : " + lat + ", " + lng;
}

function map_zoomtoscale(toScale) {
    var ScreenMetersPer100Pixels = _pxTOmm(100) / 1000;
    var RealWorlMetersPer100Pixels = toScale * ScreenMetersPer100Pixels;

    var m = (655.039437851076 - 1310.0788755942806);


    //var px_Y = map.getSize().y;
    var zlv = (RealWorlMetersPer100Pixels - 1310.0788755942806 + (m * 13.5)) / m;
    //console.log('RealWorlMetersPer100Pixels', RealWorlMetersPer100Pixels, zlv);
    map.setZoom(zlv);

}
//MAP EVENT----------------------------------------------------------------------
getmap_coor(13.7, 100.5);
getscale_factor();

var pkk_ADMIN_A_url = 'geojson/PAKKRET_ADMIN_A.geojson';
var pkk_ADMIN_A_geojson = [];
var pkk_ADMIN_A;
//$.getJSON(pkk_ADMIN_A_url, function (json) {
//    pkk_ADMIN_A_geojson = json;
//    pkk_ADMIN_A = L.geoJSON(pkk_ADMIN_A_geojson);
//    map.fitBounds(pkk_ADMIN_A.getBounds());
//});

map.on('zoomend', function () {
    currentZoom = map.getZoom();
    getscale_factor();
    
    //var cZoomlv = map.getZoom();
    //var CenterOfMap = map.getSize().y / 2;
    //var RealWorlMetersPer100Pixels = map.distance(
    //    map.containerPointToLatLng([0, CenterOfMap]),
    //    map.containerPointToLatLng([100, CenterOfMap])
    //);

    //var ScreenMetersPer100Pixels = _pxTOmm(100) / 1000;
    //var scaleFactor = RealWorlMetersPer100Pixels / ScreenMetersPer100Pixels;

    ////var mZoom_dif = cZoomlv - (toScale * cZoomlv / scaleFactor);
    ////var mZoom = cZoomlv + mZoom_dif;
    //console.log('zoom', currentZoom);



});

map.on('mousemove', function (e) {
    //console.log('mousemove : ',e);
    var lat = Number(e.latlng.lat).toFixed(5);
    var lng = Number(e.latlng.lng).toFixed(5);
    document.getElementById('mlatlon').innerHTML = "Lat, Lon : " + lat + ", " + lng;
});

var lyr_standard_json = [];
var lyr_standard = [];

var lyr_standard_ident = [];
var lyr_std_ident_count = 0;
var lyr_std_count = 0;
var isComplete_LyrIdent = false;

map.on('click', function (evt) {
    console.log('click', evt);
    //console.log('mode',map_mouse_mode);
    if (map_mouse_mode == 'LAYER_IDENT') {
        //zoom_to_coor(evt.latlng.lat, evt.latlng.lng);

        //prepare ident
        lyr_std_ident_count = 0;
        lyr_std_count = 0;
        lyr_standard_ident = null;
        lyr_standard_ident = [];
        isComplete_LyrIdent = false;

        _layerIdent(evt);
        return;
    };

    if (map_mouse_mode == 'POI_IDENT') {
        //console.log(evt);
        _POIIdent(evt);
        return;
    };

    if (map_mouse_mode == 'ENT_IDENT') {
        //console.log(evt);
        _ENTIdent(evt);
        return;
    };

    if (map_mouse_mode == 'TOXIC_IDENT') {
        //console.log(evt);
        _TOXICIdent(evt);
        return;
    };

    if (map_mouse_mode == 'SERV_IDENT') {
        //console.log(evt);
        _SERVIdent(evt);
        return;
    };

 
    if (map_mouse_mode == 'MAP_LAYER_IDENT') {
        isComplete_LyrIdent = false;
        _layerIdent(evt);
        return;
    }

    if (map_mouse_mode == 'RS01_IDENT') {
        //console.log('lyr_evt_rs01', lyr_evt_rs01);
        var lyr = [];
        if (map.hasLayer(lyr_evt_rs01)) {
            lyr.push(lyr_evt_rs01.options.layers);
        }
        if (map.hasLayer(lyr_inv_rs01)) {
            lyr.push(lyr_inv_rs01.options.layers);
        }
        if (lyr.length > 0) _map_rs_Ident(evt, lyr, 'ret_map_rs01_Ident');

        return;
    }

    if (map_mouse_mode == 'RS02_IDENT') {
        var lyr = [];
        if (map.hasLayer(lyr_evt_rs02)) {
            lyr.push(lyr_evt_rs02.options.layers);
        }
        if (map.hasLayer(lyr_inv_rs02)) {
            lyr.push(lyr_inv_rs02.options.layers);
        }
        if (lyr.length > 0) _map_rs_Ident(evt, lyr, 'ret_map_rs02_Ident');
        return;
    }


    if (map_mouse_mode == 'RS01_MAPSEARCH') {

        if (!map.hasLayer(eoc_rs_search_layer)) {
            map.addLayer(eoc_rs_search_layer);
        }

        var frm = document.getElementById('iframe_tool_rs01').contentWindow.document;//.getElementById('txtPOIlat');
        //console.log('evt', evt);
        var geoJSON_layer = L.marker(evt.latlng).toGeoJSON();
        if (frm != null)
        {
            eoc_rs_search_layer.eachLayer(
                function (l) {
                    eoc_rs_search_layer.removeLayer(l);
                });
            var bufferdist = frm.getElementById("txt_bufferkm").value;
            var bufferunit = frm.getElementById("searchBuffer_unit_sel").value;

            var options = { steps: 180, units: bufferunit };
            var buffered = turf.buffer(geoJSON_layer, bufferdist, options);

            searchPolygon_geojson = buffered;
            var bufferlayer = L.geoJSON(buffered);
            eoc_rs_search_layer.addLayer(bufferlayer);
            
            document.getElementById('iframe_tool_rs01').contentWindow.get_rs01_mapsearch(searchPolygon_geojson);
        }

        _ChangeMouseMode('RESET');
        return;
    }

    if (map_mouse_mode == 'RS02_MAPSEARCH') {

        if (!map.hasLayer(eoc_rs_search_layer)) {
            map.addLayer(eoc_rs_search_layer);
        }

        var frm = document.getElementById('iframe_tool_rs02').contentWindow.document;//.getElementById('txtPOIlat');
        //console.log('evt', evt);
        var geoJSON_layer = L.marker(evt.latlng).toGeoJSON();
        if (frm != null) {
            eoc_rs_search_layer.eachLayer(
                function (l) {
                    eoc_rs_search_layer.removeLayer(l);
                });
            var bufferdist = frm.getElementById("txt_bufferkm").value;
            var bufferunit = frm.getElementById("searchBuffer_unit_sel").value;

            var options = { steps: 180, units: bufferunit };
            var buffered = turf.buffer(geoJSON_layer, bufferdist, options);

            searchPolygon_geojson = buffered;
            var bufferlayer = L.geoJSON(buffered);
            eoc_rs_search_layer.addLayer(bufferlayer);

            document.getElementById('iframe_tool_rs02').contentWindow.get_rs02_mapsearch(searchPolygon_geojson);
        }

        _ChangeMouseMode('RESET');
        return;
    }

    if (map_mouse_mode == 'RS02_MAPLOC') {
        var all_frmident = document.querySelectorAll("iframe#iframe_ident");
        //console.log('all_frmident', all_frmident);

        all_frmident.forEach(function (frm) {
            //console.log('frm', frm, frm.isget_maploc);
            if (frm.contentWindow.isget_maploc) {
                frm.contentWindow.document.getElementById("txtlat").value = evt.latlng.lat;
                frm.contentWindow.document.getElementById("txtlon").value = evt.latlng.lng;
                frm.contentWindow.isget_maploc = false;

            }
        });

        _ChangeMouseMode('RESET');
        return;
    }
});
var eoc_rs_search_shape = "";

function recenter_map(latlng, offsetx, offsety) {
    //console.log('offsetx', offsetx);

    var center = map.project(latlng);
    center = new L.point(center.x + offsetx, center.y + offsety);
    var target = map.unproject(center);
    //map.panTo(target);

    //console.log('target', target);
    return target;
}


var context_popup = L.popup(); 

////--right click
map.on('contextmenu', (e) => {
    var lat = Number(e.latlng.lat).toFixed(5);
    var lng = Number(e.latlng.lng).toFixed(5);
    var strgoogle = 'http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lng + '&cbp=11,0,0,0,0';

    var content = '<div class="drawpinpopup"><i class="fas fa-map-pin"></i> ' + lat + ',' + lng + '</div>';
    content += '<div class="drawpinpopup"><a href="{googlestreet}" target ="_blank"><i class="fas fa-street-view"></i> Street View</a></div>';
    content = content.replace('{googlestreet}', strgoogle);

    context_popup
        .setLatLng(e.latlng)
        .setContent(content)
        .addTo(map)
        .openOn(map);
});

var mylocation
document.getElementById("menu_location").addEventListener("click", function () {
    if (map.hasLayer(mylocation)) {
        map.removeLayer(mylocation);
    }
    navigator.geolocation.getCurrentPosition(function (location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
        mylocation = L.marker(latlng).addTo(map);
        map.setView(latlng, 18);
    });
});


var pinlocation
document.getElementById("btn_loc").addEventListener("click", function () {
    if (map.hasLayer(pinlocation)) {
        map.removeLayer(pinlocation);
    }
    var lat = document.getElementById("txt_lat_loc").value;
    var lng = document.getElementById("txt_lon_loc").value;
    var latlng = new L.LatLng(lat, lng);
    pinlocation = L.marker(latlng).addTo(map);
    map.setView(latlng, 18);

});
document.getElementById("btn_loc_gg").addEventListener("click", function () {
    google_search_form_open();

});
document.getElementById("btn_loc_clear").addEventListener("click", function () {
    if (map.hasLayer(pinlocation)) {
        map.removeLayer(pinlocation);
    }

});

function get_from_googlemap(data) {
    if (data != null) {
        //console.log('offsetx', offsetx);
        if (map.hasLayer(pinlocation)) {
            map.removeLayer(pinlocation);
        }

        document.getElementById("txt_lat_loc").value = data.lat;
        document.getElementById("txt_lon_loc").value = data.lng;

        var latlng = new L.LatLng(data.lat, data.lng);
        pinlocation = L.marker([data.lat, data.lng]).addTo(map);
        map.setView(latlng, 18);
    }
}