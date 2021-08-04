function create_div() {

    var strjson = "{\"div_num\" : 3 , \"ac_name\":\"f-16\"}";
    PageMethods.function_distributer('test_nut_div', JSON.parse(strjson), 'ret_div', page_return_function);
}

function ret_div(data) {
    document.getElementById("displaydiv").innerHTML = data;
}

function call_alert(msg) {
    alert(msg);
}