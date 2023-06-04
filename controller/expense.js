const Expense = require('../model/expense');
const User = require('../model/user');
const sequelize = require('../util/database');


exports.postExpense = async (req, res, next) => {

    try {
        const t = await sequelize.transaction();
        const day = new Date();
        const date = day.getDate();
        const month = day.getMonth();
        const year = day.getFullYear();

        const price = req.body.price;
        const product = req.body.product;
        const category = req.body.category;

        Expense.create({ userId: req.user.id, price: price, name: product, category: category, date: date, month: month, year: year }, { transaction: t })
            .then(expense => {
                const total_expense = Number(req.user.total_expense) + Number(price);
                User.update({
                    total_expense: total_expense
                }, {
                    where: { id: req.user.id },
                    transaction: t
                })
                    .then(async () => {
                        await t.commit();
                        res.status(201).json({ resData: "success" });
                    })
                    .catch(async (err) => {
                        await t.rollback();
                        return res.status(500).json({ 'success': false })
                    })

            })
            .catch(async (err) => {
                await t.rollback();
                return res.status(500).json({ "success": false })
            });
    }
    catch (err) {
        throw new Error(err);
    }
}

exports.getExpenses = (req, res, next) => {

    try {
        Expense.findAll({ where: { userId: req.user.id } })
            .then(expenses => {
                res.status(201).json({ resData: expenses });
            })
            .catch(err => {
                console.log(err);
            });
    }
    catch (err) {
        throw new Error(err);
    }
}

exports.deleteExpense = async (req, res, next) => {

    try {
        const t = await sequelize.transaction();
        const id = req.params.id;

        Expense.findAll({ where: { id: id, userId: req.user.id }, transaction: t })
            .then(expense => {
                const total_expense = Number(req.user.total_expense) - Number(expense[0].price);
                expense[0].destroy();
                User.update({
                    total_expense: total_expense
                }, {
                    where: { id: req.user.id },
                    transaction: t
                })
                    .then(async () => {
                        await t.commit();
                        res.status(201).json({ resData: "success" });
                    })
                    .catch(async (err) => {
                        await t.rollback();
                        return res.status(500).json({ 'success': false })
                    })
            })
            .catch(async (err) => {
                await t.rollback();
                return res.status(500).json({ 'success': false })
            })
    }
    catch (err) {
        throw new Error(err);
    }
}


