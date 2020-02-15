import {EdmMapping} from '@themost/data';
let Thing = require('./thing-model');
/**
 * @class
 
 * @property {number} id
 * @augments {DataObject}
 */
@EdmMapping.entityType('Account')
class Account extends Thing {
    /**
     * @constructor
     */
    constructor() {
        super();
    }
}
module.exports = Account;
