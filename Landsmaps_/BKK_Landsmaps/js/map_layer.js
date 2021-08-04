
function get_layer_standard() {
    var strjson = '{}';
    PageMethods.function_distributer('get_toc_list', JSON.parse(strjson), 'ret_layer_standard', page_return_function);
    //$.getJSON("http://61.7.192.6:8999/rettoc", function (json) {

    //    lyr_standard_json = json.ret_lyr;
    //    lyr_standard = null;
    //    lyr_standard = new Array();
    //    console.log('lyr_standard_json', lyr_standard_json);
    //    for (var i = 0; i < lyr_standard_json.length; i++) {
    //        var lt = 0;
    //        if (i == 0) { lt = 1;}
    //        lyr_standard[i] = L.tileLayer.wms(lyr_standard_json[i].tblServiceAddr, {
    //            layers: lyr_standard_json[i].tblname,
    //            format: lyr_standard_json[i].tblformat,
    //            transparent: lyr_standard_json[i].tblTransparent,
    //            attribution: lyr_standard_json[i].tblAttribution,
    //            layerName: lyr_standard_json[i].tblcontent,
    //            visible: lyr_standard_json[i].tblvisible,
    //            opacity: lyr_standard_json[i].tblOpacity,
    //            src: lyr_standard_json[i],
    //            toc_node: 'lyr_std_node_' + i,
    //            toc_opac_node: 'lyr_std_opac_node_' + i,
    //            toc_opac_ctrl: 'lyr_std_opac_ctrl_' + i,
    //            toc_img_node: 'lyr_std_img_' + i,
    //            style_img_url: '',
    //            minZoom: min_z,
    //            maxZoom: max_z,
    //            layertype: lt
    //        });

    //    }

    //    set_layer_standard();
    //});

}

function ret_layer_standard(data) {
    lyr_standard_json = data;//JSON.stringify(data, null, 4);
    lyr_standard = null;
    lyr_standard = new Array();

    //mode2 
    var mode2_layer = ["v_int_573cam", "v_light", "v_light_buffer"];

    //test apollo ------------
    lyr_standard_json = [
        {
            havelegend: "false",
            layertype: 0,
            sql_upd: "",
            tblAttribution: "",
            tblLyrOrder: 1,
            tblOpacity: 100,
            tblServiceAddr: "http://apollo.gi-information.com/erdas-apollo/vector/ADMIN?service=WMS",
            //tblServiceAddr: "http://apollo.gi-information.com/erdas-apollo/vector/ADMIN?service=WMS&request=GetLayer&layers=Admin_Subdis_Bnd",
            tblTransparent: "true",
            tblcontent: "Admin_Subdis_Bnd",
            tblformat: "image/png",
            tblid: 1,
            tblname: "Admin_Subdis_Bnd",
            tblvisible: "true"
        },
        //{
        //    havelegend: "false",
        //    layertype: 0,
        //    sql_upd: "",
        //    tblAttribution: "",
        //    tblLyrOrder: 1,
        //    tblOpacity: 100,
        //    tblServiceAddr: "http://apollo.gi-information.com/erdas-apollo/vector/PROVINCE?service=WMS",
        //    tblTransparent: "true",
        //    tblcontent: "TH_Province",
        //    tblformat: "image/png",
        //    tblid: 1,
        //    tblname: "TH_Province",
        //    tblvisible: "true"
        //}
    ];



    console.log(lyr_standard_json);
    for (var i = 0; i < lyr_standard_json.length; i++) {
        var lt = 0;
        if (i == 0) { lt = 1; }


        var lyr_vis = lyr_standard_json[i].tblvisible;
        //if (app_load_mode == "2") {

        //    if (mode2_layer.includes(lyr_standard_json[i].tblname)) {
        //        lyr_vis = "true";
        //    } else {
        //        lyr_vis = "false";
        //    };
        //    console.log("tblname", lyr_standard_json[i].tblname, lyr_vis)
        //}

        lyr_standard[i] = L.tileLayer.wms(lyr_standard_json[i].tblServiceAddr, {
            layers: lyr_standard_json[i].tblname,
            format: lyr_standard_json[i].tblformat,
            transparent: lyr_standard_json[i].tblTransparent,
            attribution: lyr_standard_json[i].tblAttribution,
            layerName: lyr_standard_json[i].tblcontent,
            visible: lyr_vis,
            opacity: lyr_standard_json[i].tblOpacity,
            src: lyr_standard_json[i],
            toc_node: 'lyr_std_node_' + i,
            toc_opac_node: 'lyr_std_opac_node_' + i,
            toc_opac_ctrl: 'lyr_std_opac_ctrl_' + i,
            toc_img_node: 'lyr_std_img_' + i,
            style_img_url: '',
            minZoom: min_z,
            maxZoom: max_z,
            layertype: lt
        });

    }

    set_layer_standard();
}



//get_layer_standard();

var isShow_only_visible_layer = false;
function set_layer_standard() {
    //CREATE LAYER OBJECT ------------------------------------------
    var strlyr;
    strlyr = '<ul id="Layer_treeview" class="hummingbird-base">';
    //console.log('lyr_standard', lyr_standard);
    for (var i = 0; i < lyr_standard.length; i++) {

        var strtmp = '';
        if (lyr_standard[i].options.src.havelegend == 'true') {
            strtmp += '<li{is_show}><div class="noimage"></div>';
        }
        else {
            strtmp += '<li{is_show}><img src="{img_src}" id="{img_id}" class="imgstyle"/>';//<img src="{_imglyr_}" class="imgicon" style="display:none"/>
        }
        
        strtmp += '<label style="cursor:pointer;"><input id="{node_id}" data-id="custom-0" type="checkbox" {is_check} style="cursor:pointer;">{layer_name}</label>';
        strtmp += '<div{is_show}><div id="{node_opac}" class="nodeopac"><input id="{node_opac_ctrl}" type="range" min="1" max="100" value="{opac_val}" class="slider-layer-opac" ><br>';

        if (lyr_standard[i].options.src.havelegend == 'true') {
            strtmp += '<img src = "{img_src}" id = "{img_id}"  class="imgstyle"/>';
        };
        
        strtmp += '</div></div></li>';




        strtmp = strtmp.replace('{imglyr}', 'images/icon_demo2.png');
        strtmp = strtmp.replace('{node_id}', 'lyr_std_node_' + i);
        strtmp = strtmp.replace('{layer_name}', lyr_standard[i].options.src.tblcontent);
        strtmp = strtmp.replace('{opac_val}', lyr_standard[i].options.src.tblOpacity);
        strtmp = strtmp.replace('{node_opac}', 'lyr_std_opac_node_' + i);
        strtmp = strtmp.replace('{node_opac_ctrl}', 'lyr_std_opac_ctrl_' + i);
        strtmp = strtmp.replace('{img_id}', 'lyr_std_img_' + i);

        var img_url = lyr_standard[i].options.src.tblServiceAddr + 'TRANSPARENT=true&SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.1.1';
       
        if (lyr_standard[i].options.src.havelegend == 'true') {
            img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
            img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';//FEATURETYPE&SCALE=27083.932228516387
            img_url += '&legend_options=fontName:Kanit;fontSize:12;fontAntiAliasing:true;fontColor:0x666666;forceLabels:on;countMatched:true;';//bgColor:0xFFFFEE;fontStyle:bold;dpi:100;';
            //img_url += '&legend_options=fontName:Kanit;fontSize:12;fontAntiAliasing:true;fontColor:0x666666;forceLabels:on;countMatched:true;';//bgColor:0xFFFFEE;fontStyle:bold;dpi:100;';
        }
        else
        {
            img_url += '&EXCEPTIONS=application/vnd.ogc.se_blank&LAYER={lyr_name}';
            img_url += '&FORMAT=image/png&WIDTH=24&HEIGHT=24';//FEATURETYPE&SCALE=27083.932228516387
            img_url = img_url.replace('{lyr_name}', lyr_standard[i].options.src.tblname);
        }
        img_url = img_url.replace('{lyr_name}', lyr_standard[i].options.src.tblname);


        strtmp = strtmp.replace('{img_src}', img_url);
        if (lyr_standard[i].options.visible == 'true') {
            strtmp = strtmp.replace('{is_check}', 'checked');
            strtmp = strtmp.replace(/{is_show}/gi, '');
        }
        else
        {
            strtmp = strtmp.replace('{is_check}', '');
            if (isShow_only_visible_layer) {
                strtmp = strtmp.replace(/{is_show}/gi, ' style="display:none"');
            } else {
                strtmp = strtmp.replace(/{is_show}/gi, '');
            }
        }

        strlyr = strlyr + strtmp;
            
    }
    strlyr = strlyr + '</ul>';
    document.getElementById("layer_standard_list").innerHTML = strlyr;

    //TOC EVENT ------------------------------------------
    for (var i = 0; i < lyr_standard.length; i++) {
           
            if (lyr_standard[i].options.visible == 'true')
            {
                lyr_standard[i].setZIndex(3);
                if (!map.hasLayer(lyr_standard[i])) {
                    map.addLayer(lyr_standard[i]);
                    //console.log("add layer std", lyr_standard[i]);
                }
                document.getElementById(lyr_standard[i].options.toc_opac_node).style.display = 'block';
            }
            document.getElementById(lyr_standard[i].options.toc_node).lyr_index = i;
            document.getElementById(lyr_standard[i].options.toc_opac_node).lyr_index = i;
            document.getElementById(lyr_standard[i].options.toc_opac_ctrl).lyr_index = i;

            document.getElementById(lyr_standard[i].options.toc_node).addEventListener("change", toggle_layer);
            document.getElementById(lyr_standard[i].options.toc_opac_ctrl).addEventListener("input", layer_opac);
            
    }

    
}

function toggle_layer(evt) {
    var index = evt.target.lyr_index;
    
    if (map.hasLayer(lyr_standard[index])) {
        map.removeLayer(lyr_standard[index]);
        document.getElementById(lyr_standard[index].options.toc_opac_node).style.display = 'none';

        lyr_standard[index].options.visible = 'false';
    } else {
        if (lyr_standard[index].options.layertype == 1) {
            lyr_standard[index].setZIndex(2);
        }
        else {
            lyr_standard[index].setZIndex(3);
        }
        
        map.addLayer(lyr_standard[index]);
        document.getElementById(lyr_standard[index].options.toc_opac_node).style.display = 'block';

        lyr_standard[index].options.visible = 'true';
        //console.log("toggle layer std", index, lyr_standard[index]);
    }
    //set_layer_standard_print_legend();
};
function layer_opac(evt) {
    var index = evt.target.lyr_index;
    if (map.hasLayer(lyr_standard[index])) {
        lyr_standard[index].setOpacity(this.value / 100);
    };
};

//document.getElementById('chk_only_v_lyr').addEventListener("change", toggle_only_v_layer);
//function toggle_only_v_layer(evt) {
    
//    isShow_only_visible_layer = document.getElementById("chk_only_v_lyr").checked;
//    //console.log('isShow_only_visible_layer',isShow_only_visible_layer);
//    set_layer_standard();
//};

//document.getElementById('chk_Maplegend').addEventListener("change", toggle_maplegend);
//function toggle_maplegend(evt) {
//    if (document.getElementById("chk_Maplegend").checked)
//        document.getElementById("maplegend").style.display = 'block'
//    else
//        document.getElementById("maplegend").style.display = 'none'
//};


_init_lyr_toc("layer_toc");
function _init_lyr_toc(node) {

    var acc = document.getElementById(node).getElementsByClassName("accordion");
    var i;
    //console.log("acc", acc);
    for (i = 0; i < acc.length; i++) {
        

        acc[i].addEventListener("click", function () {
            var panel = this.nextElementSibling;
            this.classList.toggle("active");
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.display = 'none';
                //document.getElementById(node).style.maxHeight = null;
            } else {
                panel.style.maxHeight = "200px";
                panel.style.display = 'inline-block';
                //document.getElementById(node).style.maxHeight = (window.innerHeight - 300) + "px";
            }
        });
    }
};



var sel_lyr;
function selLayer(e) {
    //console.log('selLayer', e);
    if (e == 'BLDG_PKK') {
        document.getElementById("pnl_search_bldg").style.display = 'block';
    } else {
        document.getElementById("pnl_search_bldg").style.display = 'none';
    }
    sel_lyr = e;
};
function selTambon(e) {
    if (e !== '') {

        var search_option = {
                "bltb": e
            }

        $.post('http://61.7.192.6:9898/get_vilnum', search_option)
        .done(function (data) {
            //console.log('get_vilnum', data)
            var strtmp = '<option value="">-</option>';
            if (data.length > 0) 
            {
                for (var i = 0; i < data.length; i++) {
                    var str = '<option value="{mu_val}">{mu_text}</option>';
                    str = str.replace('{mu_val}', data[i].bl_villnum);
                    str = str.replace('{mu_text}', data[i].bl_villnum);
                    strtmp += str;
                }
                document.getElementById("mu_sel").innerHTML = strtmp;
            }
            else
            {
               document.getElementById("mu_sel").innerHTML = strtmp;
            }

        });

    }
    else 
    {
        var strtmp = '<option value="">-</option>';
        document.getElementById("mu_sel").innerHTML = strtmp;
    }
    

};



function _search_selector_refresh() {
    console.log('_search_selector_refresh', lyr_standard);
    var strtmp = '';
    for (var i = 0; i < lyr_standard.length; i++) {
        if (lyr_standard[i].options.visible == 'true') {
            if (lyr_standard[i].options.src.tblname != 'bldg_label') {
                var str = '<option value="{lyr_name}" displaytext="{lyr_name_text}">{lyr_content}</option>';
                str = str.replace('{lyr_name}', lyr_standard[i].options.src.tblname);
                str = str.replace('{lyr_name_text}', lyr_standard[i].options.src.tblcontent);
                str = str.replace('{lyr_content}', lyr_standard[i].options.src.tblcontent);
                strtmp += str;
            }
        }
        //console.log('strtmp', strtmp);
    }
    document.getElementById("lyr_sel").innerHTML = strtmp;
    if (sel_lyr != '') {
        document.getElementById("lyr_sel").value = sel_lyr;
    }
};