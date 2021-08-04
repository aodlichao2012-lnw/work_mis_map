<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_condo_detail.aspx.cs" Inherits="mapmng.mis.frm_condo_detail" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .grid_text {
            font-size: 14px;
            font-family: var(--fontname);
        }
        .auto-style1 {
            font-size: 14px;
            font-family: var(--fontname);
        }
    </style>
    <link href="../css/ny1_form.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <%--ส่วนค้นหา--%>

            <asp:Panel ID="Panel1" runat="server">
                <div id="search_zone" style="margin-top: 10px">
                    <div id="srh_parcel_num" class="div_inline_box">
                        <asp:Label ID="Label1" CssClass="label_1 label_size1" runat="server" Text="ชั้น   : "></asp:Label>
                        <asp:TextBox ID="floor_no" CssClass="text_Input textbox_size1" placeholder="...ระบุเลขโฉนด" runat="server"></asp:TextBox>

                    </div>
                    <div  class="div_inline_box">
                        <asp:Label ID="Label2" CssClass="label_1 label_size1" runat="server" Text="ห้อง : "></asp:Label>
                        <asp:TextBox ID="room_no" CssClass="text_Input textbox_size1" placeholder="...ระบุชื่อเจ้าของ" runat="server"></asp:TextBox>
                    </div>
                    <div " class="div_inline_box">
                        <asp:Label ID="Label3" CssClass="label_1 label_size1" runat="server" Text="เลขบัตรประชาชน : "></asp:Label>
                        <asp:TextBox ID="pers_id" CssClass="text_Input textbox_size1" placeholder="...ระบุชื่อเจ้าของ" runat="server"></asp:TextBox>
                    </div>
                    <div id="srh_parcel_owner2" class="div_inline_box">
                        <asp:Label ID="type" CssClass="label_1 label_size1" runat="server" Text="ชื่อ : "></asp:Label>
                        <asp:TextBox ID="fname" CssClass="text_Input textbox_size1" placeholder="...ระบุชื่อเจ้าของ" runat="server" Width="227px"></asp:TextBox>
                    </div>
                    <div  class="div_inline_box">
                        <asp:Label ID="Label4" CssClass="label_1 label_size1" runat="server" Text="นามสกุล : "></asp:Label>
                        <asp:TextBox ID="lname" CssClass="text_Input textbox_size1" placeholder="...ระบุชื่อเจ้าของ" runat="server" Width="158px"></asp:TextBox>
                    </div>

                    <div id="submit_button" class="div_inline_box">
                        <asp:Button ID="btnsearch_parcel" CssClass="button_gray  button_size1" runat="server" Text="ค้นหา" OnClick="btnsearch_parcel_Click" />
                    </div>
                </div>
            </asp:Panel>
        </div>
        <div>
            <%--ส่วนแสดงผล--%>
            <asp:GridView ID="GridView1" CssClass="auto-style1" runat="server" BackColor="White"
                BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CaptionAlign="Left"
                CellPadding="4" ForeColor="Black" GridLines="Vertical"
                PageSize="50" Style="margin-left: 0px" Width="25px">
                <AlternatingRowStyle BackColor="White" />
                <FooterStyle BackColor="#b9edb2" />
                <HeaderStyle BackColor="#058733" Font-Bold="True" ForeColor="White" Font-Size="16px" />
                <PagerSettings Position="TopAndBottom" />
                <PagerStyle BackColor="#e4fad4" ForeColor="Black" HorizontalAlign="Left" />
                <RowStyle BackColor="#e4fad4" HorizontalAlign="Left" VerticalAlign="Top"
                    Wrap="False" />
                <SelectedRowStyle BackColor="#edce68" Font-Bold="True" ForeColor="White" />
                <SortedAscendingCellStyle BackColor="#FBFBF2" />
                <SortedAscendingHeaderStyle BackColor="#848384" />
                <SortedDescendingCellStyle BackColor="#EAEAD3" />
                <SortedDescendingHeaderStyle BackColor="#575357" />
            </asp:GridView>
        </div>
    </form>
</body>
</html>
