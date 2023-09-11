odoo.define("pos_task.CustomerNotePopup", function (require) {
  "use strict";

  //AbstractAwaitablePopup popup can now be instantiated and be awaited for the user's response
  const AbstractAwaitablePopup = require("point_of_sale.AbstractAwaitablePopup");
  const { useState, useRef } = owl;
  const Registries = require("point_of_sale.Registries");
  // const { _lt } = require("@web/core/l10n/translation");    used for language translation
  const { Order } = require("point_of_sale.models");

  class CustomerNotePopup extends AbstractAwaitablePopup {
    setup() {
      super.setup();
      this.note = useRef("note"); // the refernce of the field from backend
      this.state_p = useState({ order_note_: this.props.initialNumber }); // setting the currnt value of popup field.
    }

    getPayload() {
      // get payload is called when we click save button on popup
      return this.state_p.order_note_;
    }
  }

  CustomerNotePopup.template = "pos_task.CustomerNotePopup";

  // Props for the popup

  CustomerNotePopup.defaultProps = {
    cancelText: "Cancel",
    save: "Save",
  };

  Registries.Component.add(CustomerNotePopup);

  // Code for storing order note data in local storage and getting from it

  const POSCustomerNote = (Order) =>
    class POSCustomerNote extends Order {
      

      // Used to convert the order note into json and store into local storage

      export_as_JSON() {
        const json = super.export_as_JSON(...arguments);
        json.note = this.note;
        return json;
      }

      // get the order note value from local storage if any (reload).

      init_from_JSON(json) {
        super.init_from_JSON(...arguments);
        this.setNote(json.note);
      
      }

      // Method to set state value to field in backend

     
      setNote(note) {
        this.note = note;
      }

      // Method to get state value from field to frontend

      getNote() {
        return this.note;
      }

      // Predefined method for printing value in order reciept

      export_for_printing() {
        const result = super.export_for_printing(...arguments);
        if (this.getNote()) {
          result.note = this.getNote();
        }
        return result;
      }
    };

  Registries.Model.extend(Order, POSCustomerNote);
});
