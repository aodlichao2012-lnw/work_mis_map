using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace mapmng.mis
{
    public partial class frm_mis : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Response.Redirect(@"~/mis/frm_section_92_main.aspx");
        }

        protected void Menu1_MenuItemClick(object sender, MenuEventArgs e)
        {
        }
    }
}