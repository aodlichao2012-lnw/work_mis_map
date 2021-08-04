using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;

namespace pkmngdata
{
    public class cl_gen_div
    {
        public static string gen_div(JObject objJson)
        {
            object jsonobject = new object();

            string div_num = (string)objJson["div_num"];
            string ac_name = (string)objJson["ac_name"];

            int ctr = Convert.ToInt32(div_num);
            string tmp = "";
            for (int i=0; i < ctr; i++)
            {
                tmp = tmp + "<div id = 'f-16-" + (i+1).ToString() + "' ><img src='http://119.59.115.110/mwa_fmc/images/sgn_icon/F-16A(ADF).png' /><br>" +
                    "<input type=\"button\" value='f-16-" + (i + 1).ToString() + "'  onclick=\"call_alert('f-16-" + (i + 1).ToString() + "');\" />" +
                    "</ div >";
            }
            

            return tmp;
        }
    }
}