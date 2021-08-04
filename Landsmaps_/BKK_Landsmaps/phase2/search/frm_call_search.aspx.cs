using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;

namespace mapmng.phase2.search
{
    public partial class frm_call_search : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [System.Web.Services.WebMethod]
        public static object function_distributer(string functionname, object jsonparam, string return_functionname)
        {
            return cl_distributer.distribute_function(functionname, jsonparam, return_functionname);
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            // code behind call javascript function ***
            ScriptManager.RegisterStartupScript(this.Page, typeof(Page), "text", "test_call(" + 3 + ")", true);
        }
    }
}