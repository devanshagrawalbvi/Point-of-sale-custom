odoo.define('point_of_sale.LocationSelectionPopup', function (require) {
  'use strict';

  const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
  const Registries = require('point_of_sale.Registries');
  const { Order } = require("point_of_sale.models");

  const { useState } = owl

  class LocationSelectionPopup extends AbstractAwaitablePopup {
      
      setup() {
          super.setup();
          this.state = useState({ selectedId: this.props.list.find((item) => item.isSelected) });
      }
      selectItem(itemId) {
          this.state.selectedId = itemId;
          this.confirm();
      }
     
      getPayload() {
          const selected = this.props.list.find((item) => this.state.selectedId === item.id);
          return selected && selected.item;
      }
  }
  LocationSelectionPopup.template = 'LocationSelectionPopup';
  LocationSelectionPopup.defaultProps = {
      cancelText:'Cancel',
      title: 'Shiiping Location',
      body: '',
      list: [],
      confirmKey: false,
  };

  Registries.Component.add(LocationSelectionPopup);

  const POSLocation = (Order) =>
    class extends Order {
      
      // Used to convert the order note into json and store into local storage

      export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        json.loc = this.location;
        return json;
      }

      // get the order note value from local storage if any (reload).

      init_from_JSON(json) {
        super.init_from_JSON(...arguments);
        this.set_location(json.loc);
      }

      // Method to set state value to field in backend

      set_location(location){
        console.log(location,'set')
        this.location = location
      }

      get_location(){
        return this.location
      }
      
      export_for_printing() {
        const result = super.export_for_printing(...arguments);
        if (this.get_location()) {
          result.location = this.get_location().locations;
        }
        return result;
      }
    };

  Registries.Model.extend(Order, POSLocation);
});

