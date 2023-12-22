const orderDataHelper = (config) => {
    const order = [];
    if (config.sortColumn) {
        order.push([config.sortColumn, config.sortDirection ? config.sortDirection : 'ASC']);
    }

    return order;
}

const whereClauseHelper = (config) => {
    const where = {};

    if (config.conditionArr) {
        config.conditionArr.forEach(condition => {
            where[condition.name] = condition.value
        })
    } 

    if (config.search && config.searchColumn) {
        where[config.searchColumn] = config.search;
    }

    return where;
}

const whereOpAndClause = (config) => {
    let whereOpAnd = {};
    const OpAndArr = [];


    if (config.search) {
        config.OpAnd.forEach(OpAnd => {
            OpAndArr.push({ [OpAnd]: { [config.Op.like]: '%' + config.search + '%' } })
        })
    }

    if (config.filterArr && config.filterArr.length > 0) {
        OpAndArr.push({ area_id: config.filterArr });
    }

    console.log(OpAndArr);

    if (OpAndArr.length > 0) whereOpAnd = {
        [config.Op.and]: OpAndArr
    };

    return whereOpAnd;
    
}

const whereOpOrClause = (config) => {
    let whereOpOr = {};
    const OpOrArr = [];


    if (config.search && Array.isArray(config.OpOr)) {
        config.OpOr.forEach(OpOr => {
            OpOrArr.push({ [OpOr]: { [config.Op.like]: '%' + config.search + '%' } })
        })
    }

    if (Array.isArray(config.filterArr) && config.filterArr.length > 0) {
        OpOrArr.push({ area_id: config.filterArr });
    }

    console.log(OpOrArr);

    if (OpOrArr.length > 0) whereOpOr = {
        [config.Op.or]: OpOrArr
    };

    return whereOpOr;
    
}

const whereOpAndClauseArr = (config) => {
    let whereOpAnd = {};
    const OpAndArr = [];

    if (Array.isArray(config.searchConfig) && Array.isArray(config.OpAnd) && config.searchConfig.length === config.OpAnd.length) {
        config.OpAnd.forEach((OpAnd, idx) => {
            if (config.searchConfig[idx].searchVal)
                OpAndArr.push({ [OpAnd]: { [config.Op.like]: `${config.searchConfig[idx].like ? `%` : ''}` + config.searchConfig[idx].searchVal + `${config.searchConfig[idx].like ? `%` : ''}` } })
        })
    }

    if (Array.isArray(config.filterArr) && config.filterArr.length > 0) {
        OpAndArr.push({ area_id: config.filterArr });
    }

    console.log(OpAndArr);

    if (OpAndArr.length > 0) whereOpAnd = {
        [config.Op.and]: OpAndArr
    };

    return whereOpAnd;
    
}

module.exports = {
    orderDataHelper,
    whereClauseHelper,
    whereOpOrClause,
    whereOpAndClause,
    whereOpAndClauseArr
}