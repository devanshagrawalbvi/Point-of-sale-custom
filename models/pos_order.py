from odoo import fields, models, api

# Inherinting pos.order for creating note field
class PosOrder(models.Model):
    _inherit = "pos.order"

    note = fields.Char()
    order_location = fields.Many2one('pos_task.locations', readonly=True)

    @api.model # from product to payment screen the popup value is stored in local storage
    # the method is used for saving local storage value into database.
    def _order_fields(self, ui_order): # called on clicking validate button on payment screen.
        res = super(PosOrder, self)._order_fields(ui_order)
        # res['note'] = ui_order['note'] if ui_order['note'] else False
        res.update({
            'note':ui_order.get('note'),
            'order_location': ui_order.get('loc').get('id')
            # 'order_location': ui_order.get('loc').get('id')
           })
        print("==========-----------------------------",res)
        return res

# Inherinting res.partner for creating customer contact field in backend

class CustomerMobile(models.Model):
    _inherit = ['res.partner']

    customer_phone_number = fields.Char(string="Mobile Number")

class CustomerMobilePosSession(models.Model):
    _inherit=['pos.session']
    # called when page is refreshed
    def _loader_params_res_partner(self):
        result= super()._loader_params_res_partner()
        result.get('search_params').get('fields').append('customer_phone_number')
        return result