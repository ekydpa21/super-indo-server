const { LastCode } = require('../models');

module.exports = {
  plu: async (executor) => {
    const lastCodeInstance = await LastCode.findOne({ where: { name: 'plu' } });

    if (!lastCodeInstance) {
      await LastCode.create({ name: 'plu', value: 1 });
      return 'PDCT0000001';
    } else {
      const operator = {
        add: lastCodeInstance.value + 1,
        min: lastCodeInstance.value - 1
      };
      const newLastCode = operator[executor];
      await LastCode.update({ value: newLastCode }, { where: { name: 'plu' } });
      return `PDCT${String(newLastCode).padStart(7, '0')}`;
    }
  },

  codeVariant: async (plu, executor) => {
    const lastCodeInstance = await LastCode.findOne({ where: { name: `variant-${plu}` } });

    if (!lastCodeInstance) {
      await LastCode.create({ name: `variant-${plu}`, value: 1 });
      return `${plu}0001`;
    } else {
      const operator = {
        add: lastCodeInstance.value + 1,
        min: lastCodeInstance.value - 1
      };
      const newLastCode = operator[executor];
      await LastCode.update({ value: newLastCode }, { where: { name: `variant-${plu}` } });
      return `${plu}${String(newLastCode).padStart(4, '0')}`;
    }
  },

  transactionCode: async (executor) => {
    const lastCodeInstance = await LastCode.findOne({ where: { name: `trx` } });

    if (!lastCodeInstance) {
      await LastCode.create({ name: `trx`, value: 1 });
      return 'TRX000000001';
    } else {
      const operator = {
        add: lastCodeInstance.value + 1,
        min: lastCodeInstance.value - 1
      };
      const newLastCode = operator[executor];
      await LastCode.update({ value: newLastCode }, { where: { name: `trx` } });
      return `TRX${String(newLastCode).padStart(9, '0')}`;
    }
  }
};
