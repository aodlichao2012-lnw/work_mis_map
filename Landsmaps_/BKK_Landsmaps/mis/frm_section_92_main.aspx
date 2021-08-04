<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="frm_section_92_main.aspx.cs" Inherits="mapmng.mis.frm_section_92_main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="../css/ny1_form.css" rel="stylesheet" />
</head>

<body class="text_font">
    <form id="form1" runat="server">
        <div>
        </div>
        <div id="menu01">
        </div>

        <%--ค้นหา--%>

        <div id="search_zone" style="margin-top: 10px">
            <div id="srh_parcel_num" class="div_inline_box">
                <asp:Label ID="Label1" CssClass="label_1 label_size1" runat="server" Text="เลขโฉนด   : "></asp:Label>
                <asp:TextBox ID="txt_srh_parcel_num" CssClass="text_Input textbox_size1" placeholder="...ระบุเลขโฉนด" runat="server"></asp:TextBox>

            </div>
            <div id="srh_parcel_owner" class="div_inline_box">
                <asp:Label ID="Label2" CssClass="label_1 label_size1" runat="server" Text="ชื่อเจ้าของ : "></asp:Label>
                <asp:TextBox ID="txt_srh_parcel_owner" CssClass="text_Input textbox_size1" placeholder="...ระบุชื่อเจ้าของ" runat="server"></asp:TextBox>
            </div>
            <div id="srh_parcel_owner2" class="div_inline_box">
                <asp:CheckBox ID="AreaCheck" CssClass="text_Input textbox_size1" AutoPostBack="true" OnCheckedChanged="AreaCheck_CheckedChanged" placeholder="...ระบุชื่อเจ้าของ" runat="server" Text="ขนาดพื้นที่:"></asp:CheckBox>
                <asp:RadioButtonList runat="server" AutoPostBack="true" OnSelectedIndexChanged="arearadio_SelectedIndexChanged" Visible="false" ID="arearadio">
                    <asp:ListItem Text="1" Value="=">เท่ากับ</asp:ListItem>
                    <asp:ListItem Text="1" Value=">=">มากกว่า หรือเท่ากับ</asp:ListItem>
                    <asp:ListItem Text="1" Value="<=">น้อยกว่าหรือเท่ากับ</asp:ListItem>
                    <asp:ListItem Text="1" Value="between">ระหว่าง</asp:ListItem>
                </asp:RadioButtonList>
                <asp:Panel ID="Panel1" Visible="true" runat="server">
                    <asp:TextBox runat="server" OnTextChanged="wawa_TextChanged" Text="" TextMode="Number" AutoPostBack="true" ID="rai" Width="76px"></asp:TextBox>
                    <asp:Label Text="ไร่" runat="server"></asp:Label>
                    <asp:TextBox runat="server" OnTextChanged="wawa_TextChanged" Text="" TextMode="Number" ID="khan" AutoPostBack="true" Width="76px"></asp:TextBox>
                    <asp:Label Text="งาน" runat="server"></asp:Label>
                    <asp:TextBox runat="server" OnTextChanged="wawa_TextChanged" Text="" TextMode="Number" ID="wa" Width="76px" AutoPostBack="true" MaxLength="5"></asp:TextBox>
                    <asp:Label Text="วา" runat="server"></asp:Label>
                    <asp:TextBox runat="server" OnTextChanged="wawa_TextChanged" Text="0.0" TextMode="Number" ID="subwa" Width="76px" AutoPostBack="true" MaxLength="5"></asp:TextBox>
                    <asp:TextBox runat="server" Text="" Visible="false" ID="wawawa" Width="76px"></asp:TextBox>
                </asp:Panel>
                <asp:Panel ID="Panel2" Visible="false" runat="server">
                    <asp:TextBox runat="server" OnTextChanged="rai2_TextChanged" TextMode="Number" Text="" AutoPostBack="true" ID="rai2" Width="76px"></asp:TextBox>
                    <asp:Label Text="ไร่" runat="server"></asp:Label>
                    <asp:TextBox runat="server" OnTextChanged="rai2_TextChanged" Text="" TextMode="Number" ID="khan2" AutoPostBack="true" Width="76px"></asp:TextBox>
                    <asp:Label Text="งาน" runat="server"></asp:Label>
                    <asp:TextBox runat="server" OnTextChanged="rai2_TextChanged" Text="" TextMode="Number" ID="wa2" Width="76px" AutoPostBack="true" MaxLength="5"></asp:TextBox>
                    <asp:Label Text="วา" runat="server"></asp:Label>
                    <asp:TextBox runat="server" OnTextChanged="rai2_TextChanged" Text="0.0" TextMode="Number" ID="subwa2" Width="76px" AutoPostBack="true" MaxLength="5"></asp:TextBox>
                    <asp:TextBox runat="server" Text="" Visible="false" ID="wawawa2" Width="76px"></asp:TextBox>
                </asp:Panel>
            </div>
            <div id="srh_parcel_owner2" class="div_inline_box">
                <asp:Label ID="type" CssClass="label_1 label_size1" runat="server" Text="ประเภทกรรมสิทธิ์ : "></asp:Label>
                <asp:TextBox ID="type1" CssClass="text_Input textbox_size1" placeholder="...ระบุชื่อเจ้าของ" runat="server"></asp:TextBox>
            </div>
            <div id="submit_button" class="div_inline_box">
                <asp:Button ID="btnsearch_parcel" CssClass="button_gray  button_size1" runat="server" Text="ค้นหา" OnClick="btnsearch_parcel_Click" />
            </div>
        </div>

     <%--   gridview--%>


        <div id="grid_zone" style="margin-top: 10px">
            <asp:GridView ID="dgvResult" CssClass="grid_text" runat="server" BackColor="White"
                BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CaptionAlign="Left"
                CellPadding="4" ForeColor="Black" GridLines="Vertical"
                PageSize="50" OnRowCommand="dgvResult_RowCommand" AllowPaging="True" AllowSorting="True"
                DataKeyNames="pk_link" OnRowEditing="dgvResult_RowEditing">
                <AlternatingRowStyle BackColor="White" />
                <Columns>
                    <asp:ButtonField ButtonType="Image" CommandName="view_Map" ImageUrl="~/Images/icons/24pixel/mapbase_24.png" Text="Map" />
                    <asp:ButtonField ButtonType="Image" CommandName="view_details" ImageUrl="~/Images/icons/24pixel/search_24.png" Text="รายละเอียด" />
                    <asp:BoundField DataField="pk_link" HeaderText="pk_link" />
                    <asp:ButtonField ButtonType="Image" CommandName="view_Error" ImageUrl="" Text="error" />
                </Columns>
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
