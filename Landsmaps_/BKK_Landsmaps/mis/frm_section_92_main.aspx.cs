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
    public partial class frm_section_92_main : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                Panel1.Visible = false;
                Session["type"] = "=";
                rai.Text = "0";
                wa.Text = "0";
                dgvResult.DataSource = get_data();
                dgvResult.DataBind();
            }

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

            if (criteria != "" )
            {
                strsql = "SELECT * FROM public.v_current_sec92 Where " + criteria + "  area_id = " + global_variable.user_group_id +
                     " and area_code = " + global_variable.user_dept_id + " LIMIT 100";
            }

            else
            {
                strsql = "SELECT * FROM public.v_current_sec92 Where  area_id = " + global_variable.user_group_id +
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



        protected void btnsearch_parcel_Click(object sender, EventArgs e)
        {
            string cri = make_string_criteria();

            dgvResult.DataSource = get_data(cri);
            dgvResult.DataBind();
        }

        private string make_string_criteria()
        {
            string res = "";

            if (txt_srh_parcel_num.Text != "")
            {
                res = " parcel_no like " + my_functions.pre_str("%" + txt_srh_parcel_num.Text + "%") + " And ";
            }

            if (txt_srh_parcel_owner.Text != "")
            {
                if (res != "")
                {
                    res = res + " and  fname like " + my_functions.pre_str("%" + txt_srh_parcel_owner.Text + "%")+ " And ";
                }
                else
                {
                    res = " fname like " + my_functions.pre_str("%" + txt_srh_parcel_owner.Text + "%") + " And ";
                }
            }
            
            if(wawawa.Text != "" && wawawa2.Text == "")
            {
                if (res != "")
                {
                    res = res + "wawa  " + Session["type"].ToString() + "'" + wawawa.Text + "' And ";
                }
                else
                {
                    res = "wawa  " + Session["type"].ToString() + "'" + wawawa.Text + "' And ";
                }

            }
            if(type1.Text != "" )
            {
                res = res + "type_name = '" + type1.Text + "'And ";
            }
            if (Panel2.Visible == true)
            {
                if (res != "")
                {
                    res = res + "wawa  between '" + wawawa.Text + "' and '" + wawawa2.Text + "'And ";
                }
                else
                {
                    res = "wawa  between '" + wawawa.Text + "' and '" + wawawa2.Text + "' And ";
                }
            }
            //if(ty)

            return res;
        }

        protected void dgvResult_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int rowindex = Convert.ToInt32(e.CommandArgument);
            dgvResult.SelectedIndex = rowindex;
            int index = 0;
            if (e.CommandName == "view_details")
            {
                 index = my_functions.GetColumnIndexByHeaderText(dgvResult, "pk_link");
                index = my_functions.GetColumnIndexByDBName(dgvResult, "pk_link");
                //Session["id"] = dgvResult.SelectedRow.Cells[6].Text;
                GridViewRow row = dgvResult.SelectedRow;
                Session["id"] = row.Cells[index].Text;
                Response.Write(@"<script>window.open ('frm_section_92_details.aspx?pk="+ Session["id"].ToString() + "','_blank');</script>");
            }
        }

        protected void AreaCheck_CheckedChanged(object sender, EventArgs e)
        {
            if (AreaCheck.Checked)
            {
                arearadio.Visible = true;
                Panel1.Visible = true;
                rai.Visible = true;
                khan.Visible = true;
                wa.Visible = true;
            }
            else if (!AreaCheck.Checked)
            {
                arearadio.Visible = false;
                rai.Text = "";
                khan.Text = "";
                wa.Text = "";
                wawawa.Text = "";
                rai2.Text = "";
                khan2.Text = "";
                wa2.Text = "";
                subwa2.Text = "";
                wawawa2.Text = "";
                rai.Visible = false;
                khan.Visible = false;
                wa.Visible = false;
                Panel1.Visible = false;
            }
        }

        protected void arearadio_SelectedIndexChanged(object sender, EventArgs e)
        {
            rai.Text = "";
            khan.Text = "";
            wa.Text = "";
            subwa.Text = "";
            wawawa.Text = "";
            Panel1.Visible = true;
            Session["type"] = arearadio.SelectedValue.ToString();
            if(arearadio.SelectedValue == "between")
            {
                rai2.Text = "";
                khan2.Text = "";
                wa2.Text = "";
                subwa2.Text = "";
                wawawa2.Text = "";
                Panel2.Visible = true;
            }
            else
            {
                rai2.Text = "";
                khan2.Text = "";
                wa2.Text = "";
                subwa2.Text = "";
                wawawa2.Text = "";
                Panel2.Visible = false;
                Panel1.Visible = true;
            }

        }

        protected void dgvResult_RowEditing(object sender, GridViewEditEventArgs e)
        {
            Session["id"] = dgvResult.DataKeys[e.NewEditIndex].Value;
        }

        protected void wawa_TextChanged(object sender, EventArgs e)
        {

            double lai1 = !rai.Text.Equals("") ? Convert.ToInt32(rai.Text) : 0;
            double khan1 = !khan.Text.Equals("") ? Convert.ToInt32(khan.Text) : 0;
            double wa11 = !wa.Text.Equals("") ? Convert.ToDouble(wa.Text) : 0;
            double sub = !subwa.Text.Equals("") ? Convert.ToDouble(subwa.Text) : 0;
            double wa1 = 0.00;
            if (rai == null && khan == null)
            {
                rai.Text = "0";
                khan.Text = "0";
            }

            wa1 = (lai1 * 400) + (khan1 * 100) + wa11 + sub;
             wawawa.Text = wa1.ToString();
        }

        protected void rai2_TextChanged(object sender, EventArgs e)
        {
            double lai1 = !rai2.Text.Equals("") ? Convert.ToInt32(rai2.Text) : 0;
            double khan1 = !khan2.Text.Equals("") ? Convert.ToInt32(khan2.Text) : 0;
            double wa11 = !wa2.Text.Equals("") ? Convert.ToDouble(wa2.Text) : 0;
            double sub = !subwa2.Text.Equals("") ? Convert.ToDouble(subwa2.Text) : 0;
            double wa1 = 0.00;
            if (rai2 == null && khan2 == null)
            {
                rai2.Text = "0";
                khan2.Text = "0";
            }

            wa1 = (lai1 * 400) + (khan1 * 100) + wa11 + sub;
            wawawa2.Text = wa1.ToString();
        }
    }
}