using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace mapmng
{
    public class my_functions
    {
        public static string pre_str(string strval)
        {
            string res = "";

            strval = strval.Trim();
            strval = strval.Replace("'", "''");
            res = "'" + strval + "'";

            return res;

        }

        public static string pre_num(string strval)
        {
            string res = "";

            strval = strval.Trim();
            strval = strval.Replace(",", "");

            if (strval == "") { strval = "0"; }
            res = strval;

            return res;

        }

        public static  int GetColumnIndexByDBName(GridView aGridView, String ColumnText)
        {
            System.Web.UI.WebControls.BoundField DataColumn;

            for (int Index = 0; Index < aGridView.Columns.Count; Index++)
            {
                DataColumn = aGridView.Columns[Index] as System.Web.UI.WebControls.BoundField;


                if (DataColumn != null)
                {
                    if (DataColumn.DataField == ColumnText)
                        return Index;
                }
            }
            return -1;
        }

        public static int GetColumnIndexByHeaderText(GridView aGridView, String ColumnText)
        {
            TableCell Cell;
            for (int Index = 0; Index < aGridView.HeaderRow.Cells.Count; Index++)
            {
                Cell = aGridView.HeaderRow.Cells[Index];
                if (Cell.Text.ToString() == ColumnText)
                    return Index;
            }
            return -1;
        }
    }
}