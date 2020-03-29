export const schema = {
    "models": {
        "ShoppingListItem": {
            "syncable": true,
            "name": "ShoppingListItem",
            "pluralName": "ShoppingListItems",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "itemName": {
                    "name": "itemName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "enums": {},
    "version": "e96dc2ec6eeb43bf6c3f7ad63ed24d93"
};