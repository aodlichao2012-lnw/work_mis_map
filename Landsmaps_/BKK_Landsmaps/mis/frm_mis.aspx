<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_mis.aspx.cs" Inherits="mapmng.mis.frm_mis" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/ny1_form.css" rel="stylesheet" />
    <style>
        body {
            justify-content:center;
            font-family: Arial;
            font-size: 10pt;
        }

        .main_menu {
            width: 100px;
            background-color: #4cff00;
            color: #000;
            text-align: center;
            height: 30px;
            line-height: 30px;
            margin-right: 5px;
        }

        .level_menu {
            width: 110px;
            background-color: #00ff90;
            color: #fff;
            text-align: center;
            height: 30px;
            line-height: 30px;
            margin-top: 5px;
        }

        .selected {
            background-color: #b6ff00;
            color: #fff;

        }
        a:hover {
  background-color: yellow;
}
    </style>
</head>
<body style="margin-left: 485px">
    <form id="form1" runat="server">
        <div>
            <div class="row">
                <asp:Menu ID="Menu1" runat="server" Orientation="Horizontal" Width="100%" Height="40%" OnMenuItemClick="Menu1_MenuItemClick">
                    <Items>
                        <asp:MenuItem Text="ดูข้อมูล" Value="ดูข้อมูล">
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="มาตรา 92 (ปัจุบัน)"></asp:MenuItem>
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_10_main.aspx" Value="" Text="มาตรา 10"></asp:MenuItem>
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="คอนโด"></asp:MenuItem>
                        </asp:MenuItem>
                        <asp:MenuItem Text="ประวัติการนำเข้า" Value="ประวัติการนำเข้า">
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="มาตรา 92"></asp:MenuItem>
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_10_main.aspx" Value="" Text="มาตรา 10 รายเดือน"></asp:MenuItem>
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="คอนโด รายเดือน"></asp:MenuItem>
                        </asp:MenuItem>
                        <asp:MenuItem Text="การนำเข้าข้อมูล" Value="การนำเข้าข้อมูล">
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="มาตรา 92"></asp:MenuItem>
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_10_main.aspx" Value="" Text="มาตรา 10"></asp:MenuItem>
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="คอนโด"></asp:MenuItem>
                        </asp:MenuItem>
                        <asp:MenuItem Text="ปัญหาข้อขัดข้อง" Value="ปัญหาข้อขัดข้อง">
                            <asp:MenuItem NavigateUrl="~/mis/frm_section_92_main.aspx" Value="" Text="ประวัติการส่ง"></asp:MenuItem>
                        </asp:MenuItem>
                    </Items>
                    <LevelMenuItemStyles>
                        <asp:MenuItemStyle CssClass="main_menu" />
                        <asp:MenuItemStyle CssClass="level_menu" />

                    </LevelMenuItemStyles>
                </asp:Menu>
            </div>
        </div>
    </form>
</body>
</html>
