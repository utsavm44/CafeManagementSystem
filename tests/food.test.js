// use the path of your model
const Food = require('../model/foodItem_model');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://127.0.0.1:27017/RMS';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('Menu Schema test anything', () => {
    // the code below is for insert testing
    it('Add Food testing anything', () => {
        const food = {
            'food_name': 'dummy name',
            'food_price':'Dummy',
            'food_desc':'Dummy',
            'food_image': 'noimg'
        };

        return Food.create(food)
            .then((pro_ret) => {
                expect(pro_ret.food_name).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return Food.findOneAndUpdate({ _id: Object('607e77eb7ad20f45384b9052') },
            { $set: { food_name: 'dummy name' } })
            .then((pp) => {
                expect(pp.food_name).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Food.deleteOne({_id: '607e77eb7ad20f45384b9052'});
        expect(status.ok).toBe(1);
    })
})