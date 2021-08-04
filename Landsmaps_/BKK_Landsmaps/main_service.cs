using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Web.Configuration;

namespace mapmng
{
    public class main_Mapservice
    {
        static string login_jsonstring = "";

        public static string user_login(string loginID)
        {
            string fromWeb = "";

            if (loginID != null)
            {
                fromWeb = loginID;
            }
            else
            {
                fromWeb = "ew0KICAidXNlcm5hbWUiOiAidXNlcmgxMjMiLA0KICAibmFtZSI6ICJoaGhoaGgiLA0KICAic3VybmFtZSI6ICJoaGhoaGhoIiwNCiAgIm1vYmlsZSI6ICIxMjMiLA0KICAic3lzX2lkIjogIjUiLA0KICAic3lzX25hbWUiOiAi4Lij4Liw4Lia4LiaIOC4m+C4o+C4sOC4geC4suC4qOC4guC5iOC4suC4pyIsDQogICJzeXNfcGVybWlzc2lvbl9pZCI6ICI1MSIsDQogICJ1c2VyX3R5cGUiOiAi4LmA4LiI4LmJ4Liy4Lir4LiZ4LmJ4Liy4LiX4Li14LmIIiwNCiAgInN5c19wZXJtaXNzaW9uX25hbWUiOiAi4LmA4LiI4LmJ4Liy4Lir4LiZ4LmJ4Liy4LiX4Li14LmIIiwNCiAgImRhdGUiOiAiMjEvMDQvMjAxOSAxNTozNiINCn0=";
            }

            string data = Base64Decode(loginID);
            login_jsonstring = data;

            return login_jsonstring;
        }

        public void OnLogRequest(Object source, EventArgs e)
        {
            //custom logging logic can go here
        }
        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        

    }
}
