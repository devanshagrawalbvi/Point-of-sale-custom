{
    'name': 'POS_Task',
    'version': '1.0',
    'category': 'Apps',
    # 'website': 'www.google.com',
    'author': 'Devansh Agrawal',
    'depends': ['base','point_of_sale'],
    'data': [
        "security/ir.model.access.csv",
        "views/pos_order.xml",
        "views/locations.xml",
        "views/location_pos.xml",
        "views/menu.xml",
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_task/static/src/**/*',
        ],
    },
    "application": True,
    "auto_install": True,
    "sequence": 1
}