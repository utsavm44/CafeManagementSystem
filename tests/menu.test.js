// use the path of your model
const Menu = require('../model/menu_model');
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
    it('Add Menu testing anything', () => {
        const menu = {
            'menu_name': 'dummy name',
            'menu_title':'Dummy',
            'menu_price':'213',
            'menu_desc':'Dummy',
            'menu_image': 'noimg'
        };

        return Menu.create(menu)
            .then((pro_ret) => {
                expect(pro_ret.menu_name).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return Menu.findOneAndUpdate({ _id: Object('607e77eade482f5140d7e039') },
            { $set: { menu_name: 'dummy name' } })
            .then((pp) => {
                expect(pp.menu_name).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Menu.deleteOne({_id: '607e77eade482f5140d7e039'});
        expect(status.ok).toBe(1);
    })
})