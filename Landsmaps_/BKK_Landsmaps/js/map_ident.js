var wmsurl = 'http://61.7.192.6:8080/geoserver/pkk/wms?';
var wmsParams =
{
    format: "image/png",
    height: 256,
    layers: "BLDG_PKK",
    request: "GetMap",
    service: "WMS",
    srs: "EPSG:3857",
    styles: "",
    transparent: true,
    version: "1.1.1",
    width: 256
};



var showResults_LAYER = L.Util.bind(showGetFeatureInfo_LAYER, null);
lyr_std_count = 0;
lyr_std_ident_count = 0;
function _layerIdent(evt) {
    //console.log("ident", isComplete_LyrIdent);
    console.log("lyr_standard ident ", lyr_std_ident_count, lyr_std_count, isComplete_LyrIdent);

    //Check Finish Ident
    if (isComplete_LyrIdent) {
        return;
    }



    
    var i = lyr_std_count;
    var wms_layer = lyr_standard[i];
    console.log("lyr_standard", lyr_standard[i]);
    var url = getFeatureInfoUrl(evt.latlng, lyr_standard[i]._url, wms_layer);
    //var showResults_LAYER = L.Util.bind(showGetFeatureInfo_LAYER, null);
    console.log("url", url);


    if (lyr_standard[i].options.visible == 'true') {

        $.ajax({
            url: url,
            success: function (data, status, xhr) {

                var err = typeof data === 'string' ? null : data;

                //console.log("Return ident", data);
                data_json = JSON.parse(data);
                console.log("Return ident", data_json);

                //data_json.feature.thname = '';
                //data_json.feature.addr = '';
                //data_json.feature.description = '';

                //showResults_LAYER(err, evt.latlng, data);
                if (data_json != null ) {//&& data_json.numberReturned > 0
                    
                    var ident = {
                        "latlng": evt.latlng,
                        "layer": wms_layer,
                        "data": data_json
                    }
                    console.log("ident", ident);
                    lyr_standard_ident[lyr_std_ident_count] = ident;
                    lyr_std_count++;
                    lyr_std_ident_count++;

                    if (lyr_std_count < lyr_standard.length) {
                        isComplete_LyrIdent = false;
                        _layerIdent(evt);
                    } else {
                        isComplete_LyrIdent = true;
                        lyr_std_count = 0;
                        lyr_std_ident_count = 0;
                        showResults_LAYER('', evt.latlng, lyr_standard_ident);
                    }
                }
                else
                {
                    lyr_std_count++;
                    if (lyr_std_count < lyr_standard.length) {
                        isComplete_LyrIdent = false;
                        _layerIdent(evt);
                    } else {
                        lyr_std_count = 0;
                        lyr_std_ident_count = 0;
                        isComplete_LyrIdent = true;
                        showResults_LAYER('', evt.latlng, lyr_standard_ident);
                    }
                }

            },
            error: function (xhr, status, error) {
                //showResults_LAYER(error);
                console.log("ident error");
                lyr_std_count++;
                if (lyr_std_count < lyr_standard.length) {
                    isComplete_LyrIdent = false;
                    _layerIdent(evt);
                } else {
                    lyr_std_count = 0;
                    lyr_std_ident_count = 0;
                    isComplete_LyrIdent = true;
                    showResults_LAYER('', evt.latlng, lyr_standard_ident);
                }
            },
        });

    }
    else
    {
        lyr_std_count++;
        if (lyr_std_count < lyr_standard.length) {
            isComplete_LyrIdent = false;
            _layerIdent(evt);
        } else {
            lyr_std_count = 0;
            lyr_std_ident_count = 0;
            isComplete_LyrIdent = true;
            showResults_LAYER('', evt.latlng, lyr_standard_ident);
        }
    }
    
    

};

function getFeatureInfoUrl(latlng, url, wmsLayer) {
    // Construct a GetFeatureInfo request URL given a point
    //console.log('wmsLayer', wmsLayer);
    var point = this.map.latLngToContainerPoint(latlng, map.getZoom()),
        size = this.map.getSize(),
        params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            styles: wmsLayer.wmsParams.styles,
            transparent: wmsLayer.wmsParams.transparent,
            version: wmsLayer.wmsParams.version,
            format: wmsLayer.wmsParams.format,
            bbox: map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            layers: wmsLayer.wmsParams.layers,
            query_layers: wmsLayer.wmsParams.layers,
            info_format: 'application/json' //'application/json'//text/html//text/plain
        };
    //console.log('params wmsLayer', params);
    params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
    params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

    var r_url = url + L.Util.getParamString(params, url, true);
    //console.log('res_url', r_url);
    return r_url;
};

var lyr_std_ident_popup;
function showGetFeatureInfo_LAYER(err, latlng, content) {
    if (err) { console.log('err',err); return; } // do nothing if there's an error
    // Otherwise show the content in a popup, or something.
    //console.log('content', lyr_standard_ident);

    content = '<div class="mapident">';
    if (lyr_standard_ident.length > 0) {
        content += '<div class="identcount"><b><img src="Images/icons/24pixel/report_24.png" class="imgheader"> พบข้อมูล ' +
                    (lyr_standard_ident.length).toString() + ' ช้อมูล</b></br></div>';
        content += '<div class="listwrapper">';
        content += '<div class="identlist">';
        for (var i = 0; i < lyr_standard_ident.length; i++) {
            var lyrName = lyr_standard_ident[i].layer.options.layerName;
            var img_url;
            var info = lyr_standard_ident[i].data.features[0];
            var node_id = 'lyr_ident_' + i;

            content += '<div id="{nodeid}" class="layeritem" onclick ="lyr_detail_popup_show({index})">'.replace('{nodeid}', node_id).replace('{index}', i);
            if (lyr_standard_ident[i].layer.options.src.havelegend == 'true') {
                console.log('params rule', lyr_standard_ident[i]);
                img_url = lyr_standard_ident[i].layer.options.src.tblServiceAddr + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
                img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
                img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24{RULE}';//FEATURETYPE&SCALE=27083.932228516387
                img_url = img_url.replace('{lyr_name}', lyr_standard_ident[i].layer.options.src.tblname);
                img_url = img_url.replace('{RULE}', '&rule=' + lyr_standard_ident[i].data.features['0'].properties.sel_rule);

                content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url); 
            }
            else
            {
                img_url = lyr_standard_ident[i].layer.options.src.tblServiceAddr + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
                img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
                img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';
                img_url = img_url.replace('{lyr_name}', lyr_standard_ident[i].layer.options.src.tblname);

                content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url);
            }
            lyr_standard_ident[i].layer.options.style_img_url = img_url;

            content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);
            //content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
            //if (typeof info.properties.addr !== 'undefined')
            //    content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';
            //content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';
            //content += '<hr/>';

            content += '</div>';
        }
        content += "</div>";
        content += "</div>";


        
    }
    else
    {
        content += '<b><img src="Images/icons/24pixel/report_24.png" class="imgheader"> ไม่พบข้อมูล </b></br>';
    }
    content += "</div>";



    if (content != null || content != '') {
        lyr_std_ident_popup = L.popup({ maxWidth: 800, autoPanPaddingTopLeft: [0, 40]})
            .setLatLng(latlng)
            .setContent(content)
            .openOn(map);
    }
};


function open_mapident_panel(index) {
    HideAllpanel();
    show_form('t_mapident_form', tmapident_form_Width);
    zoom_to_coor(lyr_standard_ident[index].latlng.lat, lyr_standard_ident[index].latlng.lng, true);
};

var lyr_detail_popup;
var lyr_detail_popup_count = 0;
var print_text_detail_from_ident = '';
function lyr_detail_popup_show(index) {
    var lyrdetail = lyr_standard_ident[index];
    if (lyrdetail == null) return;

    //console.log("lyrdetail", lyrdetail);
    var lyrName = lyrdetail.layer.options.layerName;
    var img_url = lyrdetail.layer.options.style_img_url;
    var info = lyrdetail.data.features[0];

    //info.properties.thname = '';
    //info.properties.addr = '';
    //info.properties.descriptions = '';

    //var title = '<img src="Images/icons/24pixel/report_24.png" class="image_lyr_detail"> {name}'.replace('{name}', (info.properties.thname === null ? "-" : info.properties.thname));
    var title = '<img src="Images/icons/24pixel/report_24.png" class="image_lyr_detail"> {name}'.replace('{name}', 'Layer ident');

    content = '<div class="lyrdetail">';
    content += '<div class="listwrapper">';
    content += '<div class="identlist">';

        content += '<div class="layeritem"">';
        content += '<div class="lyricon"><img src="{imgurl}" class="imglayer"></div>'.replace('{imgurl}', img_url); //info.id 
        content += '<div class="header">{lyrName}</div>'.replace('{lyrName}', lyrName);

        //content += '<div class="lyricon"></div><div class="lyrinfo"><b>ชื่อ : </b>' + (info.properties.thname === null ? "-" : info.properties.thname) + '</div>';
        //if (typeof info.properties.addr !== 'undefined')
        //content += '<div class="lyricon"></div><div class="lyrinfo"><b>ที่อยู่ : </b>' + (info.properties.addr === null ? "-" : info.properties.addr) + '</div>';//	fas fa-directions
        //content += '<div class="lyricon"></div><div class="lyrinfo"><b>คำอธิบาย : </b>' + (info.properties.descriptions === null ? "-" : info.properties.descriptions) + '</div>';

        //content += '<div id="bldg_lic_node"></div>';
        //content += '<div style="text-align:center;margin-top:5px"><a href="https://www.google.com/maps/dir/?api=1&origin=13.912735,100.497957&destination={lat_lng}&travelmode=car" target = "_blank"><i class="fas fa-directions"></i> Google Maps Navigation</div>'.replace('{lat_lng}', lyrdetail.latlng.lat + ',' + lyrdetail.latlng.lng);
        //content += '</a></div>';

       

        content += '</div>';
        //add to print detail
        //print_text_detail_from_ident = 'ชื่อ : ' + (info.properties.thname === null ? "-" : info.properties.thname) + '\n';
        //print_text_detail_from_ident += 'ที่อยู่ : ' + (info.properties.addr === null ? "-" : info.properties.addr) + '\n';
        //print_text_detail_from_ident += 'คำอธิบาย : ' + (info.properties.descriptions === null ? "-" : info.properties.descriptions);
        
        if (document.getElementById("txt_print_d")) {
            document.getElementById('txt_print_d').value = print_text_detail_from_ident;
            document.getElementById('txt_print_desc').value = print_text_detail_from_ident;
        } 
        //add to print detail

    lyr_detail_popup_count++;
    content += '<div id="{node_detail}" class="wrapperdetail">'.replace('{node_detail}', 'lyr_detail_popup_' + lyr_detail_popup_count);
    content += '<div class="accordion">รายละเอียด</div>';
    content += '<div class="panel">';

        var prop = lyrdetail.data.features['0'].props;
       
        var key = Object.keys(prop);
        console.log("prop", prop);


    prop.forEach(function (key) {
        var str = '<div class="lyrlabel"><b>{key}</b></div><div class="lyrinfo2">{value}</div>'.replace('{key}', key.name);
        str = str.replace('{value}', (key.value === null ? "-" : key.value));
        content += str;
    });

    //for (var i in prop) {
    //    var str = '<div class="lyrlabel"><b>{key}</b></div><div class="lyrinfo2">{value}</div>'.replace('{key}', key[i]);
    //    str = str.replace('{value}', (prop[key[i]] === null ? "-" : prop[key[i]]));
    //    content += str;
    //}

    content += '</div>';
    content += '</div>';


    content += '</div>';
    content += '</div>';


    //content += '<div><a href="https://www.google.com/maps/dir/13.912585/@{lat_lng}">Google map</div>'.replace('{lat_lng}', lyrdetail.latlng.lat + ',' + lyrdetail.latlng.lng);
    content += '</div>';

    //console.log(title, content);
    lyr_detail_popup = L.control.window(map, { title: title, content: content });
    lyr_detail_popup.on('show', function (e) { _init_lyr_detail_popup('lyr_detail_popup_' + lyr_detail_popup_count) });
    lyr_detail_popup.show('center_up');
}

function _init_lyr_detail_popup(node) {

    var acc = document.getElementById(node).getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {

            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            //console.log(wrp, panel);
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.display = 'none';
                document.getElementById(node).style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                panel.style.display = 'inline-block';
                document.getElementById(node).style.maxHeight = (window.innerHeight - 300) + "px";
            }
        });
    }
};


