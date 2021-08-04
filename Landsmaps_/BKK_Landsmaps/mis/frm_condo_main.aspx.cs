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
    public partial class frm_condo_main : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {

                Session["type"] = "=";
                rai1.Text = "0";
                wa.Text = "0";
                dgvResult.DataSource = get_data();
                dgvResult.DataBind();
            }
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

            if (Condo_name.Text != "")
            {
                res = " condo_name like " + my_functions.pre_str("%" + Condo_name.Text + "%")+" and ";
            }

            if (parcel_no2.Text != "")
            {
                if (res != "")
                {
                    res = res + " and  parcel_no like " + my_functions.pre_str("%" + parcel_no2.Text + "%") + " and ";
                }
                else
                {
                    res = " parcel_no like " + my_functions.pre_str("%" + parcel_no2.Text + "%") + " and ";
                }
            }
            if (land_no2.Text != "")
            {
                if (res != "")
                {
                    res = res + " and  land_no like " + my_functions.pre_str("%" + land_no2.Text + "%") + " and ";
                }
                else
                {
                    res = " land_no like " + my_functions.pre_str("%" + land_no2.Text + "%") + " and ";
                }
            }
            if (wawawa.Text != "" && wawawa2.Text == "")
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
            if (type1.Text != "")
            {
                res = res + "type_name = '" + type1.Text + "'And ";
            }
            if (Panel5.Visible == true)
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

            return res;
        }

        protected void dgvResult_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int rowindex = Convert.ToInt32(e.CommandArgument);
            dgvResult.SelectedIndex = rowindex;
            int index = 0;
            int index2 = 0;
            if (e.CommandName == "view_details")
            {
                //index = my_functions.GetColumnIndexByHeaderText(dgvResult, "reg_no");
                index = my_functions.GetColumnIndexByDBName(dgvResult, "reg_no");
                //index2 = my_functions.GetColumnIndexByHeaderText(dgvResult, "area_code");
                index2 = my_functions.GetColumnIndexByDBName(dgvResult, "area_code");
                //Session["id"] = dgvResult.SelectedRow.Cells[6].Text;
                GridViewRow row = dgvResult.SelectedRow;
                Session["regno"] = row.Cells[index].Text;
                Session["area"] = row.Cells[index2].Text;
                Response.Write(@"<script>window.open ('frm_condo_detail.aspx?regno=" + Session["regno"].ToString() + "&area_code=" + Session["area"].ToString() + "','_blank');</script>");
            }
        }

        protected void AreaCheck_CheckedChanged(object sender, EventArgs e)
        {
            if (AreaCheck.Checked)
            {
                arearadio.Visible = true;
                Panel5.Visible = true;
            }
            else if (!AreaCheck.Checked)
            {
                arearadio.Visible = false;
                rai1.Text = "";
                khan.Text = "";
                wa.Text = "";
                wawawa.Text = "";
                rai2.Text = "";
                khan2.Text = "";
                wa2.Text = "";
                subwa2.Text = "";
                wawawa2.Text = "";
                rai1.Visible = false;
                khan.Visible = false;
                wa.Visible = false;
                Panel5.Visible = false;
            }
        }

        protected void arearadio_SelectedIndexChanged(object sender, EventArgs e)
        {
            rai1.Text = "";
            khan.Text = "";
            wa.Text = "";
            subwa.Text = "";
            wawawa.Text = "";
            Session["type"] = arearadio.SelectedValue.ToString();
            if (arearadio.SelectedValue == "between")
            {
                rai2.Text = "";
                khan2.Text = "";
                wa2.Text = "";
                subwa2.Text = "";
                wawawa2.Text = "";
                Panel6.Visible = true;
            }
            else
            {
                rai2.Text = "";
                khan2.Text = "";
                wa2.Text = "";
                subwa2.Text = "";
                wawawa2.Text = "";
                Panel6.Visible = false;
            }

        }

        protected void dgvResult_RowEditing(object sender, GridViewEditEventArgs e)
        {
            Session["id"] = dgvResult.DataKeys[e.NewEditIndex].Value;
        }

        protected void wawa_TextChanged(object sender, EventArgs e)
        {

            double lai1 = !rai1.Text.Equals("") ? Convert.ToInt32(rai1.Text) : 0;
            double khan1 = !khan.Text.Equals("") ? Convert.ToInt32(khan.Text) : 0;
            double wa11 = !wa.Text.Equals("") ? Convert.ToDouble(wa.Text) : 0;
            double sub = !subwa.Text.Equals("") ? Convert.ToDouble(subwa.Text) : 0;
            double wa1 = 0.00;
            if (rai1 == null && khan == null)
            {
                rai1.Text = "0";
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
                strsql = "SELECT * FROM public.v_current_condo_loc Where " + criteria + "  area_id = " + global_variable.user_group_id +
                     " and area_code = '" + global_variable.user_dept_id + "' LIMIT 100";
            }

            else
            {
                strsql = "SELECT * FROM  public.v_current_condo_loc Where  area_id = " + global_variable.user_group_id +
               " and area_code = '" + global_variable.user_dept_id + "' LIMIT 100";
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