
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Donation_requestsDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const donation_requests = await db.donation_requests.create(
            {
                id: data.id || undefined,

        donation_type: data.donation_type
        ||
        null
            ,

        meal_type: data.meal_type
        ||
        null
            ,

        quantity: data.quantity
        ||
        null
            ,

        status: data.status
        ||
        null
            ,

        pickup: data.pickup
        ||
        false

            ,

        location: data.location
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return donation_requests;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const donation_requestsData = data.map((item, index) => ({
                id: item.id || undefined,

                donation_type: item.donation_type
            ||
            null
            ,

                meal_type: item.meal_type
            ||
            null
            ,

                quantity: item.quantity
            ||
            null
            ,

                status: item.status
            ||
            null
            ,

                pickup: item.pickup
            ||
            false

            ,

                location: item.location
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const donation_requests = await db.donation_requests.bulkCreate(donation_requestsData, { transaction });

        return donation_requests;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const donation_requests = await db.donation_requests.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.donation_type !== undefined) updatePayload.donation_type = data.donation_type;

        if (data.meal_type !== undefined) updatePayload.meal_type = data.meal_type;

        if (data.quantity !== undefined) updatePayload.quantity = data.quantity;

        if (data.status !== undefined) updatePayload.status = data.status;

        if (data.pickup !== undefined) updatePayload.pickup = data.pickup;

        if (data.location !== undefined) updatePayload.location = data.location;

        updatePayload.updatedById = currentUser.id;

        await donation_requests.update(updatePayload, {transaction});

        return donation_requests;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const donation_requests = await db.donation_requests.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of donation_requests) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of donation_requests) {
                await record.destroy({transaction});
            }
        });

        return donation_requests;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const donation_requests = await db.donation_requests.findByPk(id, options);

        await donation_requests.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await donation_requests.destroy({
            transaction
        });

        return donation_requests;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const donation_requests = await db.donation_requests.findOne(
            { where },
            { transaction },
        );

        if (!donation_requests) {
            return donation_requests;
        }

        const output = donation_requests.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

                if (filter.meal_type) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'donation_requests',
                            'meal_type',
                            filter.meal_type,
                        ),
                    };
                }

                if (filter.location) {
                    where = {
                        ...where,
                        [Op.and]: Utils.ilike(
                            'donation_requests',
                            'location',
                            filter.location,
                        ),
                    };
                }

            if (filter.quantityRange) {
                const [start, end] = filter.quantityRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    quantity: {
                    ...where.quantity,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    quantity: {
                    ...where.quantity,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.donation_type) {
                where = {
                    ...where,
                donation_type: filter.donation_type,
            };
            }

            if (filter.status) {
                where = {
                    ...where,
                status: filter.status,
            };
            }

            if (filter.pickup) {
                where = {
                    ...where,
                pickup: filter.pickup,
            };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.donation_requests.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'donation_requests',
                        'donation_type',
                        query,
                    ),
                ],
            };
        }

        const records = await db.donation_requests.findAll({
            attributes: [ 'id', 'donation_type' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['donation_type', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.donation_type,
        }));
    }

};

