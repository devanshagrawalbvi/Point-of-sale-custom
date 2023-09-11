odoo.define("pos_training.CustomerDetail", function (require) {
  "use strict";

  const PartnerDetailsEdit = require("point_of_sale.PartnerDetailsEdit");
  const Registries = require("point_of_sale.Registries");
  var { Gui } = require("point_of_sale.Gui");

  const CustomerMobile = (PartnerDetailsEdit) =>
    class CustomerMobile extends PartnerDetailsEdit {
      // code for checking the partner contact field is empty or not.

      setup() {
        super.setup();
        this.changes.customer_phone_number =
          this.props.partner.customer_phone_number || "";
        console.log(this.changes);
      }

      // Predefined save change button to check if contact number is used for any another customer or not.
      async saveChanges() {
        const loadedData = await this.env.services.rpc({
          model: "res.partner",
          method: "search_read",
          args: [
            [
              [
                "customer_phone_number",
                "=",
                this.changes.customer_phone_number,
              ],
              ["id", "!=", this.props.partner.id],
            ],
          ],
        });

        // above method returns dictionary if length is > 0 then number exists for more than 1 customer, then show error

        if (loadedData.length > 0) {
          Gui.showPopup("ErrorPopup", {
            title: "Partner Contact Error",
            body: "Mobile Number is already in use",
          });
          // await this.showPopup("ConfirmPopup", {
          //   title: ("Partner Details Error"),
          //   body: ("Contact number is already in use."),
          // });
        } else {
          super.saveChanges();
        }
      }
    };

  CustomerMobile.template = "pos_training.CustomerMobile";
  Registries.Component.extend(PartnerDetailsEdit, CustomerMobile);
  return CustomerMobile;
});
