// use the path of your model
const Register = require('../model/user_model');
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
describe('Register Schema test anything', () => {
    // the code below is for insert testing
    it('Add User testing anything', () => {
        const user = {
            'name': 'dummy name',
            'address':'KTM',
            'phone':'5473859385',
            'gender':'male',
            'dob':'5451515',
            'email': 'dummy334sads21dsad34ds4@gmail.com',
            'password': "dummy",
            'image': 'noimg'
        };

        return Register.create(user)
            .then((pro_ret) => {
                expect(pro_ret.name).toEqual('dummy name');
            });
    })

    it('to test the update', async () => {
        return Register.findOneAndUpdate({ _id: Object('607e77ead0573f307cfcc1ef') },
            { $set: { name: 'dummy name' } })
            .then((pp) => {
                expect(pp.name).toEqual('dummy name')
            })

    });
    // the code below is for delete testing
    it('to test the delete user is working or not', async () => {
        const status = await Register.deleteOne({_id: '607e77ead0573f307cfcc1ef'});
        expect(status.ok).toBe(1);
    })
})