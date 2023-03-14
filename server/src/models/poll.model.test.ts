import {context} from "sequelize-test-helpers";

const SimpleModel = require('../../../src/models/Simple')

test('src/models/Simple', () => {
    const Model = SimpleModel(sequelize, dataTypes)
    const instance = new Model()  
    checkModelName(Model)('Simple')  
    context('properties', () => {
      ['name', 'email'].forEach(checkPropertyExists(instance))
    })
  })