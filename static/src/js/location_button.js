odoo.define("point_of_sale.LocationSelection", function (require) {
  "use strict";

  const PosComponent = require("point_of_sale.PosComponent");
  const ProductScreen = require("point_of_sale.ProductScreen");
  const { useListener } = require("@web/core/utils/hooks");
  const Registries = require("point_of_sale.Registries");

  class LocationSelection extends PosComponent {
    setup() {
      super.setup();
      useListener("click", this.onClick);
      this.list = this.env.pos.pos_task_locations.filter((loc) =>this.env.pos.config.location.includes(loc.id));
      this.order = this.env.pos.get_order();
    }

    get loc_id() {
      console.log(this.order.location)
      if (this.order.location) {
        return this.order.location.id;
      }
      return false;
    }

    async onClick() {
      const selectionList = this.list.map((location) => ({
        id: location.id,
        label: location.locations,
        isSelected: location.id === this.loc_id,
        item: location,
      }));
      const { confirmed, payload: selectedlocation } = await this.showPopup(
        "LocationSelectionPopup",
        {
          list: selectionList,
        }
      );

      if (confirmed) {
        console.log(selectedlocation)
        this.order.set_location(selectedlocation);
      }
    }
  }

  LocationSelection.template = "LocationButton";

  ProductScreen.addControlButton({
    component: LocationSelection,
    position: ["after", "DeleteProduct"],
  });

  Registries.Component.add(LocationSelection);

  return LocationSelection;
});
