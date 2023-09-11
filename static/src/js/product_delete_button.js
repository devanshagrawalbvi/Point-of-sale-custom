odoo.define("point_of_sale.DeleteProduct", function (require) {
  "use strict";

  const PosComponent = require("point_of_sale.PosComponent");
  const ProductScreen = require("point_of_sale.ProductScreen");
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require("point_of_sale.Registries");

  class DeleteProduct extends PosComponent {
    setup() {
      super.setup();
      useListener("click", this.onClick);
    }
    async onClick() {
      const products_orderline = this.env.pos.get_order();
      products_orderline.remove_orderline(
        products_orderline.get_selected_orderline()
      );
    }
  }

  DeleteProduct.template = "DeleteProductButton";

  ProductScreen.addControlButton({
    component: DeleteProduct,
    position: ["after", "CustomerOrderNoteButton"],
  });

  Registries.Component.add(DeleteProduct)
  return DeleteProduct;
});