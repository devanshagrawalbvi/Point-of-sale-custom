odoo.define("pos_order.inherit", function (require) {
  "use strict";
  const ProductScreen = require("point_of_sale.ProductScreen");
  const Registries = require("point_of_sale.Registries");
  var { Gui } = require("point_of_sale.Gui");

  const OrderPlacingValidation = (ProductScreen) =>
    class OrderPlacingValidation extends ProductScreen {
      setup() {
        super.setup();
      }
      async _onClickPay() {      
        // console.log(this.env.pos);
        if (this.env.pos.get_order().partner == null) {
          Gui.showPopup("ErrorPopup", {
            title: "Customer Error",
            body: `Select a customer.`,
          });
        } 
        else if (this.env.pos.get_order().location == undefined) {
          Gui.showPopup("ErrorPopup", {
            title: "Shipping Location Error",
            body: `Select a shipping location.`,
          });
        } 






        
        else if (this.env.pos.get_order().orderlines.length <= 0) {
            // Gui.showPopup("ErrorPopup", {
            //   title: "Product Error",
            //   body: `Select product before placing order.`,
            // });
            return this.showNotification(
              _.str.sprintf(this.env._t('Please select products before palcing order.')),
              5000
          );
          }
        else {
          super._onClickPay();
        }
      }
    };
  Registries.Component.extend(ProductScreen, OrderPlacingValidation);
});