using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;
using Npgsql;

namespace mapmng.mis
{
    public partial class frm_section_10_main : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        private DataTable get_data(string criteria = "")
        {
            string connstring = WebConfigurationManager.ConnectionStrings["bkk_con"].ConnectionString;
            DataTable res = new DataTable();
            // *** ตัวแปรกลาง สำหรับใช้ทั้งโปรจก ** 
            cl_global_var global_variable = new cl_global_var();

            NpgsqlConnection conn = new NpgsqlConnection(connstring);
            conn.Open();

            string strsql;

            if (criteria != "")
            {
                strsql = "SELECT * FROM public.data_v2_10050000 Where " + criteria + " And area_id = " + global_variable.user_group_id +
                    " and area_code = " + global_variable.user_dept_id + " LIMIT 100";
            }
            else
            {
                strsql = "SELECT * FROM public.data_v2_10050000 Where  area_id = " + global_variable.user_group_id +
                    " and area_code = " + global_variable.user_dept_id + " LIMIT 100";
            }


            NpgsqlCommand objcmd = new NpgsqlCommand(strsql, conn);
            objcmd.CommandType = CommandType.Text;

            NpgsqlDataReader dr = objcmd.ExecuteReader();

            if (dr.HasRows)
            {
                res.Load(dr);
            }

            return res;
        }

    }
}