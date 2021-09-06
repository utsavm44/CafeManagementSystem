// use the path of your model
const AddFav = require('../model/checkout_model');
const mongoose = require('mongoose');
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
describe('Checkout Schema test anything', () => {
    // the code below is for insert testing
    it('Checkout testing anything', () => {
        const check = {
            'userId': 'test',
            'productId': 'test'
           
        };

        return CheckOut.create(check)
            .then((pro_ret) => {
                expect(pro_ret.userId).toEqual('test');
            });
    });

    it('to test the update', async () => {
        return AddFav.findOneAndUpdate({ _id: Object('607cf768c965a24120035ca8') },
            { $set: { userId: 'test' } })
            .then((pp) => {
                expect(pp.userId).toEqual('test')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await AddFav.deleteOne({_id:"607cf768c965a24120035ca8"});
        expect(status.ok).toBe(1);
    })

    

})