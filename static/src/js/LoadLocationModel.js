/** @odoo-module */

import { PosGlobalState } from "point_of_sale.models";
import Registries from "point_of_sale.Registries";
const LocationGlobalState = (PosGlobalState) =>
  class extends PosGlobalState {
    async _processData(loadedData) {
      // called when pos session is created or refreshed
      await super._processData(...arguments);
      console.log(this._processData);

      this.pos_task_locations = loadedData["pos_task.locations"];
      //   console.log(this.pos_task_locations)
    }
  };
Registries.Model.extend(PosGlobalState, LocationGlobalState);