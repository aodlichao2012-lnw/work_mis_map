var poi_geojson_url = 'geojson/poi.geojson';
var poi_geojson = [];
var poi_layer;
var wms_service_url = 'http://61.7.192.6:8080/geoserver/pkk/wms?';

var poiIcon = L.icon({
    iconUrl: 'images/poi01.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});

var lyr_poi = L.tileLayer.wms(wms_service_url, {
    layers: 'mo_poi',
    format: 'image/png',
    transparent: true,
    attribution: "Point of Interest",
    minZoom: 0,
    maxZoom: 20
});

function poi_marker_display(feature, latlng) {

    if (feature.properties) {
        //if (currentZoom >= zoomlv_camdisplay) {
        return L.marker(latlng, { icon: poiIcon });
        //}
        //else {
        //    return L.circleMarker(latlng, cctvIcon_small);
        //}
    };
};

function refresh_poi_layer() {

    if (map.hasLayer(lyr_poi)) {
        map.removeLayer(lyr_poi);
        lyr_poi = null;


        lyr_poi = L.tileLayer.wms(wms_service_url, {
            layers: 'mo_poi',
            format: 'image/png',
            transparent: true,
            attribution: "Point of Interest",
            minZoom: 0,
            maxZoom: 20
        });
        lyr_poi.setParams({ update_time: Date.now() });
        lyr_poi.setZIndex(5);

        map.addLayer(lyr_poi);
        select_draw_maptools('poi');
    }

    

};

document.getElementById("chk_show_poi").addEventListener("change", function () {
    //console.log("lyr_poi", lyr_poi);



    if (map.hasLayer(lyr_poi)) {
        map.removeLayer(lyr_poi);
        
        select_draw_maptools('');
    } else {
        lyr_poi = L.tileLayer.wms(wms_service_url, {
            layers: 'mo_poi',
            format: 'image/png',
            transparent: true,
            attribution: "Point of Interest",
            minZoom: 0,
            maxZoom: 20
        });
        lyr_poi.setParams({ update_time: Date.now()});
        lyr_poi.setZIndex(5);

        map.addLayer(lyr_poi);
        select_draw_maptools('poi');
    }
});

var lyr_poi_ident = [];
var lyr_poi_ident_count = 0;
var showResults_POI = L.Util.bind(showGetFeatureInfo_POI, null);

function _POIIdent(evt) {
    
    var i = lyr_std_count;
    var wms_layer = lyr_poi;
    var url = getFeatureInfoUrl(evt.latlng, lyr_poi._url, wms_layer);

    //console.log("poi ident wms_layer", wms_layer);
    if (lyr_poi) {
        $.ajax({
            url: url,
            success: function (data, status, xhr) {
                
                var err = typeof data === 'string' ? null : data;
                //console.log("poi ident data", data);
                //showResults(err, evt.latlng, data);
                if (data != null && data.numberReturned > 0) {

                    var ident = {
                        "latlng": evt.latlng,
                        "layer": wms_layer,
                        "data": data
                    }
                    //console.log("poi ident", ident);
                    lyr_poi_ident[0] = ident;
                    showResults_POI('', evt.latlng, lyr_poi_ident);
                }

            },
            error: function (xhr, status, error) {
                //showResults_POI(error);
            },
        });

    }
};

function showGetFeatureInfo_POI(err, latlng, content) {
    //console.log('lyr_poi_ident content', lyr_poi_ident);
    //if (err) { console.log(err); return; } // do nothing if there's an error
    // Otherwise show the content in a popup, or something.
    console.log('lyr_poi_ident content', lyr_poi_ident);

    content = '<div class="mapident">';
    if (lyr_poi_ident.length > 0) {
        content += '<div class="identcount"><b><img src="Images/icons/24pixel/mapbase_24.png" class="imgheader"> พบข้อมูล ' +
            (lyr_poi_ident.length).toString() + ' ช้อมูล</b></br></div>';
        content += '<div class="listwrapper">';
        content += '<div class="identlist">';
        for (var i = 0; i < lyr_poi_ident.length; i++) {
            var lyrName = 'จุดสนใจ';
            var img_url;
            var info = lyr_poi_ident[i].data.features[0];
            var node_id = 'lyr_poi_ident_' + i;

            content += '<div id="{nodeid}" class="layeritem" onclick ="poi_detail_popup_show({index})">'.replace('{nodeid}', node_id).replace('{index}', i);
            
            img_url = wms_service_url + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
                img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
                img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';
                img_url = img_url.replace('{lyr_name}', 'mo_poi');

                content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url);
            
            lyr_poi_ident[i].layer.options.style_img_url = img_url;

            content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);
            content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
            if (typeof info.properties.addr !== 'undefined')
                content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';
            content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';
            //content += '<hr/>';

            content += '</div>';
        }
        content += "</div>";
        content += "</div>";



    }
    else {
        content += '<b><img src="Images/icons/24pixel/mapbase_24.png" class="imgheader"> ไม่พบข้อมูล </b></br>';
    }
    content += "</div>";



    if (content != null || content != '') {
        lyr_std_ident_popup = L.popup({ maxWidth: 800, autoPanPaddingTopLeft: [0, 40] })
            .setLatLng(latlng)
            .setContent(content)
            .openOn(map);
    }
};

function poi_detail_popup_show(index) {
    var lyrdetail = lyr_poi_ident[index];
    if (lyrdetail == null) return;

    //console.log("lyrdetail", lyrdetail);
    var lyrName = 'จุดสนใจ';
    var img_url = lyrdetail.layer.options.style_img_url;
    var info = lyrdetail.data.features[0];

    var title = '<img src="Images/icons/24pixel/mapbase_24.png" class="image_lyr_detail"> {name}'.replace('{name}', (info.properties.thname === null ? "-" : info.properties.thname));

    content = '<div class="lyrdetail">';
    content += '<div class="listwrapper">';
    content += '<div class="identlist">';

    content += '<div class="layeritem"">';
    content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url); //info.id 
    content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);

    content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
    if (typeof info.properties.addr !== 'undefined')
        content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';
    content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';
    content += '</div>';

    lyr_detail_popup_count++;
    content += '<div id="{node_detail}" class="wrapperdetail">'.replace('{node_detail}', 'lyr_detail_popup_' + lyr_detail_popup_count);
    content += '<div class="accordion">รายละเอียด</div>';
    content += '<div class="panel">';

    var prop = lyrdetail.data.features['0'].properties;
    var key = Object.keys(prop);
    //console.log("prop", prop, key);


    for (var i in key) {
        var str = '<div class="lyrlabel"><b>{key}</b></div><div class="lyrinfo2">{value}</div>'.replace('{key}', key[i]);
        str = str.replace('{value}', (prop[key[i]] === null ? "-" : prop[key[i]]));
        content += str;
    }

    content += '</div>';
    content += '</div>';


    content += '</div>';
    content += '</div>';

    var strgoogle = 'http://maps.google.com/maps?q=&layer=c&cbll=' + lyrdetail.latlng.lat + ',' + lyrdetail.latlng.lng + '&cbp=11,0,0,0,0';
    content += '<div class="googlest"><a href="' + strgoogle + '" target ="_blank"><i class="fas fa-street-view"></i> Street View</a></div>';
    content += '</div>';

    //console.log(title, content);
    lyr_detail_popup = L.control.window(map, { title: title, content: content });
    lyr_detail_popup.on('show', function (e) { _init_lyr_detail_popup('lyr_detail_popup_' + lyr_detail_popup_count) });
    lyr_detail_popup.show('center_up');
}

function poi_form_open(mode) {
    if (mode == 'map') {
        clear_map_mouse_action(null);
        _ChangeMouseMode('CREATE_POI');
    }
    else if (mode == 'new') {
        _ChangeMouseMode('');
        var frm = 'mapmng/frm_POIinsert.aspx';

        HideAllpanel();
        show_form('t_poi_form', tpoi_form_Width);
        form_load('poi_form', frm);
    }
    else {
        _ChangeMouseMode('');
        var frm = 'mapmng/frm_POIinsert.aspx?id={id}';
        frm = frm.replace('{id}', mode)

        HideAllpanel();
        show_form('t_poi_form', tpoi_form_Width);
        form_load('poi_form', frm);
    }

    //// Get the modal
    //var modal = document.getElementById('myModal');
    //var span = document.getElementsByClassName("close")[0];
    
    //document.getElementById('t_poi_form').style.zindex = '999';
    //modal.style.display = 'block';

    //// When the user clicks on <span> (x), close the modal
    //span.onclick = function () {
    //    modal.style.display = "none";
    //}

    //PageMethods.main_service_text(client_search_success);

}

var POI_Insert_Marker;
map.on('click', function (evt) {
    //console.log(evt);

    if (map_mouse_mode == 'CREATE_POI') {
        var frm = 'mapmng/frm_POIinsert.aspx?POIlat={LAT}&POIlon={LNG}';
        frm = frm.replace('{LAT}', evt.latlng.lat).replace('{LNG}', evt.latlng.lng);

        //console.log('frm', frm);
        HideAllpanel();
        show_form('t_poi_form', tpoi_form_Width);
        form_load('poi_form', frm);
        //setFormHeight('poi_form');
        if (POI_Insert_Marker != null) map.removeLayer(POI_Insert_Marker);
        POI_Insert_Marker = L.marker(evt.latlng, {
            draggable: true
        }).addTo(map);

        POI_Insert_Marker.on('dragend', function (e) {
            update_POI_LatLng(POI_Insert_Marker.getLatLng().lat, POI_Insert_Marker.getLatLng().lng);
        });

        map.panTo(evt.latlng);
        _ChangeMouseMode('RESET');
        return;
    };

});

function update_POI_LatLng(lat, lng) {
    var frmInsertPOI = document.getElementById('iframe_DATA').contentWindow.document;//.getElementById('txtPOIlat');
    //console.log('frmInsertPOI', frmInsertPOI);
    frmInsertPOI.getElementById('txtPOIlat').value = lat;
    frmInsertPOI.getElementById('txtPOIlon').value = lng;
};

function update_POI_Pin(lat, lng) {
 
    if (POI_Insert_Marker == null) {
        POI_Insert_Marker = L.marker([lat,lng], {
            draggable: true
        }).addTo(map);

        POI_Insert_Marker.on('dragend', function (e) {
            update_POI_LatLng(POI_Insert_Marker.getLatLng().lat, POI_Insert_Marker.getLatLng().lng);
        });
    }

    POI_Insert_Marker.setLatLng([lat, lng]);
    map.panTo([lat, lng]);
};


function setFormHeight(frm) {
    var frmnode = document.getElementById(frm);
    if (frmnode) {
        frmnode.style.height = frmnode.contentWindow.document.body.scrollHeight + 'px';
        //var iframeWin = frmnode.contentWindow || frmnode.contentDocument.parentWindow;
        //if (iframeWin.document.body) {
        //    frmnode.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        //}
    }
};

function client_search_success(response, userContext, methodName) {
    console.log(response, userContext, methodName);
    alert(response);
}

function POI_formClose() {
    close_form('t_poi_form');
    if (POI_Insert_Marker != null) map.removeLayer(POI_Insert_Marker);
    if (map.hasLayer(POI_Insert_Marker)) {
        map.removeLayer(POI_Insert_Marker);
    }
    POI_Insert_Marker = null;
}