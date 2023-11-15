module.exports = {
  categoryFormatter: (values) => {
    const obj = (value) => {
      return {
        id: value.id,
        name: value.name,
        active: value.active,
        created_user: value.created_user,
        created_date: value.createdAt,
        updated_user: value.updated_user,
        updated_date: value.updatedAt
      };
    };

    return values.length >= 1
      ? values?.map((category) => {
          return obj(category);
        })
      : obj(values);
  },
  productFormatter: (values) => {
    const obj = (value) => {
      return {
        id: value.id,
        plu: value.plu,
        name: value.name,
        product_category_id: value.product_category_id,
        active: value.active,
        created_user: value.created_user,
        created_date: value.createdAt,
        updated_user: value.updated_user,
        updated_date: value.updatedAt
      };
    };

    return values.length >= 1
      ? values?.map((product) => {
          return obj(product);
        })
      : obj(values);
  },
  productVariantFormatter: (values) => {
    const obj = (value) => {
      return {
        id: value.id,
        product_id: value.product_id,
        code: value.code,
        name: value.name,
        qty: value.qty,
        price: value.price,
        active: value.active,
        image_location: value.image_url,
        created_user: value.created_user,
        created_date: value.createdAt,
        updated_user: value.updated_user,
        updated_date: value.updatedAt
      };
    };

    return values.length >= 1
      ? values?.map((productVariant) => {
          return obj(productVariant);
        })
      : obj(values);
  },

  transactionFormatter: (values) => {
    const obj = (value) => {
      return {
        id: value.id,
        transaction_no: value.transaction_no,
        total_amount: value.total_amount,
        active: value.active,
        created_user: value.created_user,
        created_date: value.createdAt,
        updated_user: value.updated_user,
        updated_date: value.updatedAt
      };
    };

    return values.length >= 1
      ? values?.map((productVariant) => {
          return obj(productVariant);
        })
      : obj(values);
  }
};
