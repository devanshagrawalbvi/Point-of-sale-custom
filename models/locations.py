from odoo import models, fields


class Locations(models.Model):
    _rec_name = "locations"
    _name = "pos_task.locations"

    locations = fields.Char(string="Locations")


class OrderLocationSession(models.Model):
    _inherit = ['pos.session']

    # when session is created or refreshed it is called 
    def _pos_ui_models_to_load(self):
        print("======================================")
        print("_pos_ui_models_to_load  called")
        print("======================================")

        result = super()._pos_ui_models_to_load()
        result.append('pos_task.locations')
        print("======================================")
        print(result)
        print("======================================")
        return result
        

    def _loader_params_pos_task_locations(self):
        print("======================================")
        print("_loader_params_pos_task_locations  called")
        print("======================================")
        return {
            'search_params': {
                'fields': ['locations'],
            },
        }

    def _get_pos_ui_pos_task_locations(self, params):
        print("======================================")
        print("_get_pos_ui_pos_task_locations  called")
        print("======================================")
        return self.env['pos_task.locations'].search_read(**params['search_params'])
