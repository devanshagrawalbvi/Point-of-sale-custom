from odoo import models, fields

class POSLocation(models.Model):
    _inherit = ['pos.config']
    location = fields.Many2many('pos_task.locations', string="Store Locations")

class POSLocation(models.TransientModel):
    _inherit = ['res.config.settings']
    pos_location = fields.Many2many(related='pos_config_id.location', string="Store Availability", readonly=False)