var pkk_login = {
    "username": "userh123",
    "name": "Pakkret",
    "surname": "Nontaburi",
    "mobile": "0899999999",
    "sys_id": "5",
    "sys_name": "ระบบ Pakkret GIS",
    "sys_permission_id": "51",
    "user_type": "เจ้าหน้าที่",
    "sys_permission_name": "เจ้าหน้าที่",
    "date": "21/04/2019 15:45"
}


function getUserjson_success(response, userContext, methodName) {
    //console.log('login response', response);
    pkk_login = JSON.parse(response);
    pkk_login.sys_permission_id = document.getElementById('txt_sys_permission_id').value;

    var login = {
            "login_json": pkk_login,
            "action": "system login : " + pkk_login.sys_name + " | " + pkk_login.sys_permission_name
    }

    $.post('http://61.7.192.6:8999/ins_user_log', login)
        .done(function (data) {
            //console.log('data', data);
            //document.getElementById('txtSys_count').innerHTML = "จำนวนผู้เข้าใช้ระบบ " + data.inc_sys_counter + " คน | ";
        });


    //console.log('login response', pkk_login);
    //console.log(JSON.stringify(login));
    //console.log("ยินดีต้อนรับ คุณ " + pkk_login.name + " " + pkk_login.surname + " คุณมีสิทธิ์เป็น " + pkk_login.user_type);
    

    var syscount = {
        "rid": pkk_login.sys_id
    }

    

    document.getElementById('txtUser_login').innerHTML = "<i class='fas fa-user'></i> " + pkk_login.name;// + " " + pkk_login.surname;



}

function page_return_function(response, userContext, methodName) {
    //console.log('page_return_function', response);
    var fn = window[response.return_functionname];
    fn(response.data);
}


function main_menu_mb_open(mode = null) {

    // Get the modal
    var modal = document.getElementById('frmMainModal');
    var btnclose = document.getElementById("frmMainModal_close");

    //document.getElementById('t_serv_form').style.zindex = '999';
    modal.style.display = 'block';

    // When the user clicks on <span> (x), close the modal
    btnclose.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    _ChangeMouseMode('');


    //var frm = 'mapmng/frm_ent_main_checkdoc.aspx?uname={uname}&utype={utype}';
    //frm = frm.replace('{uname}', pkk_login.username);
    //frm = frm.replace('{utype}', pkk_login.sys_permission_id);


    //HideAllpanel();
    //show_form('t_serv_form', tserv_form_Width);
    //form_load('modal_content', frm);
}