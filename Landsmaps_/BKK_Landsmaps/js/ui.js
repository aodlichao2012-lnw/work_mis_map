function formatnum(num, digit) {

    var l = num.toString().length;


    if (l >= digit) {
        return num.toString();
    }
    else {
        var r = num.toString();
        var n = digit - l;
        var j;
        for (j = 0; j < n; j++) {
            r = '0' + r;
        }
        return r;

    }
}

function datetostring(d) {
    return formatnum(d.getDate(), 2) + '/' + formatnum((d.getMonth() + 1), 2) + '/' + d.getFullYear() + ' ' + formatnum(d.getHours(), 2) + ":" + formatnum(d.getMinutes(), 2) + ":" + formatnum(d.getSeconds(), 2);
}


function imageExists(url, callback) {
    var img = new Image();
    img.onload = function () { callback(true); };
    img.onerror = function () { callback(false); };
    img.src = url;
}


var tMainmenu_Width = 80;
var tBasemap_Width = 300;
var tMaplayer_Width = 380;
var tMaptool_Width = 380;
var tMapsearch_Width = 500;
var tMappoi_Width = 500; 
var tMapprj_Width = 500;
var tMapent_Width = 500; 
var tMapentreport_Width = 380; 
var tmapident_form_Width = 350;
var tMaptoxic_Width = 500; 
var tMapserv_Width = 500; 
var tMapserv_user_Width = 500; 
var tMapserv_req_Width = 380;
var tcamera_detail = 350;
var tMapresource01_Width = 500;
var tMapresource02_Width = 500;

var tpoi_form_Width = 500;
var trouting_form_Width = 340; 
var tent_form_Width = 700;
var tserv_form_Width = 500;
var tserv_user_form_Width = 500;
var tserv_req_form_Width = 400;
var teoc_rs_form_Width = 240;
var max_opac = 0.95;

HideAllTools();
function resize_screen(){
    //HideAllTools();
    //if (document.getElementById('camera_detail').style.width != '0px') {
    //    Toggle_panel('camera_detail', tcamera_detail);
    //};
    //var element = document.getElementById('_body');
    //var style = window.getComputedStyle(element);
    //var width = style.getPropertyValue('width');

    var pageHeight = document.getElementById('_body').offsetHeight;
    var pageWidth = document.getElementById('_body').offsetWidth;


    //console.log('width', pageWidth);
    if (pageWidth > 1020) {
        document.getElementById('main_menu_list').style.display = 'block';
    };
    
}

var main_menu = '';
function main_menu_sel(menu) {
    //console.log(menu);
    main_menu = menu;
    switch (menu) {
        case 'TOGGLE':
            //console.log(document.getElementById('main_menu_list').style.display);
            if (document.getElementById('main_menu_list').style.display == 'none') {
                document.getElementById('main_menu_list').style.display = 'block';
                //document.getElementById('main_nav').style.width = '130px';
                //document.getElementById('main_nav').style.backgroundColor = 'unset';
            }
            else {
                document.getElementById('main_menu_list').style.display = 'none';
                //document.getElementById('main_nav').style.width = '30px';
                document.getElementById('main_nav').style.backgroundColor = 'unset';
            }
            break;
        case 'BASEMAP':
            HideAllTools();
            ToggleTools_Left('t_basemap', tBasemap_Width);
            break;
        case 'LAYER':
            HideAllTools();
            ToggleTools_Left('t_maplayer', tMaplayer_Width);
            break;
        case 'MAPTOOL':
            HideAllTools();
            ToggleTools('t_maptool', tMaptool_Width);

            if (draw_mode = 'draw_search') {
                document.getElementById('chk_m_line').checked = true;
                select_draw_maptools('m_line');
            };
            break;
        case 'SEARCH':
            select_draw_maptools('draw_search');

            HideAllTools();
            ToggleTools('t_mapsearch', tMapsearch_Width);
            _search_selector_refresh();
            break;
        case 'POI':
            HideAllTools();
            ToggleTools('t_mappoi', tMappoi_Width);
            break;
        case 'PROJECT':
            HideAllTools();
            ToggleTools('t_mapprj', tMapprj_Width);
            break;
        case 'ENTREPRENEUR':
            HideAllTools();
            ToggleTools('t_mapent', tMapent_Width);
            break;
        case 'ENTREPORT':
            HideAllTools();
            ToggleTools('t_mapentreport', tMapentreport_Width);
            break;
        case 'ENTEDIT':
            HideAllTools();
            //ToggleTools('t_mapent', tMapent_Width);
            ent_form_open('owned');
            break;
        case 'TOXIC':
            HideAllTools();
            ToggleTools('t_maptoxic', tMaptoxic_Width);
            break;
        case 'SERVICE':
            HideAllTools();
            ToggleTools('t_mapserv', tMapserv_Width);
            break;
        case 'SERVICEEDIT':
            HideAllTools();
            serv_form_open('owned');
            //ToggleTools('t_mapserv', tMapserv_Width);
            break;
        case 'SERVICEUSER':
            HideAllTools();
            ToggleTools('t_mapserv_user', tMapserv_Width);
            break;
        case 'SERVICEUSEREDIT':
            HideAllTools();
            serv_user_form_open('owned');
            //ToggleTools('t_mapserv_user', tMapserv_Width);
            break;
        case 'SERVICEREQUEST':
            HideAllTools();
            ToggleTools('t_mapserv_req', tMapserv_req_Width);
            break;
        case 'RESOURCE01':
            //sessionStorage.setItem("active_res", "RESOURCE01");
            HideAllTools();
            ToggleTools('t_mapresource01', tMapresource01_Width);
            break;
        case 'RESOURCE02':
            HideAllTools();
            ToggleTools('t_mapresource02', tMapresource02_Width);
            break;
    }
}

function ToggleMenu(isshow) {
    var right = document.getElementById("menulist").style.right;
    //alert(width);
    if (right == "0" || right =='0px') {

        document.getElementById("menulist").style.right = '-' + tMainmenu_Width + 'px';
        document.getElementById("menulist").style.opacity = '0';
        document.getElementById("sidepanel_wrapper").style.right = '0';
    }
    else {
        document.getElementById("menulist").style.right = '0';
        document.getElementById("menulist").style.opacity = max_opac;


        document.getElementById("sidepanel_wrapper").style.right = tMainmenu_Width + 'px';
    }

}

var loch = 0;
function ToggleLoc() {
    var element = document.getElementById('pnlloc');
    var style = window.getComputedStyle(element);
    var h = style.getPropertyValue('height');


    if (loch <= 0) {
        document.getElementById("pnlloc").style.height = "60px";
        loch = 60;
    }
    else {
        document.getElementById("pnlloc").style.height = "0px";
        loch = 0;
    }

}

function ToggleTools(panelname, pwidth) {
    var element = document.getElementById(panelname);
    var style = window.getComputedStyle(element);
    //var width = style.getPropertyValue('width');
    var docw = document.body.clientWidth;
    var right = style.getPropertyValue('right');

    if (docw < 768) {
        //document.getElementById("menulist").style.right = '-' + tMainmenu_Width + 'px';
        //document.getElementById("menulist").style.opacity = '0';
        //document.getElementById("sidepanel_wrapper").style.right = '0';
    };

    if (right != "0px") {
        if (docw < 768) {
            //console.log(docw + ',' + pwidth);
            if (docw < (pwidth + 125)) {
                pwidth = (docw - 125);
                //console.log(screen.width + ',' + pwidth);
            }

        };
        document.getElementById(panelname).style.right = '0';
        document.getElementById(panelname).style.width = pwidth + 'px';
        document.getElementById(panelname).style.opacity = max_opac;
        //document.getElementById(panelname).style.display = 'block';
        //document.getElementById('main_nav').style.right = pwidth + 'px';
        return true;
    }
    else {
        document.getElementById(panelname).style.width = pwidth + 'px';
        document.getElementById(panelname).style.right = '-' + pwidth +'px';
        document.getElementById(panelname).style.opacity = '0';
        //document.getElementById(panelname).style.display = 'none';
        //document.getElementById('main_nav').style.right = '0';
        return false;
    }
    
    
}

function ToggleTools_Left(panelname, pwidth) {
    var element = document.getElementById(panelname);
    var style = window.getComputedStyle(element);
    //var width = style.getPropertyValue('width');
    var docw = document.body.clientWidth;
    var left = style.getPropertyValue('left');

    if (docw < 768) {
        //document.getElementById("menulist").style.right = '-' + tMainmenu_Width + 'px';
        //document.getElementById("menulist").style.opacity = '0';
        //document.getElementById("sidepanel_wrapper").style.right = '0';
    };

    if (left != "0px") {
        if (docw < 768) {
            //console.log(docw + ',' + pwidth);
            if (docw < (pwidth + 125)) {
                pwidth = (docw - 125);
                //console.log(screen.width + ',' + pwidth);
            }

        };
        document.getElementById(panelname).style.left = '0';
        document.getElementById(panelname).style.width = pwidth + 'px';
        document.getElementById(panelname).style.opacity = max_opac;
        //document.getElementById(panelname).style.display = 'block';
        //document.getElementById('main_nav').style.right = pwidth + 'px';
        return true;
    }
    else {
        document.getElementById(panelname).style.width = pwidth + 'px';
        document.getElementById(panelname).style.left = '-' + pwidth + 'px';
        document.getElementById(panelname).style.opacity = '0';
        //document.getElementById(panelname).style.display = 'none';
        //document.getElementById('main_nav').style.right = '0';
        return false;
    }


}


function HideAllTools() {
    
    //document.getElementById('t_basemap').style.right    = '-' + tBasemap_Width + 'px';
    //document.getElementById('t_maplayer').style.right = '-' + tMaplayer_Width + 'px';

    document.getElementById('t_basemap').style.left = '-' + tBasemap_Width + 'px';
    document.getElementById('t_maplayer').style.left = '-' + tMaplayer_Width + 'px';
    document.getElementById('t_maptool').style.right    = '-' + tMaptool_Width + 'px';
    document.getElementById('t_mapsearch').style.right = '-' + tMapsearch_Width + 'px';
    document.getElementById('t_mapresource01').style.right = '-' + tMapresource01_Width + 'px';
    document.getElementById('t_mapresource02').style.right = '-' + tMapresource02_Width + 'px';
    
    document.getElementById('t_basemap').style.opacity = '0';
    document.getElementById('t_maplayer').style.opacity = '0';
    document.getElementById('t_maptool').style.opacity = '0';
    document.getElementById('t_mapsearch').style.opacity = '0';
    document.getElementById('t_mapresource01').style.opacity = '0';
    document.getElementById('t_mapresource02').style.opacity = '0';

    if (document.getElementById('t_mappoi') != null) {
        document.getElementById('t_mappoi').style.right = '-' + tMappoi_Width + 'px';
        document.getElementById('t_mappoi').style.opacity = '0';
    }

    if (document.getElementById('t_mapprj') != null) {
        document.getElementById('t_mapprj').style.right = '-' + tMapprj_Width + 'px';
        document.getElementById('t_mapprj').style.opacity = '0';
    }

    if (document.getElementById('t_mapent') != null) {
        document.getElementById('t_mapent').style.right = '-' + tMapent_Width + 'px';
        document.getElementById('t_mapent').style.opacity = '0';
    }

    if (document.getElementById('t_mapentreport') != null) {
        document.getElementById('t_mapentreport').style.right = '-' + tMapentreport_Width + 'px';
        document.getElementById('t_mapentreport').style.opacity = '0';
    }

    //document.getElementById('t_basemap').style.display = 'none';
    //document.getElementById('t_maplayer').style.display = 'none';
    //document.getElementById('t_maptool').style.display = 'none';
    //document.getElementById('t_mapsearch').style.display = 'none';
    //document.getElementById('t_mappoi').style.display = 'none';
    //document.getElementById('t_mapent').style.display = 'none';
}

function HideAllpanel() {

    //document.getElementById('t_poi_form').style.left = '-' + tpoi_form_Width + 'px';
    //document.getElementById('t_routing_form').style.left = '-' + trouting_form_Width + 'px';
    //document.getElementById('t_ent_form').style.left = '-' + tent_form_Width + 'px';
    //document.getElementById('t_serv_form').style.left = '-' + tserv_form_Width + 'px';
    //document.getElementById('t_serv_user_form').style.left = '-' + tserv_user_form_Width + 'px';
    //document.getElementById('t_serv_req_form').style.left = '-' + tserv_req_form_Width + 'px';
    document.getElementById('t_eoc_rs_form').style.left = '-' + teoc_rs_form_Width + 'px';

    //document.getElementById('t_poi_form').style.opacity = 0;
    //document.getElementById('t_routing_form').style.opacity = 0;
    //document.getElementById('t_ent_form').style.opacity = 0;
    //document.getElementById('t_serv_form').style.opacity = 0;
    //document.getElementById('t_serv_user_form').style.opacity = 0;
    //document.getElementById('t_serv_req_form').style.opacity = 0;
    document.getElementById('t_eoc_rs_form').style.opacity = 0;
    //document.getElementById('t_poi_form').style.display = 'none';
    //document.getElementById('t_routing_form').style.display = 'none';
    //document.getElementById('t_ent_form').style.display = 'none';
    
}
function show_form(frm,frmwidth) {
    document.getElementById(frm).style.width = frmwidth + 'px';
    document.getElementById(frm).style.left = 0;
    document.getElementById(frm).style.opacity = max_opac;
}

function close_form(frm) {
    console.log('frm', document.getElementById(frm).style.width);
    document.getElementById(frm).style.left = '-' + document.getElementById(frm).style.width;// + 'px';
    document.getElementById(frm).style.opacity = 0;
}

function form_load(frm, htmlfile, iframename = 'iframe_DATA') {
    //alert(frm, htmlfile);
    //document.getElementById(frm).innerHTML = '<object type="text/html" data="' + htmlfile +'" style="width:100%;height: 100%;"></object>';
    document.getElementById(frm).innerHTML =
        '<iframe src="' + htmlfile +
    '" style="width:100%;height: 100%;border:none;" id ="' + iframename + '"></iframe>';
}


function Toggle_panel(panelname, pwidth) {
    var element = document.getElementById(panelname);
    var docw = document.body.clientWidth;
    if (pwidth == 0) {
        element.style.width = pwidth + 'px';
        element.style.opacity = '0';
    }
    else
    {
        if (docw < 768) {
            element.style.width = '100%';
        }
        else {
            element.style.width = pwidth + 'px';
        }
        element.style.opacity = '0.95';
    }
    
}

function toggle_notify(isshow) {
    var element = document.getElementById("alarm_panel");
    if (isshow) {
        //element.style.visibility = 'visible';
        element.style.bottom = '50px';
        element.style.opacity = '0.95';
    }
    else
    {
        
        //element.style.visibility = 'hidden';
        element.style.bottom = '-50px';
        element.style.opacity = '0';
        var i;
        for (i = 0; i < arr_alarm_all.length; i++) {
            arr_alarm_notify.push(arr_alarm_all[i]);
        }
        arr_alarm_all.length = 0;
        setTimeout(function () { document.getElementById("alarm_notify_list").innerHTML = ''; }, 200);
        //console.log('noti : ' + arr_alarm_notify + '  all  : ' + arr_alarm_all);
    }
    //x.className = "show";
    //x.className = x.className.replace("show", "");
    //setTimeout(function () { x.className = x.className.replace("show", ""); }, 10000);
}
function toggle_show_notify(elem) {
    isShowalarm_ntf = elem.checked;
    if (!isShowalarm_ntf) toggle_notify(isShowalarm_ntf);

    document.getElementById("chkalarm_nty").checked = isShowalarm_ntf;
    document.getElementById("chkalarm_nty2").checked = isShowalarm_ntf;
}
function remove_div(dvid) {

    var element = document.getElementById(dvid);
    element.className = 'alarm_bar01_close';
    arr_alarm_notify_close.push(dvid);

    setTimeout(function () {
        element.outerHTML = "";
        var p_element = document.getElementById("alarm_notify_list");
        var numberOfChildren = p_element.children.length;
        console.log('alarm in list : ' + numberOfChildren);
        if (numberOfChildren <= 0) {
            toggle_notify(false);
        };
    }, 300);
}

var map_mouse_mode = "";//--- mouse mode

function clear_map_mouse_action(evt) {
    
    //lyr chkbox
    if (document.getElementById("chk_ident_lyr") != null)
        document.getElementById("chk_ident_lyr").checked = false;

    //route chkbox
    if (document.getElementById("chk_route_work") != null)
        document.getElementById("chk_route_work").checked = false;

    //poi chkbox
    if (document.getElementById("chk_ident_poi") != null)
        document.getElementById("chk_ident_poi").checked = false;

    //ent chkbox
    if (document.getElementById("chk_ident_ent") != null)
        document.getElementById("chk_ident_ent").checked = false;

    //toxic chkbox
    if (document.getElementById("chk_ident_toxic") != null)
        document.getElementById("chk_ident_toxic").checked = false;

    //serv chkbox
    if (document.getElementById("chk_ident_serv") != null)
        document.getElementById("chk_ident_serv").checked = false;

    //rs01 chkbox
    if (document.getElementById("chk_ident_rs01") != null)
        document.getElementById("chk_ident_rs01").checked = false;

    //rs02 chkbox
    if (document.getElementById("chk_ident_rs02") != null)
        document.getElementById("chk_ident_rs02").checked = false;
    //console.log('evt', evt);
    if (evt != null && document.getElementById(evt.id) != null) document.getElementById(evt.id).checked = !evt.checked;
}

function _setMouseMode_Ctrl(evt) {
    //console.log('evt', evt);
    if (evt.checked) {
        clear_map_mouse_action(evt);
        map_mouse_mode = '';
        _ChangeMouseMode(evt.value);
    }
    else {
        map_mouse_mode = '';
    }
    
};

function _ChangeMouseMode(mode) {
    //console.log('_ChangeMouseMode', mode);
    map_mouse_mode = mode;
    switch (map_mouse_mode) {
        case '':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'LAYER_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'MAP_LAYER_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'POI_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'ENT_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'TOXIC_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'SERV_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'CREATE_POI':
            document.getElementById('mapmain').style.cursor = 'crosshair';
            break;
        case 'CREATE_ENT':
            document.getElementById('mapmain').style.cursor = 'crosshair';
            break;
        case 'CREATE_SERV':
            document.getElementById('mapmain').style.cursor = 'crosshair';
            break;
        case 'MAP_ROUTING':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'RS01_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'RS02_IDENT':
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        case 'RS01_MAPSEARCH':
            document.getElementById('mapmain').style.cursor = 'crosshair';
            break;
        case 'RS02_MAPSEARCH':
            document.getElementById('mapmain').style.cursor = 'crosshair';
            break;
        case 'RS02_MAPLOC':
            document.getElementById('mapmain').style.cursor = 'crosshair';
            break;
        case 'RESET':
            map_mouse_mode = '';
            document.getElementById('mapmain').style.cursor = 'default';
            break;
        default:
            map_mouse_mode = '';
            document.getElementById('mapmain').style.cursor = 'default';
            break;
    }
}

document.getElementById("btn_toggle_mapscale").addEventListener("click", function () {
    var o = document.getElementById("main_menu_list_mapscale").style.display;
    if (o == 'none')
        document.getElementById("main_menu_list_mapscale").style.display = 'block'
    else
        document.getElementById("main_menu_list_mapscale").style.display = 'none';

});

document.getElementById("mapscaleheader").addEventListener("click", function () {
    var o = document.getElementById("main_menu_list_mapscale").style.display;
    if (o == 'none')
        document.getElementById("main_menu_list_mapscale").style.display = 'block'
    else
        document.getElementById("main_menu_list_mapscale").style.display = 'none';

});


document.getElementById("btn_clear_mouse").addEventListener("click", function () {
    clear_map_mouse_action(null);
    map_mouse_mode = '';
    _ChangeMouseMode('');
});

//document.getElementById("menu_clearmouse").addEventListener("click", function () {
//    clear_map_mouse_action(null);
//    map_mouse_mode = '';
//    _ChangeMouseMode('');

//    btn_lyr_clear_search.click();
//    if (document.getElementById('iframe_tool_rs01') != null && (document.getElementById('iframe_tool_rs01'))) {
//        var frm = document.getElementById('iframe_tool_rs01').contentWindow.document;
//        console.log('frm1', frm);
//        if (frm != null) {
//            frm.getElementById('btn_rs01_search_clear').click();
//        }
//    }
    
//    if (document.getElementById('iframe_tool_rs02') != null && (document.getElementById('iframe_tool_rs02'))) {
//        var frm = document.getElementById('iframe_tool_rs02').contentWindow.document;
//        console.log('frm2', frm);
//        if (frm != null) {
//            frm.getElementById('btn_rs02_search_clear').click();
//        }
//    }

//    clear_all_draw_layer(); 

//});

document.getElementById("btn_ident_layer").addEventListener("click", function () {
    //console.log('btn_ident_layer', 'btn_ident_layer');

    clear_map_mouse_action(null);
    map_mouse_mode = '';
    _ChangeMouseMode('LAYER_IDENT');
    document.getElementById("chk_ident_lyr").checked = true;
});

function SERV_REQ_formClose() {
    //console.log('close form ');
    close_form('t_serv_req_form');
    //if (SERV_USER_Insert_Marker != null) map.removeLayer(SERV_USER_Insert_Marker);
}

function onPerformLoading(isLoading, displaytext = 'Loading') {
    document.getElementById("scn_loading_text").innerHTML = displaytext;
    if (isLoading)
        document.getElementById("scn_loading").style.display = 'block'
    else
        document.getElementById("scn_loading").style.display = 'none';
}


