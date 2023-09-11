odoo.define("point_of_sale.CustomerOrderNoteButton", function (require) {
  "use strict";

  const PosComponent = require("point_of_sale.PosComponent");
  const ProductScreen = require("point_of_sale.ProductScreen");
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require("point_of_sale.Registries");

  class CustomerOrderNoteButton extends PosComponent {
    setup() {
      super.setup();
      useListener("click", this.onClick);
    }
    async onClick() {
      console.log(this.env.pos);
      const order = this.env.pos.get_order();
      // Code for popup - If product is not selected it would not go ahead.

      const selectedOrderline = this.env.pos
        .get_order()
        .get_selected_orderline();
      if (!selectedOrderline) return;

      // showing popup and getting the value of note using getnote method

      const { confirmed, payload: order_note } = await this.showPopup(
        "CustomerNotePopup",
        {
          initialNumber: order.getNote(),
        }
      );

      // if clicked save button on popup save the value using setnote method
      if (confirmed) {
        order.setNote(order_note);
      }
    }
  }

  CustomerOrderNoteButton.template = "ButtonTemp1";

  ProductScreen.addControlButton({
    component: CustomerOrderNoteButton,
    position: ["before", "OrderlineCustomerNoteButton"],
  });

  Registries.Component.add(CustomerOrderNoteButton);

  return CustomerOrderNoteButton;
});
